import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/SharedPortal/Services/main.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
allUsers:any = [];
  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.mainService.getAllUsers().subscribe((res:any)=>{
      this.allUsers = res.Result;
    })
  }

}
