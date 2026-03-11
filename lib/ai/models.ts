import { createOpenAI } from "@ai-sdk/openai";

export const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY ?? "",
  headers: {
    "HTTP-Referer": "https://mymaldives.ai",
    "X-Title": "MyMaldives.ai",
  },
});

export const DEFAULT_MODEL =
  process.env.OPENROUTER_MODEL || "google/gemini-2.0-flash-exp:free";
