import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from './bookmarks.actions';
import { map, mergeMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { BookmarkService } from '../services/bookmarks.service';
import { Bookmark } from '../models/bookmark.model';

@Injectable({
  providedIn: 'root',
})
export class BookmarksEffects {
  loadBookmarksEffect$ = createEffect(
    (actions$ = inject(Actions), bookmarkService = inject(BookmarkService)) => {
      return actions$.pipe(
        ofType(actions.loadBookmarks),
        mergeMap(() =>
          bookmarkService
            .getBookmarks()
            .pipe(
              map((bookmarks: Bookmark[]) =>
                actions.loadBookmarksSuccess({ bookmarks })
              )
            )
        )
      );
    },
    { functional: true }
  );

  createBookmarkEffect$ = createEffect(
    (
      actions$ = inject(Actions),
      bookmarkService = inject(BookmarkService),
      router = inject(Router)
    ) => {
      return actions$.pipe(
        ofType(actions.createBookmark),
        mergeMap(({ bookmark }) =>
          bookmarkService.createBookmark(bookmark).pipe(
            map(() =>
              actions.createBookmarkSuccess({
                bookmark: bookmark as Bookmark,
              })
            )
          )
        ),
        tap(() => router.navigate(['/']))
      );
    },
    { functional: true }
  );

  updateBookmarkEffect$ = createEffect(
    (
      actions$ = inject(Actions),
      bookmarkService = inject(BookmarkService),
      router = inject(Router)
    ) => {
      return actions$.pipe(
        ofType(actions.updateBookmark),
        mergeMap(({ bookmark }) =>
          bookmarkService
            .updateBookmark(bookmark)
            .pipe(map(() => actions.updateBookmarkSuccess({ bookmark })))
        ),
        tap(() => router.navigate(['/']))
      );
    },
    { functional: true }
  );

  deleteBookmarkEffect$ = createEffect(
    (actions$ = inject(Actions), bookmarkService = inject(BookmarkService)) => {
      return actions$.pipe(
        ofType(actions.deleteBookmark),
        mergeMap(({ id }) =>
          bookmarkService
            .deleteBookmark(id)
            .pipe(map(() => actions.deleteBookmarkSuccess({ id })))
        )
      );
    },
    { functional: true }
  );
}
