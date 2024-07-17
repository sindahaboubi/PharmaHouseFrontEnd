import { Component, OnInit } from '@angular/core';
import { AuthApi } from '../../../services/auth.api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listeusers',
  templateUrl: './listeusers.component.html',
  styleUrls: ['./listeusers.component.css'],
})
export class ListeusersComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  users: any[] = [];
  constructor(private authApi: AuthApi, private router: Router) {}

  ngOnInit(): void {
    this.authApi.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }

  onDelete(userId: number) {
    this.authApi.deleteUser(userId).subscribe(
      (response) => {
        // Assuming response is successful, fetch updated user list
        this.authApi.getAllUsers().subscribe((users) => {
          this.users = users; // Update the users array with the new list
          // Optionally show a success message
          // this.toastr.success('User deleted successfully');
        });
      },
      (err) => {
        // Handle error, optionally show an error message
        // this.toastr.error('Failed to delete user');
      }
    );
  }
  
  GetUserToUpdate(id: any) {
    this.router.navigate(['/dashboard/gestionutilisateurs/update'], { queryParams: { UserID: id } });
  }
}
