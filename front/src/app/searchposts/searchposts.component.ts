import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-searchposts',
  templateUrl: './searchposts.component.html',
  styleUrls: ['./searchposts.component.css']
})
export class SearchpostsComponent implements OnInit {
  posts = [];
  isLoaded = false;


  constructor(private router: Router,
    private postService: PostService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadPosts();

    this.activeRoute.queryParams.subscribe(queryParams => {
      if (this.router.url.includes('searchposts'))
        this.loadPosts();
    });
  }

  loadPosts() {
    var input = this.router.url.split('=')[1];

    this.postService.searchPosts(input)
    .subscribe(
      (sposts) => {
        this.posts = Object.assign([], sposts.ret);
        this.isLoaded = true;
      }, (error) => console.log(error)
    );
  }

}
