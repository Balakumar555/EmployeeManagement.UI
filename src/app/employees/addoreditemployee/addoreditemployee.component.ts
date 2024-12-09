import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core'; 
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-addoreditemployee',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule 
  ],
  templateUrl: './addoreditemployee.component.html',
  styleUrls: ['./addoreditemployee.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddoreditemployeeComponent {
 
  employeeForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private employeeService: EmployeeService,
    private router: Router,
    private toaster: ToastrService
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      designation: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // Example pattern for phone number
      email: ['', [Validators.required, Validators.email]], // Email validation
      doj: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]], // Ensure salary is a positive number
      gender: [null, Validators.required], // Initialize gender as null and required
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const formValue = this.employeeForm.value;

      // Create the new employee object
      const newEmployee: Employee = {
        name: formValue.name,
        designation: formValue.designation,
        phoneNumber: formValue.phoneNumber,
        email: formValue.email,
        doj: formValue.doj,
        salary: formValue.salary,
        gender: formValue.gender === true,
        id: 0,
        createdBy: undefined,
        createdOn: undefined,
        modifiedBy: undefined,
        modifiedOn: undefined,
        IsActive: false
      };

      console.log('Form Data:', newEmployee); // Log the new employee data

      // Send the newEmployee object directly
      this.employeeService.createOrUpdateEmployee(newEmployee).subscribe(
        response => {
          console.log('Employee added successfully', response); 
          this.toaster.success('New Employee added successfully!', 'Success', { timeOut: 5000 });       
          this.employeeForm.reset(); // Reset the form
          this.router.navigate(['/list']);        
        }, 
        error => {
          console.error('Error adding employee', error);
          this.toaster.error('Error adding employee. Please try again.', 'Error');
        }
      );
    } else {
      this.toaster.error('Please fill in all required fields correctly.', 'Validation Error');
    }
  }
}