import { Component, OnInit } from '@angular/core';
import { Employee } from '../../dataModels/employee'

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeService } from '../../services/employee.service';

@Component({
	selector: 'employee',
	templateUrl: 'employee.component.html'
})

export class EmployeeComponent implements OnInit {
	employees: Employee[]
	constructor(private modalService: NgbModal,
		private employeeService: EmployeeService) {
		this.employeeService.getAllEmployees()
			.subscribe(data => {
				this.employees = data["employees"]
				console.log(data);
			})
	}

	ngOnInit() { }

	openAddMenu() {
		const modalRef = this.modalService.open(AddEmployeeComponent);
		modalRef.componentInstance.employees = this.employees;
		modalRef.componentInstance.newAdd = true;
	}

	edit(employee) {
		const modalRef = this.modalService.open(AddEmployeeComponent);
		modalRef.componentInstance.employee = employee;
		modalRef.componentInstance.newAdd = false;
	}

	delete(username, index) {
		this.employeeService.deleteEmployee(username).subscribe(data => {
			if (data["success"]) {
				console.log("Employee successfully deleted")
				this.employees.splice(index, 1);
			}
			else {
				console.log("Unable to delete the employee")
			}
		})
	}
}