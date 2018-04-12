import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

import { Employee } from "../../../dataModels/employee";
import { EmployeeService } from "../../../services/employee.service"

/*

AddEmployeeComponent

DESCRIPTION: This is a component class for modal for adding and upadting employees

AUTHOR: BISHAL REGMI

DATE: 2/28/2018

*/

@Component({
	selector: 'add-employee',
	templateUrl: 'add-employee.component.html'
})

export class AddEmployeeComponent implements OnInit {

	//list to store all the employees, passed by reference from the employee component
	@Input()
	employees: Employee[];

	//to indicate if the modal is in add mode or edit mode
	@Input()
	newAdd: boolean;

	//if edit mode, the specific employee to edit
	@Input()
	employee: Employee;

	constructor(public activeModal: NgbActiveModal,
		private employeeService: EmployeeService) { }

	ngOnInit() {
		if (this.newAdd) {
			//initialize the employee if opened in add mode
			this.employee = new Employee();
		}
	}

	//this method is used to add or edit the employee in the database respectively
	submit() {
		if (this.newAdd) {
			this.employeeService.addEmployee(this.employee)
				.subscribe(data => {
					if (data["success"]) {
						console.log("Employee added")
						//in the case of new add, the server returns the generated username
						//so this usename is added to the existing data
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