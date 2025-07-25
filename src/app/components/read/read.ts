import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../../employee';
import { EmployeeService } from '../../services/employee';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-read',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './read.html',
  styleUrls: ['./read.css']
})
export class ReadComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) {}

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
    if(confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id)
        .subscribe(() => {
          this.loadEmployees();
        });
    }
  }
}
