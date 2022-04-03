import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private toastr: ToastrService
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
    console.log(this.MyForm.value)
    this.mainService.loginUser(this.MyForm.value).subscribe((res: any) => {
      if (res.status === false) {
        this.toastr.error(res.Message);
      }
    });
  }
}
