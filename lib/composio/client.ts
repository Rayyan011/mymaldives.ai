import { Composio } from "composio-core";
import { tool } from "ai";
import { z } from "zod";

let composioClient: Composio | null = null;

function getClient(): Composio | null {
  if (!process.env.COMPOSIO_API_KEY) return null;
  if (!composioClient) {
    composioClient = new Composio({ apiKey: process.env.COMPOSIO_API_KEY });
  }
  return composioClient;
}

export const researchUserEmail = tool({
  description:
    "Search the user's Gmail for travel-related emails to understand their preferences",
  parameters: z.object({
    query: z
      .string()
      .describe(
        "Search query for Gmail, e.g. 'maldives booking' or 'travel confirmation'"
      ),
  }),
  execute: async ({ query }) => {
    const client = getClient();
    if (!client) {
      return { success: false as const, message: "Composio not configured" };
    }

    try {
      const entity = client.getEntity("default");
      const connection = await entity.getConnection({ appName: "gmail" });
      if (!connection) {
        return { success: false as const, message: "Gmail not connected" };
      }

      const result = await entity.execute({
        actionName: "GMAIL_SEARCH_EMAILS",
        params: { query, maxResults: 5 },
      });

      return { success: true as const, results: result };
    } catch {
      return { success: false as const, message: "Failed to search emails" };
    }
  },
});

export const searchWebProfile = tool({
  description: "Look up the user's web presence for personalization context",
  parameters: z.object({
    name: z.string().describe("The user's name to search for"),
    email: z
      .string()
      .optional()
      .describe("The user's email for more targeted search"),
  }),
  execute: async ({ name, email }) => {
    const client = getClient();
    if (!client) {
      return { success: false as const, message: "Composio not configured" };
    }

    try {
      const entity = client.getEntity("default");
      const searchQuery = email ? `${name} ${email.split("@")[0]}` : name;

      const result = await entity.execute({
        actionName: "SERPAPI_SEARCH",
        params: { q: searchQuery, num: 3 },
      });

      return { success: true as const, results: result };
    } catch {
      return {
        success: false as const,
        message: "Failed to search web profile",
      };
    }
  },
});

export function getComposioTools(isAuthenticated: boolean) {
  if (!isAuthenticated || !process.env.COMPOSIO_API_KEY) return {};
  return {
    researchUserEmail,
    searchWebProfile,
  };
}
