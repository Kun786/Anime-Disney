import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  PostPublicLogoUrl,
  PostPublicGifUrl,
  PostPublicMusicUrl,
  PostPublicVideoUrl,
  PostPublicPictureUrl,
  PostPublicBackgroundUrl,
  GetPublicLogoUrl
} from '../../../configuration/GlobalConstants';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  constructor(private _HttpClient:HttpClient) { }

  PostPublicLogo(_PayLoad:any){
    return this._HttpClient.post(PostPublicLogoUrl,_PayLoad);
  }

  PostPublicGif(_Payload:any){
    return this._HttpClient.post(PostPublicGifUrl,_Payload);
  }

  PostPublicMusic(_Payload:any){
    return this._HttpClient.post(PostPublicMusicUrl,_Payload);
  }

  PostPublicVideo(_Payload:any){
    return this._HttpClient.post(PostPublicVideoUrl,_Payload);
  }

  PostPublicPicture(_Payload:any){
    return this._HttpClient.post(PostPublicPictureUrl,_Payload);
  }

  PostPublicBackground(_Payload:any){
    return this._HttpClient.post(PostPublicBackgroundUrl,_Payload);
  }

  GetPublicLogo(){
    return this._HttpClient.get(GetPublicLogoUrl);
  }
}
