import { Bookmark } from "../models/bookmark.model";


export interface BookmarksState {
  entities: Bookmark[];
  loading: boolean;
  error?: string;
  query: string;
}

export const initialBookmarksState: BookmarksState = {
  entities: [],
  loading: false,
  error: '',
  query: '',
};
