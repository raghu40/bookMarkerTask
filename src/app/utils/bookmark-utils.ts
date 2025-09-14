import { Bookmark, GROUP_KEYS } from '../models/bookmark.model';
import { isToday, isYesterday } from './date-utils';

export function groupBookmarks(
  items: Bookmark[]
): { title: string; items: Bookmark[] }[] {
  const order: string[] = GROUP_KEYS;
  const bookmarksByDate = items.reduce<Record<string, Bookmark[]>>(
    (acc, item) => {
      let groupKey = 'Older';
      if (item.createdAt) {
        if (isToday(item.createdAt)) {
          groupKey = 'Today';
        } else if (isYesterday(item.createdAt)) {
          groupKey = 'Yesterday';
        }
      }
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(item);
      return acc;
    },
    {}
  );

  return order
    .filter((key) => bookmarksByDate[key]?.length)
    .map((key) => ({ title: key, items: bookmarksByDate[key] }));
}
