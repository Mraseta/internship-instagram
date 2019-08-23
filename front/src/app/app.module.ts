import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { FullpostComponent } from './fullpost/fullpost.component';
import { CookieService } from 'ngx-cookie-service';
import { CommentComponent } from './comment/comment.component';
import { SearchresultComponent } from './searchresult/searchresult.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { NewpostComponent } from './newpost/newpost.component';
import { SearchpostsComponent } from './searchposts/searchposts.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'post', component: FullpostComponent},
  { path: 'search', component: SearchComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'searchposts', component: SearchpostsComponent},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    PostComponent,
    FullpostComponent,
    CommentComponent,
    SearchresultComponent,
    SearchComponent,
    ProfileComponent,
    NewpostComponent,
    SearchpostsComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    NgbModalModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  entryComponents: [NewpostComponent]
})
export class AppModule { }
