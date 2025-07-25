import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../../employee';
import { EmployeeService } from '../../services/employee';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create.html',
  styleUrls: ['./create.css']
})
export class CreateComponent {
  employee: Employee = {
    employeeID: 0,
    firstname: '',
    lastname: '',
    age: 0,
    number: '',
    email: '',
    address: ''
  };

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.employeeService.addEmployee(this.employee)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}
