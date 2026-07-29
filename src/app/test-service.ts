import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { catchError, delay, Observable, of, retry } from 'rxjs';
import { environment } from '../environments/environment';

const BASE_PATH = environment.basePath

// New way of doing it:)
@Service()

/*
Old Way of doing it:)
 @Injectable({
providedIn: 'root'
})
 */
export class TestService {

    // New way of doing it:)
    // constructor(private http: HttpClient) { }

    // Old Way of doing it:)
    private readonly http = inject(HttpClient);

    public getData(retries: number = 3, searchDelayMilliSeconds: number = 0): Observable<string> {
        
        //alert(`${BASE_PATH}/versioning/v1`);
        //return this.http.get<string>(`${BASE_PATH}/versioning/v1`);
        //return of('Hello World');       

        return this.http.get<string>(`${BASE_PATH}/versioning/v1`, {
            timeout: 2000,
        })
        .pipe(
        retry(retries),
        delay(searchDelayMilliSeconds),
        catchError((error) => {
            return of<string>("Errorere nella chiamata HTTP: " + error.message);
        })
        );
    }
}







