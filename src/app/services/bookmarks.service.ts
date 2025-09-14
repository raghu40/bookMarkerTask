import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Bookmark } from '../models/bookmark.model';
import { catchError } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  private bookMarksApi = 'http://localhost:3000/bookmarks';

  private httpClient = inject(HttpClient);

  getBookmarks() {
    return this.httpClient
      .get<Bookmark[]>(this.bookMarksApi)
      .pipe(catchError(this.handleError));
  }

  getBookmarkById(id: number | string) {
    return this.httpClient
      .get<Bookmark>(`${this.bookMarksApi}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createBookmark(bookmark: Partial<Bookmark>) {
    return this.httpClient
      .post<any>(this.bookMarksApi, bookmark)
      .pipe(catchError(this.handleError));
  }

  updateBookmark(bookmark: Partial<Bookmark>) {
    return this.httpClient
      .put(`${this.bookMarksApi}/${bookmark.id}`, bookmark)
      .pipe(catchError(this.handleError));
  }
  deleteBookmark(id: number) {
    return this.httpClient
      .delete(`${this.bookMarksApi}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): never {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}
