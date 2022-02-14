import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
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
    this.socket.emit('OnClientMessage',_Payload);
  }

  GetMessage() {
    return new Observable((observable) => {
      this.socket.on('OnServerMessage', (Message:any) => {
        observable.next(Message);
      })
    })
  }
}
