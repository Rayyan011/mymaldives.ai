interface UserProfile {
  displayName: string | null;
  locale: string | null;
  country: string | null;
  birthday: string | null;
  interests: string | null;
  travelStyle: string | null;
  composioResearch: string | null;
}

export function buildSystemPrompt(
  userProfile: UserProfile | null,
  resortContext: string
): string {
  let prompt = `You are MyMaldives.ai, a friendly and knowledgeable luxury travel advisor specializing exclusively in the Maldives. You help users find the perfect resort based on their preferences, budget, and travel style.

Your personality:
- Warm, enthusiastic, and conversational — not corporate
- You ask thoughtful questions about budget, travel dates, occasion, and activities
- You recommend 2-3 specific resorts with clear reasons why they fit
- You mention practical details like transfer types (seaplane vs speedboat) and travel times
- When someone seems ready to book, suggest using the booking inquiry form
- If asked about non-Maldives destinations, gently redirect to Maldives options

Available resorts:
${resortContext}

IMPORTANT: Only recommend resorts from the list above. Do not invent resorts.

You have access to tools:
- Use getResortDetails to look up detailed info about a specific resort when the user asks
- Use saveUserPreferences to remember user travel preferences you learn from conversation`;

  if (userProfile) {
    const lines: string[] = [];
    if (userProfile.displayName)
      lines.push(
        `The user's name is ${userProfile.displayName}. Greet them by name naturally.`
      );
    if (userProfile.country)
      lines.push(`They are from ${userProfile.country}.`);
    if (userProfile.locale)
      lines.push(`Their locale is ${userProfile.locale}.`);
    if (userProfile.travelStyle)
      lines.push(
        `Their inferred travel style is: ${userProfile.travelStyle}.`
      );
    if (userProfile.interests) {
      try {
        const parsed = JSON.parse(userProfile.interests);
        if (Array.isArray(parsed) && parsed.length) {
          lines.push(`Known interests: ${parsed.join(", ")}.`);
        }
      } catch {}
    }
    if (userProfile.composioResearch) {
      lines.push(
        `Research insights about this user: ${userProfile.composioResearch}`
      );
    }

    if (lines.length) {
      prompt += `\n\nPersonalization context (use subtly to tailor recommendations — do not reveal raw data to the user):\n${lines.join("\n")}`;
    }
  }

  return prompt;
}
