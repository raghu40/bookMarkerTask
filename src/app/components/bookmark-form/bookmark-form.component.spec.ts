import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookmarkFormComponent } from './bookmark-form.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { BookmarkService } from '../../services/bookmarks.service';
import { of } from 'rxjs';
import { createBookmark, updateBookmark } from '../../store/bookmarks.actions';
import { Router } from '@angular/router';
import { Bookmark } from '../../models/bookmark.model';

describe('BookmarkFormComponent', () => {
  let component: BookmarkFormComponent;
  let fixture: ComponentFixture<BookmarkFormComponent>;
  let store: MockStore;
  let router: Router;
  let bookmarkService: jasmine.SpyObj<BookmarkService>;

  const mockBookmark: Bookmark = {
    id: '1',
    title: 'Test',
    url: 'https://test.com',
    notes: 'Note',
    createdAt: '2025-01-01',
  };

  beforeEach(async () => {
    const bookmarkServiceSpy = jasmine.createSpyObj('BookmarkService', [
      'getBookmarkById',
    ]);

    await TestBed.configureTestingModule({
      imports: [BookmarkFormComponent],
      providers: [
        provideMockStore(),
        provideRouter([]),
        { provide: BookmarkService, useValue: bookmarkServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookmarkFormComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    bookmarkService = TestBed.inject(
      BookmarkService
    ) as jasmine.SpyObj<BookmarkService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values when creating', () => {
    fixture.detectChanges();
    expect(component.form.value).toEqual({ title: '', url: '', notes: '' });
    expect(component.isEdit).toBeFalse();
  });

  it('should patch form values when editing', () => {
    component.bookmarkId = '1';
    bookmarkService.getBookmarkById.and.returnValue(of(mockBookmark));

    fixture.detectChanges();

    expect(component.isEdit).toBeTrue();
    expect(component.form.value.title).toBe(mockBookmark.title);
    expect(component.form.value.url).toBe(mockBookmark.url);
    expect(component.form.value.notes).toBe(mockBookmark.notes);
  });

  it('should not dispatch if form is invalid', () => {
    fixture.detectChanges();
    spyOn(store, 'dispatch');

    component.save();

    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should dispatch createBookmark if form is valid and not editing', () => {
    fixture.detectChanges();
    spyOn(store, 'dispatch');

    component.form.setValue({
      title: 'New',
      url: 'https://new.com',
      notes: 'Note',
    });
    component.save();

    expect(store.dispatch).toHaveBeenCalledWith(
      jasmine.objectContaining({
        type: createBookmark.type,
        bookmark: jasmine.objectContaining({
          title: 'New',
          url: 'https://new.com',
          notes: 'Note',
        }),
      })
    );
  });

  it('should dispatch updateBookmark if form is valid and editing', () => {
    component.bookmarkId = '1';
    bookmarkService.getBookmarkById.and.returnValue(of(mockBookmark));
    fixture.detectChanges();
    spyOn(store, 'dispatch');

    component.form.setValue({
      title: 'Updated',
      url: 'https://updated.com',
      notes: 'Note',
    });
    component.save();

    expect(store.dispatch).toHaveBeenCalledWith(
      jasmine.objectContaining({
        type: updateBookmark.type,
        bookmark: jasmine.objectContaining({
          id: '1',
          title: 'Updated',
          url: 'https://updated.com',
        }),
      })
    );
  });

  it('should navigate to "/" on cancel', () => {
    fixture.detectChanges();
    spyOn(router, 'navigate');

    component.cancel();

    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should mark form as invalid if required fields are empty', () => {
    fixture.detectChanges();
    component.form.setValue({ title: '', url: '', notes: '' });
    expect(component.form.invalid).toBeTrue();
  });
});
