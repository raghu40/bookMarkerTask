import { createReducer, on } from '@ngrx/store';
import { initialBookmarksState } from './bookmarks.state';
import * as actions from './bookmarks.actions';

export const bookmarksReducer = createReducer(
  initialBookmarksState,
  on(actions.loadBookmarks, (state) => ({ ...state, loading: true })),
  on(actions.loadBookmarksSuccess, (state, { bookmarks }) => ({
    ...state,
    loading: false,
    entities: bookmarks,
  })),
  on(actions.loadBookmarksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(actions.createBookmarkSuccess, (state, { bookmark }) => ({
    ...state,
    entities: [...state.entities, bookmark],
  })),
  on(actions.updateBookmarkSuccess, (state, { bookmark }) => ({
    ...state,
    entities: state.entities.map((b) => (b.id === bookmark.id ? bookmark : b)),
  })),
  on(actions.deleteBookmarkSuccess, (state, { id }) => ({
    ...state,
    entities: state.entities.filter((b) => b.id !== id),
  })),

  on(actions.setQuery, (state, { query }) => ({ ...state, query }))
);
