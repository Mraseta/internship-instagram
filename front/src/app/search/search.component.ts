import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  results = [];
  isLoaded = false;

  constructor(private router: Router,
    private http: Http,
    private activeRoute: ActivatedRoute,
    private searchService: SearchService) { }

  ngOnInit() {
    this.getResults();

    this.activeRoute.queryParams.subscribe(queryParams => {
      if (this.router.url.includes('search'))
        this.getResults();
    });
  }

  getResults() {
    var input = this.router.url.split('=')[1];
    this.searchService.getUsers(input)
    .subscribe(
      (users) => {
        this.results = Object.assign([], users.ret);
        console.log('results', this.results);
        this.isLoaded = true;
      }, (error) => console.log(error.text)
    );
  }

}
