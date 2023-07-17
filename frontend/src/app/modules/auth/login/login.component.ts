import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICredentials, ILoginResponse, IResponse } from 'src/app/core/models/auth.models';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formSubmitted : boolean = false;
  loginForm =  new  FormGroup({
    username : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  });
  constructor(private authService : AuthService, private router : Router) {}

  login() {
    this.formSubmitted = true;
    this.authService.login(this.loginForm.value as ICredentials).subscribe({
      next : (response : ILoginResponse)=>{
        this.authService.setToken(response.token);
          this.authService.setUserDetails(response.userDetails)
          if(response.userDetails.roles.length > 1) {
            this.router.navigate(['auth/choose-role'])
          } else {
            this.authService.setCurrentRole(response.userDetails.roles[0].toLowerCase());
            this.router.navigate([this.authService.getCurrentRole()])
          }
          this.loginForm.reset();
          this.formSubmitted = false;
      },
      error : (response : HttpErrorResponse)=>{
        this.formSubmitted = false;
        // alert(response.error.message)
      }
    })
  }
}
