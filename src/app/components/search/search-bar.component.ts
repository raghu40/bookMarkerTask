import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { setQuery } from '../../store/bookmarks.actions';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-search-bar',
  template: `
    <mat-form-field appearance="outline">
      <mat-label>Search bookmarks</mat-label>
      <input
        matInput
        [value]="query()"
        (input)="onChange($event)"
        placeholder="search by title, url, notes"
      />
      @if(query() !== '') {
      <button mat-icon-button matSuffix (click)="clear()">
        <mat-icon>close</mat-icon>
      </button>
      }
    </mat-form-field>
  `,
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
  query = signal('');

  private store = inject(Store);

  onChange(event: Event) {
    const value = (event.target as HTMLInputElement)?.value ?? '';
    this.query.set(value);
    this.store.dispatch(setQuery({ query: value }));
  }

  clear() {
    this.query.set('');
    this.store.dispatch(setQuery({ query: '' }));
  }
}
