import { Component, OnInit, Input } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post: any;
  @Input() author: any;
  @Input() created: string;
  @Input() posturl: string = "";
  @Input() description: string = "";
  @Input() profile: string = "";

  constructor(private http: Http,
    private router: Router,
    private cookieService: CookieService,
    private postService: PostService) { }

  ngOnInit() {
    this.getAll();
    // console.log('created', this.created);
  }

  getAll() {
    this.postService.getUser(this.post)
    .subscribe(
      (user) => {
        this.author = user.user;
        this.profile = "profile?username="+this.author.username+"&loggedid="+JSON.parse(this.cookieService.get('loggedUser'))._id;
        this.created = this.post.created.toString().substring(0,10);
        this.posturl = "post?id=" + this.post._id;
        this.description = this.post.description;
      }, (error) => console.log(error)
    );
  }

  // usernameClick() {
  //   this.router.navigate(['/profile'], { queryParams: { username: this.author.username, 
  //                                                       loggedid: JSON.parse(this.cookieService.get('loggedUser'))._id } })
  // }

}
