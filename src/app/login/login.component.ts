import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; 
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router,
    private authenticateService: AuthService,
    private toastr: ToastrService,
  
  ) {  }
  ngOnInit(): void {
    this.authenticateService.logout();
    //this.loaderService.hideLoader();
  }
  onLogin(form: any) {
    if (form.valid) {
      // Handle the login logic here
      console.log('Username:', this.username);
      console.log('Password:', this.password);
      // Call your authentication service here
    } else {
      console.log('Form is invalid');
    }
  
    const authentication = {
      username: this.username,
      password: this.password,
    };

    this.authenticateService.authenticateUser(authentication).subscribe(
      (response) => {
        if (response && response.jwtToken) {
          this.authenticateService.generateUserClaims(response).subscribe(responce => {
            this.toastr.success('Authentication Success');
            sessionStorage.setItem('ApplicationUser', JSON.stringify(responce));
            const mockApiResponse = {
              token: response.jwtToken, 
              expirationDuration: 30 * 60 * 1000 
            };
        
            this.authenticateService.loginSuccess(mockApiResponse.token,mockApiResponse.expirationDuration);
            this.router.navigate(['/list']);
          });
        } else {
          this.errorMessage = response.statusMessage || 'Login failed. Please try again.';
          this.toastr.error(this.errorMessage);
          //this.loaderService.hideLoader();
        }
      },
      (error) => {
        this.toastr.error('An error occurred during login. Please try again.');
        this.errorMessage = 'An error occurred during login. Please try again.';
        //this.loaderService.hideLoader();
      }
    );
  }
}