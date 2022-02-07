import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PublicService } from 'src/app/SharedPortal/Services/public.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  _ShowAlternateImage=false;
  _ShowLogoModal=false;
  _ShowGifModal=false;
  _ShowMusicModal=false;
  _ShowPictureModal=false;
  _ShowVideoModal=false;
  _ShowBackgroundModal=false;
  LogoForm:any = FormGroup;


  //Subscription
  __PostLogoSubscription?:Subscription;
  __GetLogoSubscription?:Subscription;
  constructor(private _FormBuilder: FormBuilder, private _PublicService:PublicService) { this.InitializeLogoForm() }

  ngOnInit(): void {
    this.__GetLogoSubscription = this._PublicService.GetPublicLogo().subscribe((DataComingFromBackend) => {
      console.log(DataComingFromBackend);
    })
  }

  InitializeLogoForm(){
    this.LogoForm = this._FormBuilder.group({
      Logo:['']
    })
  }

  GetLogo(event:any){
    let _GetImage=event.target.files[0];
    this.LogoForm.get('Logo').setValue(_GetImage);
  }

  SubmitLogo(){
    const _FormData = new FormData();
    _FormData.append('Logo',this.LogoForm.get('Logo').value);
    this.__PostLogoSubscription = this._PublicService.PostPublicLogo(_FormData).subscribe((DataComingFromBackEnd :any )=>{
      console.log(DataComingFromBackEnd);
    })
  }

  ChangeImage(){
    this._ShowAlternateImage=true;
  }

  ngOnDestroy(): void {
    if(this.__PostLogoSubscription){
      this.__PostLogoSubscription.unsubscribe();
    }
  }

  ShowLogoModal(){this._ShowLogoModal=true;this._ShowGifModal=false;this._ShowMusicModal=false;this._ShowPictureModal=false;this._ShowVideoModal=false;this._ShowBackgroundModal=false}
  ShowGifModal(){this._ShowGifModal=true;this._ShowLogoModal=false;this._ShowMusicModal=false;this._ShowPictureModal=false;this._ShowVideoModal=false;this._ShowBackgroundModal=false}
  ShowMusicModal(){this._ShowMusicModal=true;this._ShowGifModal=false;this._ShowLogoModal=false;this._ShowPictureModal=false;this._ShowVideoModal=false;this._ShowBackgroundModal=false}
  ShowVideoModal(){this._ShowVideoModal=true;this._ShowGifModal=false;this._ShowMusicModal=false;this._ShowPictureModal=false;this._ShowLogoModal=false;this._ShowBackgroundModal=false}
  ShowPictureModal(){this._ShowPictureModal=true;this._ShowGifModal=false;this._ShowMusicModal=false;this._ShowLogoModal=false;this._ShowVideoModal=false;this._ShowBackgroundModal=false}
  ShowBackgroundModal(){this._ShowBackgroundModal=true;this._ShowGifModal=false;this._ShowMusicModal=false;this._ShowPictureModal=false;this._ShowVideoModal=false;this._ShowLogoModal=false}
}
