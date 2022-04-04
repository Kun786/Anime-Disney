import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/SharedPortal/Services/main.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  MyForm: any = FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private mainService: MainService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.MyFormModel();
  }

  MyFormModel() {
    this.MyForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  sendData() {
    console.log(this.MyForm.value);
    this.mainService.loginUser(this.MyForm.value).subscribe((res: any) => {
      console.log(res);
      if (res.Token) {
        localStorage.setItem('userToken', res.Token);
        localStorage.setItem('userName', res.User.Name);
        this.router.navigate(['/home']);
      } else {
        this.toastr.error(res.Message);
      }
    });
  }
}
