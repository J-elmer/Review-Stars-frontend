import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError } from "rxjs";

import { Performer } from "../model/Performer";

@Injectable({
  providedIn: 'root'
})
export class PerformerService {
  private performerUrl = 'http://localhost:6060/performer/'

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
  ) { }

  getPerformers(): Observable<Performer[]> {
    const url = `${this.performerUrl}all`;
    return this.http.get<Performer[]>(url).pipe(
      catchError(this.handleError<Performer[]>('getPerformers', []))
    );
  }

  getPerformerByName(name: string): Observable<Performer[]> {
    const url = `${this.performerUrl}byName?name=${name}`;
    return this.http.get<Performer[]>(url).pipe(
      catchError(this.handleError<Performer[]>('getPerformerByName', []))
    );
  }

  getPerformerById(id: number): Observable<Performer> {
    const url = `${this.performerUrl}${id}`;
    return this.http.get<Performer>(url).pipe(
      catchError(this.handleError<Performer>('getPerformerById'))
    );
  }

  createPerformer(performer: Performer): Observable<any> {
    const url = `${this.performerUrl}new`;
    return this.http.post<Performer>(url, performer, this.httpOptions).pipe(
      catchError(this.handleError<Performer>('createPerformer'))
    );
  }

  updatePerformer(performer: Performer): Observable<any> {
    const url = `${this.performerUrl}update`;
    return this.http.put(url, performer, this.httpOptions).pipe(
      catchError(this.handleError<any>('updatePerformer'))
    );
  }

  deletePerformer(performerId: number): Observable<Performer> {
    const url = `${this.performerUrl}delete?id=${performerId}`;
    return this.http.delete<Performer>(url, this.httpOptions).pipe(
      catchError(this.handleError<Performer>('deletePerformer'))
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
      console.error(error);
      return of(result as T);
    }
  }
}
