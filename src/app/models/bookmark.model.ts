export interface Bookmark {
  id?: number | string | any;
  title: string;
  url: string;
  notes?: string;
  createdAt?: string;
}

export interface BookmarkGroup {
  title: string;
  items: Bookmark[];
}

export const GROUP_KEYS = ['Today', 'Yesterday', 'Older'];
