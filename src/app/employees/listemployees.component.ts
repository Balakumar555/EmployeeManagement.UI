import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

declare const bootstrap: any; // Declare Bootstrap to avoid TypeScript errors

@Component({
  selector: 'app-listemployees',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule, NgxPaginationModule],
  templateUrl: './listemployees.component.html',
  styleUrls: ['./listemployees.component.css'],
})
export class ListemployeesComponent implements OnInit {
  employees: Employee[] = [];
  updateEmployeeForm: FormGroup;
  selectedEmployee: Employee | null = null;
  filteredEmployees = [...this.employees];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5; 
  totalEmployeesCount: number = 0;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {
    // Initialize the update employee form
    this.updateEmployeeForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      designation: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      doj: ['', Validators.required],
      salary: ['', Validators.required],
      gender: ['', Validators.required],
      
    });
  }


  // Method to filter employees based on search term
  filterEmployees() {
    this.filteredEmployees = this.employees.filter(employee =>
      employee.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      employee.designation.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.currentPage = 1;
    this.cdr.detectChanges(); // Reset to first page on search
  }
  sortEmployees(property: keyof Employee) {
    this.filteredEmployees.sort((a, b) => {
      if (a[property] < b[property]) return -1;
      if (a[property] > b[property]) return 1;
      return 0;
    });
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  // Load all employees
  loadEmployees() {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        this.employees = data;
        this.filteredEmployees = [...this.employees]; 
        this.totalEmployeesCount = this.employees.length;
        console.log(this.employees);
      },
      (error) => {
        console.error('Error loading employees:', error);
        this.toastr.error('Failed to load employees.', 'Error');
      }
    );
  }

  // Navigate to the Add Employee page
  navigateToAddEmployee() {
    this.router.navigate(['/addeditemployee']);
  }

  // Open the update modal with employee data
  openUpdateModal(employee: Employee) {
    this.selectedEmployee = employee; // Store the selected employee
    this.updateEmployeeForm.patchValue(employee); // Populate form with selected employee's details
    const modalElement = document.getElementById('updateEmployeeModal');
    const modal = new bootstrap.Modal(modalElement!);
    modal.show();
  }

  // Save the updated employee
  saveUpdatedEmployee() {
    if (this.updateEmployeeForm.valid) {
      const updatedEmployee: Employee = this.updateEmployeeForm.value;
      this.employeeService.createOrUpdateEmployee(updatedEmployee).subscribe(
        () => {
          this.toastr.success('Employee updated successfully!', 'Success');
          this.loadEmployees(); // Refresh the employee list
          this.closeModal(); // Close the modal
        },
        (error) => {
          console.error('Error updating employee:', error);
          this.toastr.error('Failed to update employee.', 'Error');
        }
      );
    }
  }

  // Delete an employee
  deleteEmployee(employeeId: number) {
    console.log('Delete button clicked for Employee ID:', employeeId);
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(employeeId).subscribe(
        () => {
          this.toastr.success('Employee deleted successfully!', 'Success', {
            timeOut: 5000,
          });
          this.loadEmployees(); // Reload employees after deletion
        },
        (error) => {
          console.error('Error deleting employee:', error);
          this.toastr.error('Error while deleting employee.', 'Failure', {
            timeOut: 5000,
          });
        }
      );
    }
  }

  // Close the modal
  closeModal() {
    const modalElement = document.getElementById('updateEmployeeModal');
    const modal = bootstrap.Modal.getInstance(modalElement!);
    modal.hide();
  }
}