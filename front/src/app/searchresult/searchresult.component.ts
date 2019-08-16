import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.css']
})
export class SearchresultComponent implements OnInit {
  @Input() user: any;

  constructor(private router: Router,
    private cookieService: CookieService) { }

  ngOnInit() {
  }

  onClick() {
    this.router.navigate(['/profile'], { queryParams: { username: this.user.username, loggedid: JSON.parse(this.cookieService.get('loggedUser'))._id }});
  }

}
