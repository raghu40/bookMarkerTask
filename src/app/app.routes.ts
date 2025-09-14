import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'bookmarks', pathMatch: 'full' },
  {
    path: 'bookmarks',
    loadComponent: () =>
      import('./containers/bookmark-list.container').then(
        (c) => c.BookmarkListContainer
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./containers/bookmark-form.container').then(
        (c) => c.BookmarkFormContainer
      ),
  },
  {
    path: 'edit/:bookmarkId',
    loadComponent: () =>
      import('./containers/bookmark-form.container').then(
        (c) => c.BookmarkFormContainer
      ),
  },
  { path: '**', redirectTo: 'bookmarks' },
];
