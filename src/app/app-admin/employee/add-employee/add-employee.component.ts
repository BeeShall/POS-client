import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

import { Employee } from "../../../dataModels/employee";
import { EmployeeService } from "../../../services/employee.service"

@Component({
	selector: 'add-employee',
	templateUrl: 'add-employee.component.html'
})

export class AddEmployeeComponent implements OnInit {

	@Input()
	employees: Employee[];

	@Input()
	newAdd: boolean;

	@Input()
	employee: Employee;

	constructor(public activeModal: NgbActiveModal,
		private employeeService: EmployeeService) { }

	ngOnInit() {
		if (this.newAdd) {
			this.employee = new Employee();
		}
	}

	submit() {
		if (this.newAdd) {
			this.employeeService.addEmployee(this.employee)
				.subscribe(data => {
					if (data["success"]) {
						console.log("Employee added")
						this.employee.username = data["username"]
						this.employees.push(this.employee);
						this.activeModal.close('Close click');
					}
					else {
						console.log("Error adding employee!")
					}
				})
		}
		else{
			console.log(this.employee)
			this.employeeService.updateEmployee(this.employee)
				.subscribe(data => {
					if (data["success"]) {
						console.log("Employee updated");
						this.activeModal.close('Close click');
					}
					else {
						console.log("Error updating employee!")
					}
				})
		}

	}
}