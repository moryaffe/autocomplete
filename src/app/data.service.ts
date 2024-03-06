import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseurl = "https://localhost:7077/";
  
  constructor(private http: HttpClient) { }

  search(searchTerm: any): Observable<string[]> {

    if (searchTerm === '') {
      return of([]);
    }

    return this.http.get<string[]>(`${this.baseurl}cities?search=${searchTerm}`);
  }
}
