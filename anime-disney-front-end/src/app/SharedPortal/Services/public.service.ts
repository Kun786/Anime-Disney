import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  PostPublicLogoUrl,
  PostPublicGifUrl,
  PostPublicMusicUrl,
  PostPublicVideoUrl,
  PostPublicPictureUrl,
  PostPublicBackgroundUrl
} from '../../../configuration/GlobalConstants';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  constructor(private _HttpClient:HttpClient) { }

  PostPublicLogo(_PayLoad:any){
    return this._HttpClient.post(PostPublicLogoUrl,_PayLoad);
  }
}