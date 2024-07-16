import { Component, OnInit } from '@angular/core';
import { AuthApi } from '../services/auth.api';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


declare var $: any; // Declare jQuery as a global variable

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any = {};
  urlAdmin: any;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isLoginFailed!: boolean;

  constructor(
    private authApi: AuthApi,
    private router: Router,
    private ActRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.urlAdmin = this.ActRoute.snapshot.queryParams['returnUrl'] || '/dashboard/';

    if (this.authApi.isLoggedIn()) {
      this.router.navigate(['/accueil']);
    }
  }

  onSubmit() {
    this.authApi.login(this.form).subscribe({
      next: (res) => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate([this.urlAdmin]);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = 'Veuillez vérifier vos crédentiels'; // Customize error message here
        this.isLoginFailed = true;
      },
    });
  }
}