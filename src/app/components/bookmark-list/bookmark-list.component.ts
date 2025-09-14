import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  inject,
  computed,
  input,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { BookmarkGroup } from '../../models/bookmark.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-bookmark-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarkListComponent {
  @Input() groupedBookmarks!: BookmarkGroup[];
  @Output() deleteId = new EventEmitter<number>();
  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this bookmark?')) {
      this.deleteId.emit(id);
    }
  }
}
