import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../../employee';
import { EmployeeService } from '../../services/employee';
import { RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-read',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './read.html',
  styleUrls: ['./read.css']
})
export class ReadComponent implements OnInit {
  employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe(data => {
        this.employees = data;
      });
  }

  deleteEmployee(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Are you sure you want to delete this employee?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.deleteEmployee(id).subscribe({
          next: () => {
            this.snackBar.open('Employee deleted successfully!', 'Close', {
              duration: 3000
            });
            this.loadEmployees();
          },
          error: (error) => {
            console.error('Error deleting employee:', error);
            this.snackBar.open('Error deleting employee. Please try again.', 'Close', {
              duration: 3000
            });
          }
        });
      }
    });
  }
}
