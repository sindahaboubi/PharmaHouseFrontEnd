import { Component, OnInit } from '@angular/core';
import { AuthApi } from '../services/auth.api';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
    role: ['Livreur']
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authApi: AuthApi, private router: Router) {}

  ngOnInit(): void {
    // Initialization code if needed
  }

  onSubmit(): void {
    this.authApi.register(this.form).subscribe({
      next: (data) => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/login']);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      },
    });

    // this.authApi.register(username, email, password, role).subscribe(
    //   (data: any) => {
    //     console.log(data);
    //     this.isSuccessful = true;
    //     this.isSignUpFailed = false;
    //     this.router.navigate(['/login']);
    //   },
    //   (error: any) => {
    //     console.error(error);
    //     this.errorMessage = error.error.message;
    //     this.isSignUpFailed = true;
    //   }
    // );
  }
}
