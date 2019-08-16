import { Component, OnInit, Input } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FullpostService } from '../services/fullpost.service';

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
  isLoaded = false;

  constructor(private http: Http,
    private fullpostService: FullpostService) { }

  ngOnInit() {
    this.getAuthor();
  }

  getAuthor() {
    this.fullpostService.getAuthorId(this.comment.authorId)
      .subscribe(
        (user) => {
          this.author = user.user;
          this.username = user.username;
          this.text = this.comment.text;
          this.isLoaded = true;
          console.log('author', this.author);
        }, (error) => console.log(error)
      );
  }

}
