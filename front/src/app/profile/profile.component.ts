import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  username: string = "";
  loggedid: string = "";
  image: string = "";
  followed: Boolean;
  btnText: string = "";
  ownProf: Boolean;
  posts = [];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private activeRoute: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
      this.loggedid = JSON.parse(this.cookieService.get('loggedUser'))._id;
    });

    this.loadInfo();

    this.activeRoute.queryParams.subscribe(queryParams => {
      if (this.router.url.includes('profile'))
        this.loadInfo();
    });
  }

  loadInfo() {
    this.userService.getInfo(this.username)
      .subscribe(
        (info) => {
          this.user = info.user;
          this.image = info.image;
          this.followed = info.followed;
          if (this.followed) {
            this.btnText = "Unfollow";
          } else {
            this.btnText = "Follow";
          }
          this.posts = Object.assign([], info.posts);
          this.ownProf = !(this.username === JSON.parse(this.cookieService.get('loggedUser')).username);
        }
      )
  }

  onClick() {
    // if (this.followed) {
    //   this.userService.unfollow(this.user._id, JSON.parse(this.cookieService.get('loggedUser'))._id)
    //   .subscribe(
    //     () => {
    //       this.loadInfo();
    //     }
    //   )
    // } else {
    //   this.userService.follow(this.user._id, JSON.parse(this.cookieService.get('loggedUser'))._id)
    //   .subscribe(
    //     () => {
    //       this.loadInfo();
    //     }
    //   )
    // }

    this.userService.changeFollowing(this.user._id, JSON.parse(this.cookieService.get('loggedUser'))._id, this.followed)
      .subscribe(
        () => {
          this.loadInfo();
        }
      )
  }

}
