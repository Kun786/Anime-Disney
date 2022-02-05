import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  _ShowAlternateImage=false;
  _ShowLogoModal=false;
  _ShowGifModal=false;
  _ShowMusicModal=false;
  _ShowPictureModal=false;
  _ShowVideoModal=false;
  _ShowBackgroundModal=false;
  constructor() { }

  ngOnInit(): void {
  }

  ChangeImage(){
    this._ShowAlternateImage=true;
  }

  GetAmazonImage(event:any){

  }

  ShowLogoModal(){this._ShowLogoModal=true;this._ShowGifModal=false;this._ShowMusicModal=false;this._ShowPictureModal=false;this._ShowVideoModal=false;this._ShowBackgroundModal=false}
  ShowGifModal(){this._ShowGifModal=true;this._ShowLogoModal=false;this._ShowMusicModal=false;this._ShowPictureModal=false;this._ShowVideoModal=false;this._ShowBackgroundModal=false}
  ShowMusicModal(){this._ShowMusicModal=true;this._ShowGifModal=false;this._ShowLogoModal=false;this._ShowPictureModal=false;this._ShowVideoModal=false;this._ShowBackgroundModal=false}
  ShowVideoModal(){this._ShowVideoModal=true;this._ShowGifModal=false;this._ShowMusicModal=false;this._ShowPictureModal=false;this._ShowLogoModal=false;this._ShowBackgroundModal=false}
  ShowPictureModal(){this._ShowPictureModal=true;this._ShowGifModal=false;this._ShowMusicModal=false;this._ShowLogoModal=false;this._ShowVideoModal=false;this._ShowBackgroundModal=false}
  ShowBackgroundModal(){this._ShowBackgroundModal=true;this._ShowGifModal=false;this._ShowMusicModal=false;this._ShowPictureModal=false;this._ShowVideoModal=false;this._ShowLogoModal=false}
}
