// vim: set tabstop=2 expandtab filetype=javascript:
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BaseComponent } from '@app/common/base-component';
import { AuthService } from '@app/common/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  myForm: FormGroup;

  constructor(private auth: AuthService, private router: Router) {
    super();
    this.myForm = new FormGroup({
      user: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    const user = this.myForm.get('user');
    const pass = this.myForm.get('password');
    if (this.myForm.valid && user !== null && pass !== null) {
      this.lazyUnsubscribe(
        this.auth.login(this, user.value, pass.value)
          .subscribe(
            (url) => {
              this.router.navigate([url]);
            }
          )
      );
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.myForm.controls; }
}
