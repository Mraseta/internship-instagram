import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { FullpostService } from '../services/fullpost.service';

@Component({
  selector: 'app-fullpost',
  templateUrl: './fullpost.component.html',
  styleUrls: ['./fullpost.component.css']
})
export class FullpostComponent implements OnInit {
  post: any;
  author: any;
  created: string = "";
  comments: any;
  commenters: object[] = [];
  commentersLoaded = false;
  commentText: string = "";
  description: string = "";

  constructor(private http: Http,
    private router: Router,
    private cookieService: CookieService,
    private fullpostService: FullpostService) { }

  ngOnInit() {
    this.getPost();
  }

  getPost() {
    if (!this.cookieService.get('loggedUser')) {
      this.router.navigate(['/login']);
    }
    else {
      var postid = this.router.url.split('=')[1];
      this.fullpostService.getPostId(postid)
      .subscribe(
        (gpost) => {
          this.post = gpost.post;
          this.post.comments.sort(function(a, b) {
            return b.created < a.created ? 1 : -1;
          });
          this.comments = this.post.comments;
          this.description = this.post.description;
          console.log('comm', this.comments);
          this.getAuthor();
        }, (error) => console.log(error)
      );
    }
  }

  getAuthor() {
    this.fullpostService.getAuthorId(this.post.userId)
    .subscribe(
      (user) => {
        this.author = user.user;
        this.created = this.post.created.toString().substring(0,10);
        this.getCommenters();
      }, (error) => console.log(error)
    );
  }

  getCommenters() {
    var i=0;
    this.comments.forEach(element => {
      this.http.get("http://127.0.0.1:3000/users/find?id="+element.authorId)
      .pipe(
        map((response: Response) => {
          const data = response.json();
          return data;
        }),
        catchError((err: Response) => {
          return throwError(JSON.parse(err.text()));
        })
      )
      .subscribe(
        (user) => {
          this.commenters.push(user.user);
          i++;
          if (i === this.comments.length) {
            this.commentersLoaded = true;
          }
        }, (error) => console.log(error)
      );
    });
  }

  logCommenters() {
    console.log('commenters', this.commenters);
  }

  sendComment() {
    this.fullpostService.postComment(this.post._id, JSON.parse(this.cookieService.get('loggedUser'))._id, this.commentText)
    .subscribe(
      (sentComment: any) => {
        this.post.comments.push(sentComment);
        this.commentText = "";
        this.getPost();
      }, (error) => console.log(error.text)
    );
  }

}
