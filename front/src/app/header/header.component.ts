import { Component, OnInit, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewpostComponent } from '../newpost/newpost.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() input: string = "";
  reload = false;

  constructor(private cookieService: CookieService,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit() {
    
  }

  onClick() {
    this.cookieService.delete('loggedUser');
    this.router.navigate(['/login']);
  }

  homeClick() {
    this.router.navigate(['/']);
  }

  onSubmit(form: NgForm) {
    // var target = "/search/"+form.value.inputText;
    this.router.navigate(['/search'], { queryParams: { input: form.value.inputText } });
    // this.router.navigate(['/searchposts'], { queryParams: { input: form.value.inputText } });
  }

  profClick() {
    this.router.navigate(['/profile'], { queryParams: { username: JSON.parse(this.cookieService.get('loggedUser')).username } });
  }

  newPostClick() {
    const modal = this.modalService.open(NewpostComponent);
  }

}
