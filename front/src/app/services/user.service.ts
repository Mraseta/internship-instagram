import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: Http,
    private cookieService: CookieService) { }

  postUser(username: string, password: string) {
    return this.http.post("http://127.0.0.1:3000/users/login", {
      username: username,
      password: password
    })
    .pipe(
      map((response: Response) => {
        this.cookieService.set('token', JSON.stringify(response.headers.get('x-auth')));
        const data = response.json();
        return data;
      }),
      catchError((err: Response) => {
        return throwError(JSON.parse(err.text()));
      })
    )
  }

  logout() {
    var headers = new Headers();
    headers.append('x-auth', JSON.parse(this.cookieService.get('token')));

    return this.http.delete("http://127.0.0.1:3000/users/logout", {headers})
    .pipe(
      catchError((err: Response) => {
        return throwError(JSON.parse(err.text()));
      })
    )
  }

  getInfo(username: string) {
    var headers = new Headers();
    headers.append('x-auth', JSON.parse(this.cookieService.get('token')));

    return this.http.get("http://127.0.0.1:3000/users/profile?username="+username, {headers})
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

  unfollow(id: string, loggedid: string) {
    return this.http.patch("http://127.0.0.1:3000/users/unfollow", {
      id: id,
      loggedid: loggedid
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

  follow(id: string, loggedid: string) {
    return this.http.patch("http://127.0.0.1:3000/users/follow", {
      id: id,
      loggedid: loggedid
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
  
  getUsers(input: string) {
    return this.http.get("http://127.0.0.1:3000/users/search?input="+input)
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

  changeFollowing(id, loggedid, following) {
    var headers = new Headers();
    headers.append('x-auth', JSON.parse(this.cookieService.get('token')));

    return this.http.patch("http://127.0.0.1:3000/users/change", {
      id: id,
      following: following
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
}
