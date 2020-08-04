import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from '../account.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
   loginForm: FormGroup;

  constructor(private accountService : AccountService, private router: Router) { }

  ngOnInit() {
    this.creatLoginFrom();

  }

  creatLoginFrom() {
    this.loginForm = new FormGroup({
      //change to userName/email
      // userName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required,Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      password: new FormControl('', Validators.required)
    })
  }

  onSubmit() {
    this.accountService.login(this.loginForm.value).subscribe(()=>{this.router.navigateByUrl('/shop');},error=>{
      console.log(error);
    })
  }

}
