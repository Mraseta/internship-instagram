import { Component, OnInit, Input } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';

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
  @Input() words = [];

  constructor(private http: Http,
    private router: Router,
    private postService: PostService,
    private userService: UserService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.userService.getUser(this.post)
    .subscribe(
      (user) => {
        this.author = user.user;
        this.profile = "profile?username="+this.author.username;//+"&loggedid="+JSON.parse(this.cookieService.get('loggedUser'))._id;
        this.created = this.post.created.toString().substring(0,10);
        this.posturl = "post?id=" + this.post._id;
        this.description = this.post.description;
        this.words = Object.assign([], this.description.split(' '));
        this.words.forEach(element => {
          this.addSpace(element);
        });
        // this.linkHashtags(this.post.description);
      }, (error) => console.log(error)
    );
  }

  isHashtag(word) {
    word+=' ';
    if (word.charAt(0) === '#') {
      return true;
    } else {
      return false;
    }
  }

  navigateAway(word) {
    this.router.navigate(['/searchposts'],  { queryParams: { input: word } });
  }

  pageLink(word) {
    return "/searchposts?input="+word;
  }

  addSpace(word) {
    return word+' ';
  }

  linkHashtags(desc: string) {
    var words = desc.split(' ');
    words.forEach(element => {
      if (element.charAt(0) === '#') {
        // var tag = element.split('#')[1];
        element = `<a href="searchposts?input=${element}">`+element+"</a>";
      }
    });

    this.description = "";

    words.forEach(element => {
      this.description += element + ' ';
    });
  }

  // usernameClick() {
  //   this.router.navigate(['/profile'], { queryParams: { username: this.author.username, 
  //                                                       loggedid: JSON.parse(this.cookieService.get('loggedUser'))._id } })
  // }

}
