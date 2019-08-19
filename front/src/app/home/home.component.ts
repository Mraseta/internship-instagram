import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fposts = [];
  isLoaded = false;

  constructor(private router: Router,
    private cookieService: CookieService,
    private postService: PostService) { }

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
    this.postService.getPosts(luser._id)
    .subscribe(
      (posts) => {
        this.fposts = Object.assign([], (posts.posts));
        this.isLoaded = true;
      }, (error) => alert(error.text)
    );
  }

}
