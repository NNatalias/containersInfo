import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, Subject, throwError} from 'rxjs';


@Injectable({providedIn: 'root'})
export class ContainerService {
  private error: Error;
  public error$: Subject<string> = new Subject<string>();
  constructor(private http: HttpClient) {
  }
  searchContainerInfo(containerNumber: string): any {
    return this.http.get(`http://www.mocky.io/v2/5ddbad8a3400005200eadd4a?numer=${containerNumber}`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
}
  private handleError(error: HttpErrorResponse): Observable<any> {
    switch (error.error.error.toString()) {
      case '404':
        this.error$.next('Операция не удалась - что-то пошло не так');
        break;
    }
    return throwError(error);
  }
}
