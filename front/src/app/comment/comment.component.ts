import { Component, OnInit, Input } from '@angular/core';
import { Http, Response } from '@angular/http';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() username: string;
  @Input() text: string;
  @Input() author: any;
  @Input() comment: any;
  @Input() profile: string = "";
  isLoaded = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getAuthor();
  }

  getAuthor() {
    this.userService.getAuthorId(this.comment.authorId)
      .subscribe(
        (user) => {
          this.author = user.user;
          this.profile = "profile?username="+this.author.username;
          this.username = user.username;
          this.text = this.comment.text;
          this.isLoaded = true;
          console.log('author', this.author);
        }, (error) => console.log(error)
      );
  }

}
