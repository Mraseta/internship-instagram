import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fposts = [];
  isLoaded = false;

  constructor(private http: Http,
    private router: Router,
    private cookieService: CookieService,
    private homeService: HomeService) { }

  ngOnInit() {
    // console.log(this.router.url);
    if (!this.cookieService.get('loggedUser')) {
      this.router.navigate(['/login']);
    }
    else {
      this.loadPosts();
    }
  }

  loadPosts() {
    var luser = JSON.parse(this.cookieService.get('loggedUser'));
    this.homeService.getPosts(luser._id)
    .subscribe(
      (posts) => {
        this.fposts = Object.assign([], (posts.posts));
        this.isLoaded = true;
      }, (error) => alert(error.text)
    );
  }

}
