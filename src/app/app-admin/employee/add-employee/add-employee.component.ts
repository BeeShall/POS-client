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

	constructor(public activeModal: NgbActiveModal,
		private employeeService: EmployeeService) { }

	ngOnInit() { }

	submit(addEmployeeForm: NgForm) {
		let employee: Employee = addEmployeeForm.value;
		this.employeeService.addEmployee(addEmployeeForm.value)
			.subscribe(data => {
				if (data["success"]) {
					console.log("Employee added")
					employee.username = data["username"]
					this.employees.push(employee);
				}
				else {
					console.log("Error adding employee!")
				}
			})
		this.activeModal.close('Close click');
	}
}