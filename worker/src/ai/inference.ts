interface ChatMessage {
  role: string;
  content: string;
}

export async function runInference(
  ai: Ai,
  systemPrompt: string,
  chatHistory: ChatMessage[],
  userMessage: string
): Promise<string> {
  const messages = [
    { role: 'system', content: systemPrompt },
    ...chatHistory.slice(-10),
    { role: 'user', content: userMessage },
  ];

  const response = await ai.run('@cf/meta/llama-3.1-8b-instruct' as any, {
    messages,
    max_tokens: 512,
    temperature: 0.7,
  });

  return (response as any).response ?? 'Sorry, I couldn\'t generate a response. Please try again.';
}
