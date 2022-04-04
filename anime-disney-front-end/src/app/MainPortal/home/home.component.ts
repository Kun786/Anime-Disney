import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/SharedPortal/Services/chat.service';
import { MainService } from 'src/app/SharedPortal/Services/main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
countRegisterUser:any;
allUsers :any = [];

  constructor(private _ChatService:ChatService, private mainService: MainService) {}
  Message:any;
  _PublicChatArray:any = [];
  ngOnInit(): void {
    // this._ChatService.SendMessage('Message Coming From Client');
    this._ChatService.GetMessage().subscribe((MessageComingFromBackend:any) => {
      console.log('Message Coming From Backend', MessageComingFromBackend);
      this.Message = MessageComingFromBackend;
    });

    this._ChatService.GetAllPublicChat().subscribe((DataComingFromBackend:any) => {
      this._PublicChatArray = DataComingFromBackend.Result;
    });
    this.mainService.getAllUsers().subscribe((res:any)=>{
      this.allUsers = res.Result;
      this.countRegisterUser = this.allUsers.length;
    })
  }

  SendMessage(){
    this._ChatService.SendMessage('Hi Man How are you');
  }

}

    
