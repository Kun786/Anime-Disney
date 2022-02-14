import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/SharedPortal/Services/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _ChatService:ChatService) {}
  Message:any;
  ngOnInit(): void {
    // this._ChatService.SendMessage('Message Coming From Client');
    this._ChatService.GetMessage().subscribe((MessageComingFromBackend:any) => {
      console.log('Message Coming From Backend', MessageComingFromBackend);
      this.Message = MessageComingFromBackend;
    });

  }

  SendMessage(){
    this._ChatService.SendMessage('Hi Man How are you');
  }

}

    
