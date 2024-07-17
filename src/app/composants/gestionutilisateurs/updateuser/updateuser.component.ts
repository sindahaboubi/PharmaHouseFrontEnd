import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthApi } from '../../../services/auth.api';

@Component({
  selector: 'app-update-user',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css'],
})
export class UpdateuserComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
    role: [''],
  };
  userId!: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authApi: AuthApi
  ) {
    this.userId = this.route.snapshot.queryParamMap.get('UserID') || 0;
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.authApi.getUser(this.userId).subscribe({
      next: (res) => {
        console.log(res);
        this.form.username = res.username;
        this.form.email = res.email;
        this.form.role[0] = res.roles[0].name;
      },
      error: (err) => {
        console.log(err);
      },
    });
    // this.authApi.getAllUsers().subscribe(
    //   (userData) => {
    //     this.form.username = userData.username;
    //     this.form.email = userData.email;
    //     this.form.role = userData.roles[0];
    //   },
    //   (error) => {
    //     console.error('Error loading user data:', error);
    //   }
    // );
  }

  onSubmit(): void {
    if (
      !this.form.password ||
      !this.form.role ||
      !this.form.username ||
      !this.form.email
    ) {
      console.log('None of the fields must be empty');
    } else {
      this.authApi.updateUser(this.userId, this.form).subscribe({
        next: (res) => {
          console.log('User updated successfully:', res);
          this.router.navigate(['utilisateurs/list']);
        },
        error: (err) => {
          console.error('Error updating user:', err);
        },
      });
    }

    // this.authApi.updateUser(this.userId, updatedUser).subscribe(
    //   (response) => {
    //     console.log('User updated successfully:', response);
    //     // Redirect to user list or show success message
    //     this.router.navigate(['/dashboard']);
    //   },
    //   (error) => {
    //     console.error('Error updating user:', error);
    //     // Handle error (e.g., show error message to user)
    //   }
    // );
  }
}
