import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PublicService } from 'src/app/SharedPortal/Services/public.service';
import { _AssetsUrl } from 'src/configuration/GlobalConstants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  //Class Properties
  _ShowAlternateImage=false;
  _ShowLogoModal=false;
  _ShowGifModal=false;
  _ShowMusicModal=false;
  _ShowPictureModal=false;
  _ShowVideoModal=false;
  _ShowBackgroundModal=false;
  LogoForm:any = FormGroup;
  GifForm:any = FormGroup;
  MusicForm:any = FormGroup;
  VideoForm:any = FormGroup;
  PictureForm:any = FormGroup;
  BackgroundForm:any = FormGroup;
  _LogoImageUrl='';


  //Subscription
  __PostLogoSubscription?:Subscription;
  __GetLogoSubscription?:Subscription;
  constructor(private _FormBuilder: FormBuilder, private _PublicService:PublicService) { 
    this.InitializeLogoForm(),
    this.InitializeGifForm(),
    this.InitializeMusicForm(),
    this.InitializeVideoForm(),
    this.InitializePictureForm(),
    this.InitializeBackgroundForm()
   }

  ngOnInit(): void {
    this.FetchPublicLogo();
  }

  
  InitializeLogoForm(){
    this.LogoForm = this._FormBuilder.group({
      Logo:['']
    })
  }

  InitializeGifForm(){
    this.GifForm = this._FormBuilder.group({
      Gif:['']
    })
  }

  InitializeMusicForm(){
    this.MusicForm = this._FormBuilder.group({
      Music:['']
    })
  }

  InitializeVideoForm(){
    this.VideoForm = this._FormBuilder.group({
      Video:['']
    })
  }

  InitializePictureForm(){
    this.PictureForm = this._FormBuilder.group({
      Picture:['']
    })
  }

  InitializeBackgroundForm(){
    this.BackgroundForm = this._FormBuilder.group({
      Background:['']
    })
  }

  GetLogo(event:any){
    let _GetImage=event.target.files[0];
    this.LogoForm.get('Logo').setValue(_GetImage);
  }

  GetGif(event:any){
    let _GetGif=event.target.files[0];
    this.GifForm.get('Gif').setValue(_GetGif);
  }

  GetMusic(event:any){
    let _GetMusic=event.target.files[0];
    this.MusicForm.get('Music').setValue(_GetMusic);
  }

  GetVideo(event:any){
    let _GetVideo=event.target.files[0];
    this.GifForm.get('Video').setValue(_GetVideo);
  }

  GetPicture(event:any){
    let _GetPicture=event.target.files[0];
    this.GifForm.get('Picture').setValue(_GetPicture);
  }

  GetBackground(event:any){
    let _GetBackground=event.target.files[0];
    this.GifForm.get('Background').setValue(_GetBackground);
  }

  FetchPublicLogo(){
    this.__GetLogoSubscription = this._PublicService.GetPublicLogo().subscribe((DataComingFromBackend:any) => {
      this._LogoImageUrl = _AssetsUrl+DataComingFromBackend.Result[0].ImageUrl;
    })
  }

  SubmitLogo(){
    const _FormData = new FormData();
    _FormData.append('Logo',this.LogoForm.get('Logo').value);
    this.__PostLogoSubscription = this._PublicService.PostPublicLogo(_FormData).subscribe((DataComingFromBackEnd :any )=>{ this.ngOnInit(); })
  }

  SubmitGif(){

  }

  SubmitMusic(){

  }

  SubmitVideo(){

  }

  SubmitPicture(){

  }

  SubmitBackground(){

  }

  
  ngOnDestroy(): void {
    if(this.__PostLogoSubscription){
      this.__PostLogoSubscription.unsubscribe();
    }
    if(this.__GetLogoSubscription){
      this.__GetLogoSubscription.unsubscribe();
    }
  }

  ShowLogoModal(){this._ShowLogoModal=true;this._ShowGifModal=false;this._ShowMusicModal=false;this._ShowPictureModal=false;this._ShowVideoModal=false;this._ShowBackgroundModal=false}
  ShowGifModal(){this._ShowGifModal=true;this._ShowLogoModal=false;this._ShowMusicModal=false;this._ShowPictureModal=false;this._ShowVideoModal=false;this._ShowBackgroundModal=false}
  ShowMusicModal(){this._ShowMusicModal=true;this._ShowGifModal=false;this._ShowLogoModal=false;this._ShowPictureModal=false;this._ShowVideoModal=false;this._ShowBackgroundModal=false}
  ShowVideoModal(){this._ShowVideoModal=true;this._ShowGifModal=false;this._ShowMusicModal=false;this._ShowPictureModal=false;this._ShowLogoModal=false;this._ShowBackgroundModal=false}
  ShowPictureModal(){this._ShowPictureModal=true;this._ShowGifModal=false;this._ShowMusicModal=false;this._ShowLogoModal=false;this._ShowVideoModal=false;this._ShowBackgroundModal=false}
  ShowBackgroundModal(){this._ShowBackgroundModal=true;this._ShowGifModal=false;this._ShowMusicModal=false;this._ShowPictureModal=false;this._ShowVideoModal=false;this._ShowLogoModal=false}
}
