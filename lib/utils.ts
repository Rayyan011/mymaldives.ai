export function generateId(): string {
  return crypto.randomUUID();
}

export function groupChatsByDate(
  chats: { id: string; title: string; createdAt: string | null }[]
) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 86400000);
  const lastWeek = new Date(today.getTime() - 7 * 86400000);
  const lastMonth = new Date(today.getTime() - 30 * 86400000);

  const groups: { label: string; chats: typeof chats }[] = [
    { label: "Today", chats: [] },
    { label: "Yesterday", chats: [] },
    { label: "Last 7 Days", chats: [] },
    { label: "Last 30 Days", chats: [] },
    { label: "Older", chats: [] },
  ];

  for (const chat of chats) {
    const date = chat.createdAt ? new Date(chat.createdAt) : new Date(0);
    if (date >= today) groups[0].chats.push(chat);
    else if (date >= yesterday) groups[1].chats.push(chat);
    else if (date >= lastWeek) groups[2].chats.push(chat);
    else if (date >= lastMonth) groups[3].chats.push(chat);
    else groups[4].chats.push(chat);
  }

  return groups.filter((g) => g.chats.length > 0);
}
