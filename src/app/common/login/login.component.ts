// vim: set tabstop=2 expandtab filetype=javascript:
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '@app/common/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit
{

  myForm: FormGroup;
  loading: boolean = false;
  error: string;

  constructor(private auth: AuthService) { }

  ngOnInit()
  {
    this.myForm = new FormGroup(
    {
      user: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  onSubmit(event)
  {
    if( this.myForm.valid )
    {
      this.loading = true;
      this.error = "";
      this.auth.login(this.myForm.get('user').value, this.myForm.get('password').value)
        .subscribe(
          response => 
          {
            this.loading = false;
            // Nothing to do, redirect is done by auth service
          },
          fail => 
          {
            this.loading = false;
            this.error = 'Username or password is incorrect';
          },
          () =>
          {
            this.loading = false;
          }
        );
    }
  }
}
