import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { BookmarkService } from './bookmarks.service';
import { Bookmark } from '../models/bookmark.model';

describe('BookmarkService', () => {
  let service: BookmarkService;
  let httpMock: HttpTestingController;

  const mockBookmarks: Bookmark[] = [
    { id: 1, title: 'Bookmark 1', url: 'https://example.com/1' },
    { id: 2, title: 'Bookmark 2', url: 'https://example.com/2' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        BookmarkService,
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(BookmarkService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch bookmarks', (done) => {
    service.getBookmarks().subscribe((bookmarks) => {
      expect(bookmarks).toEqual(mockBookmarks);
      done();
    });

    const req = httpMock.expectOne('http://localhost:3000/bookmarks');
    expect(req.request.method).toBe('GET');
    req.flush(mockBookmarks);
  });

  it('should handle error', (done) => {
    service.getBookmarks().subscribe({
      next: () => {},
      error: (err: Error) => {
        expect(err.message).toContain('Error Code: 500');
        done();
      },
    });

    const req = httpMock.expectOne('http://localhost:3000/bookmarks');
    req.flush('Internal server error', { status: 500, statusText: 'Server Error' });
  });
});
