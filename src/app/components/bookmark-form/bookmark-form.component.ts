import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { createBookmark, updateBookmark } from '../../store/bookmarks.actions';
import { Bookmark } from '../../models/bookmark.model';
import { BookmarkService } from '../../services/bookmarks.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookmark-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './bookmark-form.component.html',
  styleUrls: ['./bookmark-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarkFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private store = inject(Store);
  private bookmarkService = inject(BookmarkService);

  form!: FormGroup;
  isEdit = false;

  @Input() bookmarkId?: string;

  ngOnInit(): void {
    this.isEdit = !!this.bookmarkId;

    this.form = this.fb.group({
      title: ['', Validators.required],
      url: ['', Validators.required],
      notes: [''],
    });

    if (this.isEdit && this.bookmarkId !== undefined) {
      this.bookmarkService
        .getBookmarkById(this.bookmarkId)
        .subscribe((bookmark) => {
          this.form.patchValue({
            title: bookmark.title,
            url: bookmark.url,
            notes: bookmark.notes,
          });
        });
    }
  }

  save(): void {
    if (this.form.invalid) return;

    const bookmark: Bookmark = {
      ...this.form.value,
      id: this.bookmarkId,
      createdAt: new Date().toISOString(),
    };

    if (this.isEdit && this.bookmarkId) {
      this.store.dispatch(updateBookmark({ bookmark }));
    } else {
      this.store.dispatch(createBookmark({ bookmark }));
    }
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
