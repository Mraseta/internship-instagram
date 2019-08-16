import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Response } from '@angular/http';
import { Http } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(private http: Http,
    private router: Router,
    private cookieService: CookieService,
    private loginService: LoginService) { }

  ngOnInit() {
   if (this.cookieService.get('loggedUser') === null) {
    this.router.navigate(['/']);
   }

  }

  onSubmit(form: NgForm) {
    this.loginService.postUser(this.username, this.password)
    .subscribe(
      (user: any) => {
        this.cookieService.set('loggedUser', JSON.stringify(user.user));
        this.router.navigate(['/']);
      }, (error) => alert(error.text)
    );
  }
}
