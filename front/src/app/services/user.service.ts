import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: Http) { }

  postUser(username: string, password: string) {
    return this.http.post("http://127.0.0.1:3000/users/login", {
      username: username,
      password: password
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

  getInfo(username: string, loggedid: string) {
    return this.http.get("http://127.0.0.1:3000/users/profile?username="+username+'&loggedid='+loggedid)
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
}
