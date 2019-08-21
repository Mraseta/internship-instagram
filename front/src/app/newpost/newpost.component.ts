import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostService } from '../services/post.service';

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
  fileToUpload: any;
  name: any;

  constructor(private cookieService: CookieService,
    private modalService: NgbModal,
    private postService: PostService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.description = this.description.replace(/  +/g, ' ');
    this.description = this.description.replace(/\t/g, ' ');
    this.uploadImage();

    const imageUrl = `assets/images/${this.name}`;

      this.postService.newPost(JSON.parse(this.cookieService.get('loggedUser'))._id, imageUrl, this.description)
        .subscribe(
          (data: any) => {this.modalService.dismissAll();},
          (error) => alert(error.text)
        );
  }

  preview(files) {
    this.handleFileInput(files);

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

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.name = this.fileToUpload.name;

    if (this.fileToUpload) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(this.fileToUpload);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
  }

  uploadImage = function() {
    // return new Promise((resolve, reject) => {
      this.postService.uploadImage(JSON.parse(this.cookieService.get('loggedUser'))._id, this.base64textString, this.name)
        .subscribe(
          (data: any) => {

          }, //resolve();},
          (error) => alert('error')// reject();}
        );
    // });
  }
}
