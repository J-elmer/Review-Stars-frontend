import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError } from "rxjs";

import { Review } from "../model/Review";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviewUrl = 'http://localhost:7070/review/'

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient
  ) { }

  getReviews(): Observable<Review[]> {
    const url = `${this.reviewUrl}all`;
    return this.http.get<Review[]>(url).pipe(
      catchError(this.handleError<Review[]>('getReviews', []))
    );
  }

  getReviewsByPerformer(performerId: number): Observable<Review[]> {
    const url = `${this.reviewUrl}by-performer?performerId=${performerId}`;
    return this.http.get<Review[]>(url).pipe(
      catchError(this.handleError<Review[]>('getReviewsByPerformer', []))
    );
  }

  getReviewsByStars(stars: number): Observable<Review[]> {
    const url = `${this.reviewUrl}stars?stars=${stars}`;
    return this.http.get<Review[]>(url).pipe(
      catchError(this.handleError<Review[]>('getReviewsByStars', []))
    );
  }

  getReviewsWithMaxStars(stars: number): Observable<Review[]> {
    const url = `${this.reviewUrl}max-stars?stars=${stars}`;
    return this.http.get<Review[]>(url).pipe(
      catchError(this.handleError<Review[]>('getReviewsWithMaxStars', []))
    );
  }

  getReviewsWithMinStars(stars: number): Observable<Review[]> {
    const url = `${this.reviewUrl}min-stars?stars=${stars}`;
    return this.http.get<Review[]>(url).pipe(
      catchError(this.handleError<Review[]>('getReviewsWithMinStars', []))
    );
  }

  getReviewsByConcertId(concertId: number): Observable<Review[]> {
    const url = `${this.reviewUrl}review-by-concert?concertId=${concertId}`;
    return this.http.get<Review[]>(url).pipe(
      catchError(this.handleError<Review[]>('getReviewsByConcertId', []))
    );
  }

  createReview(review: Review): Observable<any> {
    const url = `${this.reviewUrl}new`;
    return this.http.post<Review>(url, review, this.httpOptions).pipe(
      catchError(this.handleError<Review>('createReview'))
    );
  }

  updateReview(review: Review): Observable<any> {
    const url = `${this.reviewUrl}update`;
    return this.http.put(url, review, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateReview'))
    );
  }

  deleteReview(reviewId: string): Observable<Review> {
    const url = `${this.reviewUrl}delete?reviewId=${reviewId}`;
    return this.http.delete<Review>(url, this.httpOptions).pipe(
      catchError(this.handleError<Review>('deleteReview'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(error as T);
    }
  }
}
