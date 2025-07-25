import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from '../../employee';
import { EmployeeService } from '../../services/employee';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update.html',
  styleUrls: ['./update.css']
})
export class UpdateComponent implements OnInit {
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
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadEmployee(id);
  }

  loadEmployee(id: number): void {
    this.employeeService.getEmployeeById(id)
      .subscribe(data => {
        this.employee = data;
      });
  }

  onSubmit(): void {
    this.employeeService.updateEmployee(this.employee.employeeID, this.employee)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}
