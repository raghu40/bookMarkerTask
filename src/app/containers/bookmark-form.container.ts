import { Component, Input } from '@angular/core';
import { BookmarkFormComponent } from '../components/bookmark-form/bookmark-form.component';


@Component({
  selector: 'bookmark-list-container',
  standalone: true,
  template: `<app-bookmark-form [bookmarkId]="bookmarkId"></app-bookmark-form>`,
  imports: [BookmarkFormComponent],
})
export class BookmarkFormContainer {
  @Input() bookmarkId?: string;
}
