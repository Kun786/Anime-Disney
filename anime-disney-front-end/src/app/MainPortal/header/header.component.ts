import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { PublicService } from 'src/app/SharedPortal/Services/public.service';
import { _AssetsUrl } from 'src/configuration/GlobalConstants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  //Class Miscellaneous Properties
  @ViewChild('logo') Logo: ElementRef | any;
  @ViewChild('gif') Gif: ElementRef | any;
  @ViewChild('music') Music: ElementRef | any;
  @ViewChild('video') Video: ElementRef | any;
  @ViewChild('picture') Picture: ElementRef | any;
  @ViewChild('background') Background: ElementRef | any;
  @ViewChildren('MusicResolve') MusicResolve?: QueryList<ElementRef>;
  @ViewChildren('VideoResolve') VideoResolve?: QueryList<ElementRef>;

  AssetsUrl = _AssetsUrl;

  //Class Properties
  _ShowAlternateImage = false;
  _ShowLogoModal = false;
  _ShowGifModal = false;
  _ShowMusicModal = false;
  _ShowPictureModal = false;
  _ShowVideoModal = false;
  _ShowBackgroundModal = false;
  LogoForm: any = FormGroup;
  GifForm: any = FormGroup;
  MusicForm: any = FormGroup;
  VideoForm: any = FormGroup;
  PictureForm: any = FormGroup;
  BackgroundForm: any = FormGroup;
  _LogoImageUrl = '';
  _ImageName = '';
  _GifImageArray: any = [];
  _MusicArray: any = [];
  _VideoArray: any = [];
  _PictureImageArray: any = [];
  _BackgroundImageArray: any = [];
  _BackgroundVideoArray: any = [];
  userName :any;


  //Subscription
  __PostLogoSubscription?: Subscription;
  __GetLogoSubscription?: Subscription;
  __PostGifSubscription?: Subscription;
  __GetGifSubscription?: Subscription;
  __PostMusicSubscription?: Subscription;
  __GetMusicSubscription?: Subscription;
  __PostVideoSubscription?: Subscription;
  __GetVideoSubscription?: Subscription;
  __PostPictureSubscription?: Subscription;
  __GetPictureSubscription?: Subscription;
  __PostBackgroundSubscription?: Subscription;
  __GetBackgroundSubscription?: Subscription;

  constructor(private _FormBuilder: FormBuilder, private _PublicService: PublicService,
    private sanitizer:DomSanitizer
    ) {
    this.InitializeLogoForm(),
      this.InitializeGifForm(),
      this.InitializeMusicForm(),
      this.InitializeVideoForm(),
      this.InitializePictureForm(),
      this.InitializeBackgroundForm()
  }

  ngOnInit(): void {
    this.FetchPublicLogo();
    this.FetchPublicGif();
    this.FetchPublicMusic();
    this.FetchPublicVideo();
    this.FetchPublicPicture();
    this.FetchPublicBackground();
    this.userName = localStorage.getItem('userName');
  }

  Transform(Url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(Url);
  }

  InitializeLogoForm() {
    this.LogoForm = this._FormBuilder.group({
      Logo: ['']
    })
  }

  InitializeGifForm() {
    this.GifForm = this._FormBuilder.group({
      Gif: ['']
    })
  }

  InitializeMusicForm() {
    this.MusicForm = this._FormBuilder.group({
      Music: ['']
    })
  }

  InitializeVideoForm() {
    this.VideoForm = this._FormBuilder.group({
      Video: ['']
    })
  }

  InitializePictureForm() {
    this.PictureForm = this._FormBuilder.group({
      Picture: ['']
    })
  }

  InitializeBackgroundForm() {
    this.BackgroundForm = this._FormBuilder.group({
      Background: ['']
    })
  }

  GetLogo(event: any) {

    let _GetImage = event.target.files[0];
    this._ImageName = event.target.files[0].name;
    this.LogoForm.get('Logo').setValue(_GetImage);
  }

  GetGif(event: any) {

    let _GetGif = event.target.files[0];
    this._ImageName = event.target.files[0].name;
    this.GifForm.get('Gif').setValue(_GetGif);
  }

  GetMusic(event: any) {

    let _GetMusic = event.target.files[0];
    this._ImageName = event.target.files[0].name;
    this.MusicForm.get('Music').setValue(_GetMusic);
  }

  GetVideo(event: any) {

    let _GetVideo = event.target.files[0];
    this._ImageName = event.target.files[0].name;
    this.VideoForm.get('Video').setValue(_GetVideo);
  }

  GetPicture(event: any) {

    let _GetPicture = event.target.files[0];
    this._ImageName = event.target.files[0].name;
    this.PictureForm.get('Picture').setValue(_GetPicture);
  }

  GetBackground(event: any) {

    let _GetBackground = event.target.files[0];
    this._ImageName = event.target.files[0].name;
    this.BackgroundForm.get('Background').setValue(_GetBackground);
  }

  FetchPublicLogo() {
    this.__GetLogoSubscription = this._PublicService.GetPublicLogo().subscribe((DataComingFromBackend: any) => {
      this._LogoImageUrl = _AssetsUrl + DataComingFromBackend.Result[0].ImageUrl;
    })
  }

  FetchPublicGif() {
    this.__GetLogoSubscription = this._PublicService.GetPublicGif().subscribe((DataComingFromBackend: any) => {
      this._GifImageArray = DataComingFromBackend.Result;
    })
  }

  FetchPublicMusic() {
    this.__GetLogoSubscription = this._PublicService.GetPublicMusic().subscribe((DataComingFromBackend: any) => {
      this._MusicArray = DataComingFromBackend.Result;
    })
  }

  FetchPublicVideo() {
    this.__GetLogoSubscription = this._PublicService.GetPublicVideo().subscribe((DataComingFromBackend: any) => {
      this._VideoArray = DataComingFromBackend.Result;
    })
  }

  FetchPublicPicture() {
    this.__GetLogoSubscription = this._PublicService.GetPublicPicture().subscribe((DataComingFromBackend: any) => {
      this._PictureImageArray = DataComingFromBackend.Result;
    })
  }

  FetchPublicBackground() {
    this.__GetLogoSubscription = this._PublicService.GetPublicBackground().subscribe((DataComingFromBackend: any) => {
      DataComingFromBackend.Result.forEach((_Objects: any) => {
        if (_Objects.MediaType === "video/mp4") {
          this._BackgroundVideoArray.push(_Objects);
        } else {
          this._BackgroundImageArray.push(_Objects);
        }
      })
    })
  }

  SubmitLogo() {
    if (this.LogoForm.get('Logo').value === ('' || null)) {
      null;
    } else {
      const _FormData = new FormData();
      _FormData.append('Logo', this.LogoForm.get('Logo').value);
      this.__PostLogoSubscription = this._PublicService.PostPublicLogo(_FormData).subscribe((DataComingFromBackEnd: any) => { this.ngOnInit(); })
      this.LogoForm.reset();
      this.Logo.nativeElement.value = null;
      this._ImageName = '';
    }
  }

  SubmitGif() {
    if (this.GifForm.get('Gif').value === ('' || null)) {
      null;
    } else {
      const _FormData = new FormData();
      _FormData.append('Gif', this.GifForm.get('Gif').value);
      this.__PostGifSubscription = this._PublicService.PostPublicGif(_FormData).subscribe((DataComingFromBackEnd: any) => {
        this._GifImageArray = [];
        this.ngOnInit();
      });
      this.GifForm.reset();
      this.Gif.nativeElement.value = null;
      this._ImageName = '';
    }
  }

  SubmitMusic() {
    if (this.MusicForm.get('Music').value === ('' || null)) {
      null;
    } else {
      const _FormData = new FormData();
      _FormData.append('Music', this.MusicForm.get('Music').value);
      this.__PostMusicSubscription = this._PublicService.PostPublicMusic(_FormData).subscribe((DataComingFromBackEnd: any) => {
        this._MusicArray = []
        this.ngOnInit();
      });
      this.MusicForm.reset();
      this.Music.nativeElement.value = null;
      this._ImageName = '';
    }

  }

  SubmitVideo() {
    if (this.VideoForm.get('Video').value === ('' || null)) {
      null;
    } else {
      const _FormData = new FormData();
      _FormData.append('Video', this.VideoForm.get('Video').value);
      this.__PostVideoSubscription = this._PublicService.PostPublicVideo(_FormData).subscribe((DataComingFromBackEnd: any) => {
        this._VideoArray = [];
        this.ngOnInit();
      });
      this.VideoForm.reset();
      this.Video.nativeElement.value = null;
      this._ImageName = '';
    }
  }

  SubmitPicture() {
    if (this.PictureForm.get('Picture').value === ('' || null)) {
      null;
    } else {
      const _FormData = new FormData();
      _FormData.append('Picture', this.PictureForm.get('Picture').value);
      this.__PostPictureSubscription = this._PublicService.PostPublicPicture(_FormData).subscribe((DataComingFromBackEnd: any) => {
        this._PictureImageArray = []
        this.ngOnInit();
      });
      this.PictureForm.reset();
      this.Picture.nativeElement.value = null;
      this._ImageName = '';
    }
  }

  SubmitBackground() {
    if (this.BackgroundForm.get('Background').value === ('' || null)) {
      null;
    } else {
      const _FormData = new FormData();
      _FormData.append('Background', this.BackgroundForm.get('Background').value);
      this.__PostBackgroundSubscription = this._PublicService.PostPublicBackground(_FormData).subscribe((DataComingFromBackEnd: any) => {
        this._BackgroundImageArray = [];
        this._BackgroundVideoArray = [];
        this.ngOnInit();
      });
      this.BackgroundForm.reset();
      this.Background.nativeElement.value = null;
      this._ImageName = '';
    }
  }

  StopMusic() {
    this.MusicResolve?.forEach((_Elements: ElementRef) => {
      _Elements.nativeElement.pause();
      _Elements.nativeElement.currentTime = 0;
    });
  }

  StopVideo() {
    this.VideoResolve?.forEach((_Elements: ElementRef) => {
      _Elements.nativeElement.pause();
      _Elements.nativeElement.currentTime = 0;
    })
  }

  ngOnDestroy(): void {
    if (this.__PostLogoSubscription) {
      this.__PostLogoSubscription.unsubscribe();
    }
    if (this.__GetLogoSubscription) {
      this.__GetLogoSubscription.unsubscribe();
    }
  }

  ShowLogoModal() { this._ShowLogoModal = true; this._ShowGifModal = false; this._ShowMusicModal = false; this._ShowPictureModal = false; this._ShowVideoModal = false; this._ShowBackgroundModal = false }
  ShowGifModal() { this._ShowGifModal = true; this._ShowLogoModal = false; this._ShowMusicModal = false; this._ShowPictureModal = false; this._ShowVideoModal = false; this._ShowBackgroundModal = false }
  ShowMusicModal() { this._ShowMusicModal = true; this._ShowGifModal = false; this._ShowLogoModal = false; this._ShowPictureModal = false; this._ShowVideoModal = false; this._ShowBackgroundModal = false }
  ShowVideoModal() { this._ShowVideoModal = true; this._ShowGifModal = false; this._ShowMusicModal = false; this._ShowPictureModal = false; this._ShowLogoModal = false; this._ShowBackgroundModal = false }
  ShowPictureModal() { this._ShowPictureModal = true; this._ShowGifModal = false; this._ShowMusicModal = false; this._ShowLogoModal = false; this._ShowVideoModal = false; this._ShowBackgroundModal = false }
  ShowBackgroundModal() { this._ShowBackgroundModal = true; this._ShowGifModal = false; this._ShowMusicModal = false; this._ShowPictureModal = false; this._ShowVideoModal = false; this._ShowLogoModal = false }
}
