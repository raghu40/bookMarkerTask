import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookmarkListComponent } from './bookmark-list.component';
import { BookmarkGroup } from '../../models/bookmark.model';
import { By } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('BookmarkListComponent', () => {
  let component: BookmarkListComponent;
  let fixture: ComponentFixture<BookmarkListComponent>;

  const groupedBookmarks: BookmarkGroup[] = [
    {
      title: 'Group 1',
      items: [
        {
          id: 1,
          title: 'Bookmark 1',
          url: 'https://example.com/1',
          notes: 'Note 1',
          createdAt: '2025-01-01',
        },
      ],
    },
    {
      title: 'Group 2',
      items: [
        {
          id: 2,
          title: 'Bookmark 2',
          url: 'https://example.com/2',
          notes: 'Note 2',
          createdAt: '2025-01-02',
        },
        {
          id: 3,
          title: 'Bookmark 3',
          url: 'https://example.com/3',
          notes: 'Note 3',
          createdAt: '2025-01-03',
        },
      ],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BookmarkListComponent,
        CommonModule,
        RouterTestingModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookmarkListComponent);
    component = fixture.componentInstance;
    component.groupedBookmarks = groupedBookmarks;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render group titles', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    groupedBookmarks.forEach((group) => {
      expect(compiled.textContent).toContain(group.title);
    });
  });

  it('should render correct number of bookmarks per group', () => {
    const bookmarkCards = fixture.debugElement.queryAll(
      By.css('.bookmark-card')
    );
    const totalBookmarks = groupedBookmarks.reduce(
      (sum, group) => sum + group.items.length,
      0
    );
    expect(bookmarkCards.length).toBe(totalBookmarks);
  });

  it('should emit deleteId when delete button is clicked and confirm is true', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(component.deleteId, 'emit');

    const deleteButtons = fixture.debugElement.queryAll(
      By.css('.bookmark-actions button:last-child')
    );
    deleteButtons[0].nativeElement.click();

    expect(component.deleteId.emit).toHaveBeenCalledWith(
      groupedBookmarks[0].items[0].id
    );
  });

  it('should not emit deleteId when delete button is clicked and confirm is false', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(component.deleteId, 'emit');

    const deleteButtons = fixture.debugElement.queryAll(
      By.css('.bookmark-actions button:last-child')
    );
    deleteButtons[0].nativeElement.click();

    expect(component.deleteId.emit).not.toHaveBeenCalled();
  });
});
