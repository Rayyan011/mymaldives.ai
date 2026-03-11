import { streamText, generateText } from "ai";
import { auth } from "@clerk/nextjs/server";
import { openrouter, DEFAULT_MODEL } from "@/lib/ai/models";
import {
  getAllResorts,
  getUserProfile,
  saveChat,
  getChatById,
  saveMessages,
  updateChatTitle,
} from "@/lib/db/queries";
import { buildSystemPrompt } from "@/lib/ai/prompt";
import {
  getResortDetails,
  saveUserPreferences,
  getAllResortsSummary,
} from "@/lib/ai/tools";
import { getComposioTools } from "@/lib/composio/client";
import { generateId } from "@/lib/utils";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { id, messages } = await req.json();
  const { userId } = await auth();

  // Load resort context
  const allResorts = await getAllResorts();
  const resortContext = getAllResortsSummary(allResorts);

  // Load user profile if authenticated
  let userProfile = null;
  if (userId) {
    userProfile = await getUserProfile(userId);
  }

  const systemPrompt = buildSystemPrompt(userProfile, resortContext);

  // Check if chat exists; create if new and user is authenticated
  let isNewChat = false;
  if (id && userId) {
    const existing = await getChatById(id);
    if (!existing) {
      isNewChat = true;
      await saveChat({ id, userId, title: "New Chat" });
    }
  }

  // Build tools
  const composioTools = getComposioTools(!!userId);
  const tools: Record<string, (typeof getResortDetails) | (typeof saveUserPreferences)> = {
    getResortDetails,
    saveUserPreferences,
  };
  for (const [key, value] of Object.entries(composioTools)) {
    if (value) tools[key] = value;
  }

  // Get the last user message for persistence
  const lastUserMsg = messages[messages.length - 1];
  const userContent =
    typeof lastUserMsg?.content === "string"
      ? lastUserMsg.content
      : JSON.stringify(lastUserMsg?.content ?? "");

  const result = streamText({
    model: openrouter(DEFAULT_MODEL),
    system: systemPrompt,
    messages,
    tools,
    maxSteps: 5,
    onFinish: async ({ text }) => {
      // Persist messages for authenticated users
      if (id && userId && text) {
        const userMsgId = generateId();
        const assistantMsgId = generateId();

        await saveMessages([
          { id: userMsgId, chatId: id, role: "user", content: userContent },
          { id: assistantMsgId, chatId: id, role: "assistant", content: text },
        ]);

        // Generate title for new chats
        if (isNewChat) {
          generateText({
            model: openrouter(DEFAULT_MODEL),
            system:
              "Generate a concise 3-5 word title for this conversation. Return only the title text, nothing else. No quotes.",
            prompt: userContent,
          })
            .then(({ text: title }) => {
              if (title.trim()) {
                updateChatTitle(id, title.trim().slice(0, 100));
              }
            })
            .catch(() => {});
        }
      }
    },
  });

  return result.toDataStreamResponse();
}
