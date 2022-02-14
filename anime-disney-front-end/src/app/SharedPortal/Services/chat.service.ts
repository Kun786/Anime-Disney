import { Injectable } from '@angular/core';
import socket  from 'socket.io-client';
import { _BaseUrl } from 'src/configuration/GlobalConstants';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  socket:any;
  constructor() { this.InitializeSocket() }

  InitializeSocket(){
    this.socket = socket(_BaseUrl);
  }

  SendMessage(_Payload:any){
    this.socket.emit('connection',_Payload);
  }
}
