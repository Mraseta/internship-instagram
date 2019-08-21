import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: Http,
    private cookieService: CookieService) { }

  

  searchPosts(input: string) {
    return this.http.get("http://127.0.0.1:3000/posts/search?input=" + input)
    .pipe(
      map((response: Response) => {
        const data = response.json();
        return data;
      }),
      catchError((err: Response) => {
        return throwError(JSON.parse(err.text()));
      })
    );
  }

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

  

  postComment(postid: string, loggedid: string, text: string) {
    var headers = new Headers();
    headers.append('x-auth', JSON.parse(this.cookieService.get('token')));

    return this.http.post("http://127.0.0.1:3000/posts/comment", {
      post: postid,
      loggedid: loggedid,
      text: text
    }, {headers})
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

  getPosts(luser: string) {
    var headers = new Headers();
    headers.append('x-auth', JSON.parse(this.cookieService.get('token')));

    return this.http.get("http://127.0.0.1:3000/posts/fposts", {headers})
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

  uploadImage(id, imageUrl, desc) {
    var headers = new Headers();
    headers.append('x-auth', JSON.parse(this.cookieService.get('token')));

    return this.http.post("http://127.0.0.1:3000/posts/upload", {
      loggedid: id,
      base64image: imageUrl,
      name: desc
    }, {headers})
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

  newPost(userId, imageUrl, description) {
    var headers = new Headers();
    headers.append('x-auth', JSON.parse(this.cookieService.get('token')));

    return this.http.post("http://127.0.0.1:3000/posts/newpost", {
      id: userId,
      imageUrl: imageUrl,
      description: description
    }, {headers})
    .pipe(
      map((response: Response) => {
        const data = response.json();
        return data;
      }),
      catchError((err: Response) => {
        return throwError(JSON.parse(err.text()));
      })
    );
  }
}
