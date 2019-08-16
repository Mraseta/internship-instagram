import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NewpostService } from '../services/newpost.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css']
})
export class NewpostComponent implements OnInit {
  public imagePath;
  imgURL: any;
  public message: string;
  base64textString: string;
  description: string;

  constructor(private newpostService: NewpostService,
    private cookieService: CookieService) { }

  ngOnInit() {
  }

  onSubmit() {
    
  }

  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }


  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
  }

  uploadImage = function() {
    return new Promise((resolve, reject) => {
      this.newpostService.uploadImage(JSON.parse(this.cookieService.get('loggedUser'))._id, this.base64textString, this.description)
        .subscribe(
          (data: any) => {alert('t'); resolve();},
          (error) => {alert('error'); reject();}
        );
    });
  }
}
