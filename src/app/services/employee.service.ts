import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'https://localhost:7270/api/Employee/';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl+'GetEmployees'}`);
  
  }
 
  createOrUpdateEmployee(employee: Employee): Observable<Employee> {
    const url = `${this.baseUrl+'CreateOrUpdate'}`; // Endpoint for CreateOrUpdate
    return this.http.post<Employee>(url, employee); // Make POST request
  }

  deleteEmployee(employeeId: number): Observable<void> {
    const url = `${this.baseUrl}DeleteByEmployeeId?employeeId=${employeeId}`;
    return this.http.delete<void>(url).pipe(
      catchError(error => {
        console.error('Delete operation failed', error);
        return throwError(error);
      })
    );
  }
}
