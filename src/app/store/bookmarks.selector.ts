import { createSelector } from '@ngrx/store';
import { BookmarksState } from './bookmarks.state';
import Fuse from 'fuse.js';
import { Bookmark } from '../models/bookmark.model';

export interface AppState {
  bookmarks: BookmarksState;
}

const getBookmarksState = (state: AppState) => state.bookmarks;

export const selectLoading = createSelector(
  getBookmarksState,
  (s) => s.loading
);

export const selectAllBookmarks = createSelector(
  getBookmarksState,
  (s) => s.entities
);

export const selectQuery = createSelector(getBookmarksState, (s) => s.query);

const fuseOptions: Fuse.IFuseOptions<Bookmark> = {
  keys: ['title', 'url', 'notes'],
  threshold: 0.4,
};

// Helper function to search
function filterBookmarks(bookmarks: Bookmark[], query: string) {
  if (!query?.trim()) return bookmarks;

  const fuse = new Fuse(bookmarks, fuseOptions);
  return fuse.search(query.trim()).map((result) => result.item);
}

export const selectFilteredBookmarks = createSelector(
  selectAllBookmarks,
  selectQuery,
  (bookmarks, query) => filterBookmarks(bookmarks, query)
);
