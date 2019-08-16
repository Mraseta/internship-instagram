import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { CookieService } from 'ngx-cookie-service';

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
    private profileService: ProfileService,
    private cookieService: CookieService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
      this.loggedid = params['loggedid'];
    });

    this.loadInfo();

    this.activeRoute.queryParams.subscribe(queryParams => {
      if (this.router.url.includes('profile'))
        this.loadInfo();
    });
  }

  loadInfo() {
    this.profileService.getInfo(this.username, this.loggedid)
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

}
