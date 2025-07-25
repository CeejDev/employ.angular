import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Employee } from '../../employee';
import { EmployeeService } from '../../services/employee';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatInputModule, 
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './create.html',
  styleUrls: ['./create.css']
})
export class CreateComponent {
  employee: Employee = {
    employeeID: 0,
    firstname: '',
    lastname: '',
    age: 0,
    number: undefined,  // Change this to undefined instead of empty string
    email: '',
    address: ''
  };

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  validateForm(): boolean {
    // Check required fields
    if (!this.employee.firstname || !this.employee.lastname || 
        !this.employee.email || !this.employee.address) {
      this.snackBar.open('Please complete all required fields before submitting.', 'Close', {
        duration: 3000
      });
      return false;
    }

    // Validate age
    if (this.employee.age < 18 || this.employee.age > 99) {
      this.snackBar.open('Age must be between 18 and 99.', 'Close', {
        duration: 3000
      });
      return false;
    }

    // Validate phone number only if it has a value
    if (this.employee.number !== undefined && this.employee.number !== '' && !/^\d{11}$/.test(this.employee.number)) {
      this.snackBar.open('Phone number must be exactly 11 digits.', 'Close', {
        duration: 3000
      });
      return false;
    }

    // Handle empty or whitespace-only phone number
    if (this.employee.number !== undefined && this.employee.number.trim() === '') {
      this.employee.number = undefined;
    }

    return true;
  }

  async onSubmit(): Promise<void> {
    if (!this.validateForm()) {
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Are you sure you want to add this employee?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Create a copy of the employee object and remove undefined values
        const employeeToSubmit = { ...this.employee };
        if (employeeToSubmit.number === undefined) {
          delete employeeToSubmit.number;
        }

        this.employeeService.addEmployee(employeeToSubmit).subscribe({
          next: () => {
            this.snackBar.open('Employee added successfully!', 'Close', {
              duration: 3000
            });
            this.router.navigate(['/']);
          },
          error: (error) => {
            console.error('Error adding employee:', error);
            this.snackBar.open('Error adding employee. Please try again.', 'Close', {
              duration: 3000
            });
          }
        });
      }
    });
  }

  onCancel(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Are you sure you want to cancel? Any unsaved changes will be lost.' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/']);
      }
    });
  }
}
