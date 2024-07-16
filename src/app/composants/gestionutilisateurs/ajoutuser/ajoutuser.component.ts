import { Component, OnInit } from '@angular/core';
import { AuthApi } from '../../../services/auth.api';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ajoutuser',
  templateUrl: './ajoutuser.component.html',
  styleUrls: ['./ajoutuser.component.css']
})
export class AjoutuserComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
    role: ['Client']
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authApi: AuthApi, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.authApi.register(this.form).subscribe({
      next: (data) => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        // Example of handling success message directly
        alert('User added successfully');
        this.router.navigate(['/utilisateurs/list']);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
        // Example of handling error message directly
        alert('Failed to add user: ' + error.error.message);
      },
    });
  }
}
