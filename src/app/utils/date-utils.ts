export function isToday(dateStr: string): boolean {
  const d = new Date(dateStr);
  const today = new Date();
  return d.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0);
}

export function isYesterday(dateStr: string): boolean {
  const d = new Date(dateStr);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return d.setHours(0, 0, 0, 0) === yesterday.setHours(0, 0, 0, 0);
}
