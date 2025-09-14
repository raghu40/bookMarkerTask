import { Component, computed, inject } from '@angular/core';
import { BookmarkListComponent } from '../components/bookmark-list/bookmark-list.component';
import { Store } from '@ngrx/store';
import {
  AppState,
  selectFilteredBookmarks,
  selectLoading,
} from '../store/bookmarks.selector';
import { groupBookmarks } from '../utils/bookmark-utils';
import { deleteBookmark, loadBookmarks } from '../store/bookmarks.actions';


@Component({
  selector: 'bookmark-list-container',
  standalone: true,
  template: `<app-bookmark-list
    [groupedBookmarks]="groupedBookmarks()"
    (deleteId)="deleteRecord($event)"
  ></app-bookmark-list>`,
  imports: [BookmarkListComponent],
})
export class BookmarkListContainer {
  readonly store = inject<Store<AppState>>(Store);
  readonly loading = this.store.selectSignal(selectLoading);
  readonly bookmarks = this.store.selectSignal(selectFilteredBookmarks);
  readonly groupedBookmarks = computed(() => groupBookmarks(this.bookmarks()));

  ngOnInit(): void {
    this.store.dispatch(loadBookmarks());
  }

  deleteRecord(id: number) {
    this.store.dispatch(deleteBookmark({ id }));
  }
}
