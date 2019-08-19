import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../services/user.service';

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
    private userService: UserService) { }

  ngOnInit() {
   if (this.cookieService.get('loggedUser') === null) {
    this.router.navigate(['/']);
   }

  }

  onSubmit(form: NgForm) {
    this.userService.postUser(this.username, this.password)
    .subscribe(
      (user: any) => {
        this.cookieService.set('loggedUser', JSON.stringify(user.user));
        this.router.navigate(['/']);
      }, (error) => alert(error.text)
    );
  }
}
