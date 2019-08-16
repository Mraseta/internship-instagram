import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FullpostService {

  constructor(private http: Http) { }

  getPostId(postid: string) {
    return this.http.get("http://127.0.0.1:3000/posts/post?id="+postid)
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

  getAuthorId(userId: string) {
    return this.http.get("http://127.0.0.1:3000/users/find?id="+userId)
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

  postComment(postid: string, loggedid: string, text: string) {
    return this.http.post("http://127.0.0.1:3000/posts/comment", {
      post: postid,
      loggedid: loggedid,
      text: text
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
