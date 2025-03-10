import { catchError, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',})

export class RequestManager {
  private path!: string;

  public setPath(service: string) {
    this.path = (environment as any)[service];
  }

  constructor(private http: HttpClient) {}

  get(endpoint: any) {
    return this.http.get<any>(`${this.path}${endpoint}`).pipe(
      map((res) => {
        const responseBody = res as { Body?: any };
        return responseBody?.Body ?? res;
      }),
      catchError((error) => {

        return throwError(() => (error?.error?.message || error.message));
      })
    );
  }
}
