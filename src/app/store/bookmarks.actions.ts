import { createAction, props } from '@ngrx/store';
import { Bookmark } from '../models/bookmark.model';

export const loadBookmarks = createAction('[Bookmark] Load Bookmarks');
export const loadBookmarksSuccess = createAction(
  '[Bookmarks] Load Success',
  props<{ bookmarks: Bookmark[] }>()
);
export const loadBookmarksFailure = createAction(
  '[Bookmarks] Load Failure',
  props<{ error: string }>()
);

export const createBookmark = createAction(
  '[Bookmarks] Create',
  props<{ bookmark: Partial<Bookmark> }>()
);
export const createBookmarkSuccess = createAction(
  '[Bookmarks] Create Success',
  props<{ bookmark: Bookmark }>()
);
export const createBookmarkFailure = createAction(
  '[Bookmarks] Create Failure',
  props<{ error: string }>()
);

export const updateBookmark = createAction(
  '[Bookmarks] Update',
  props<{ bookmark: Bookmark }>()
);
export const updateBookmarkSuccess = createAction(
  '[Bookmarks] Update Success',
  props<{ bookmark: Bookmark }>()
);
export const updateBookmarkFailure = createAction(
  '[Bookmarks] Update Failure',
  props<{ error: string }>()
);

export const deleteBookmark = createAction(
  '[Bookmarks] Delete',
  props<{ id: number }>()
);
export const deleteBookmarkSuccess = createAction(
  '[Bookmarks] Delete Success',
  props<{ id: number }>()
);
export const deleteBookmarkFailure = createAction(
  '[Bookmarks] Delete Failure',
  props<{ error: string }>()
);

export const setQuery = createAction(
  '[Bookmarks] Set Query',
  props<{ query: string }>()
);
