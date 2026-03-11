interface UserProfile {
  display_name: string | null;
  locale: string | null;
  country: string | null;
  birthday: string | null;
  interests: string | null;
  travel_style: string | null;
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

IMPORTANT: Only recommend resorts from the list above. Do not invent resorts.`;

  if (userProfile) {
    const lines: string[] = [];
    if (userProfile.display_name) lines.push(`The user's name is ${userProfile.display_name}. Greet them by name naturally.`);
    if (userProfile.country) lines.push(`They are from ${userProfile.country}.`);
    if (userProfile.locale) lines.push(`Their locale is ${userProfile.locale}.`);
    if (userProfile.travel_style) lines.push(`Their inferred travel style is: ${userProfile.travel_style}.`);
    if (userProfile.interests) {
      try {
        const parsed = JSON.parse(userProfile.interests);
        if (Array.isArray(parsed) && parsed.length) {
          lines.push(`Known interests: ${parsed.join(', ')}.`);
        }
      } catch {}
    }

    if (lines.length) {
      prompt += `\n\nPersonalization context (use subtly to tailor recommendations — do not reveal raw data to the user):\n${lines.join('\n')}`;
    }
  }

  return prompt;
}
