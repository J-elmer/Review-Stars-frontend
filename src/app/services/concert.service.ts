import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError } from "rxjs";

import { Concert } from "../model/Concert";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ConcertService {
  private concertUrl = environment.concertApi;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
  ) { }

  getConcerts(): Observable<Concert[]> {
    const url = `${this.concertUrl}all`;
    return this.http.get<Concert[]>(url).pipe(
      catchError(this.handleError<Concert[]>('getConcerts', []))
    );
  }

  getPastConcerts(): Observable<Concert[]> {
    const url = `${this.concertUrl}past-concerts`;
    return this.http.get<Concert[]>(url).pipe(
      catchError(this.handleError<Concert[]>('getConcerts', []))
    );
  }

  getFutureConcerts(): Observable<Concert[]> {
    const url = `${this.concertUrl}future-concerts`;
    return this.http.get<Concert[]>(url).pipe(
      catchError(this.handleError<Concert[]>('getConcerts', []))
    );
  }

  getConcertsByPerformer(performerId: number): Observable<Concert[]> {
    const url = `${this.concertUrl}concerts-by-performer?performerId=${performerId}`;
    return this.http.get<Concert[]>(url).pipe(
      catchError(this.handleError<Concert[]>('getConcertsByPerformer', []))
    );
  }

  getConcertById(concertId: number): Observable<Concert> {
    const url = `${this.concertUrl}${concertId}`;
    return this.http.get<Concert>(url).pipe(
      catchError(this.handleError<Concert>('getConcertById'))
    );
  }

  getConcertByStage(stage: string): Observable<Concert[]> {
    const url = `${this.concertUrl}by-stage?stage=${stage}`;
    return this.http.get<Concert[]>(url).pipe(
      catchError(this.handleError<Concert[]>('getConcertsByStage', []))
    );
  }

  createConcert(concert: Concert): Observable<any> {
    const url = `${this.concertUrl}new`;
    return this.http.post<Concert>(url, concert, this.httpOptions).pipe(
      catchError(this.handleError<Concert>('createConcert'))
    );
  }

  updateConcert(concert: Concert): Observable<any>  {
    const url = `${this.concertUrl}update`;
    return this.http.put(url, concert, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateConcert'))
    );
  }

  deleteConcert(concertId: number): Observable<Concert> {
    const url = `${this.concertUrl}delete?id=${concertId}`;
    return this.http.delete<Concert>(url, this.httpOptions).pipe(
      catchError(this.handleError<Concert>('deleteConcert'))
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
      let errorResponse = error.error;
      return of(errorResponse as T);
    }
  }
}
