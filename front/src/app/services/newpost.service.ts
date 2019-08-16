import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewpostService {

  constructor(private http: Http) { }

  uploadImage(id, imageUrl, desc) {
    return this.http.post("http://127.0.0.1:3000/newpost", {
      id: id,
      imageUrl: imageUrl,
      description: desc
    })
    .pipe(
      map((response: Response) => {
        const data = response.json();
        return data;
      }),
      catchError((err: Response) => {
        return throwError(JSON.parse(err.text()));
      })
    )
  }
}
