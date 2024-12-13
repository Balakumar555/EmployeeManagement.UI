import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators"; 
import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root',
})
export class AuthService {
    
    private isLoggedInSubject: BehaviorSubject<boolean>;
    isLoggedIn$: Observable<boolean>;

  private apiUrl = 'https://localhost:7270/api/Account/'; 

  constructor(private http: HttpClient) {
    this.isLoggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
    this.isLoggedIn$ = this.isLoggedInSubject.asObservable();
  }
// createOrUpdateEmployee(employee: Employee): Observable<Employee> {
//     const url = `${this.baseUrl+'CreateOrUpdate'}`; // Endpoint for CreateOrUpdate
//     return this.http.post<Employee>(url, employee); // Make POST request
//   }
  authenticateUser (authrnticate: any): Observable<any> {
    const url=`${this.apiUrl+'AuthenticateUserAsync'}`;
    return this.http.post<any>(url, authrnticate);
  }

  generateUserClaims(authResponse: any): Observable<any> {
    const url=`${this.apiUrl+'GenerateUserClaimsAsync'}`;
   // return this.http.post<any>(`${this.apiUrl+'GenerateUserClaimsAsync'}`,{authResponse});
    return this.http.post<any>(url, authResponse);
  }
  
  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('AccessToken');
    if (!token) return false;

    const expiration = sessionStorage.getItem('tokenExpiration'); 
    if (expiration && new Date().getTime() > +expiration) {
      this.logout();
      return false;
    }
    return true;
  }

  loginSuccess(token: string, expirationDuration: number) {
    sessionStorage.setItem('AccessToken', token);
    const expirationTime = new Date().getTime() + expirationDuration;
    sessionStorage.setItem('tokenExpiration', expirationTime.toString());
    this.isLoggedInSubject.next(true);
  }

  logout() {
    sessionStorage.removeItem('AccessToken');
    sessionStorage.removeItem('tokenExpiration');
    if (this.isLoggedInSubject) { 
      this.isLoggedInSubject.next(false);
    }
  }
  



 
}