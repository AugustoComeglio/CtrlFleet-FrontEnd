import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private builder: FormBuilder, // Renombré buildr a builder
    private service: LoginService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  myForm = this.builder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  login() {
    console.log('login1');
    const dataToSave = this.myForm.value;
    const datajson = {
      username: dataToSave.email,
      password: dataToSave.password,
      grant_type: 'password',
    };
    console.log('login2');
    this.service.PostLogin(datajson).subscribe((validado) => {
      if (this.cookieService.get('accessToken') && validado) {
        this.router.navigate(['dashboard']);
      }
    });
  }
}
