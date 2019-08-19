import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: Http) { }

  getUser(post: any) {
    return this.http.get("http://127.0.0.1:3000/users/find?id="+post.userId)
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

  getPosts(luser: string) {
    return this.http.get("http://127.0.0.1:3000/posts/fposts?loggedid=" + luser)
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
    console.log(id);
    console.log(imageUrl);
    console.log(desc);
    return this.http.post("http://127.0.0.1:3000/posts/upload", {
      loggedid: id,
      base64image: imageUrl,
      name: desc
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

  newPost(userId, imageUrl, description) {
    return this.http.post("http://127.0.0.1:3000/posts/newpost", {
      id: userId,
      imageUrl: imageUrl,
      description: description
    })
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
