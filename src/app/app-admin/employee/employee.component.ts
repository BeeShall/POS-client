import { Component, OnInit } from '@angular/core';
import { Employee } from '../../dataModels/employee'

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeService } from '../../services/employee.service';

/*

EmployeeComponent

DESCRIPTION: This is a component class for the employee page in the admin section

AUTHOR: BISHAL REGMI

DATE: 2/28/2018

*/

@Component({
	selector: 'employee',
	templateUrl: 'employee.component.html'
})

export class EmployeeComponent implements OnInit {

	//list of all the employees
	employees: Employee[]

	//string to be used while searching the list
	public searchString: string;
	
	constructor(private modalService: NgbModal,

		//fetching all the employees from the databse
		private employeeService: EmployeeService) {
		this.employeeService.getAllEmployees()
			.subscribe(data => {
				this.employees = data["employees"]
				console.log(data);
			})
	}

	ngOnInit() { }

	//this method opens the add employee modal
	openAddMenu() {
		const modalRef = this.modalService.open(AddEmployeeComponent);
		modalRef.componentInstance.employees = this.employees;

		//to indicate if the modal should be opened in add mode
		modalRef.componentInstance.newAdd = true;
	}

	//this method opens the add employee modal in edit mode
	edit(employee) {
		const modalRef = this.modalService.open(AddEmployeeComponent);
		modalRef.componentInstance.employee = employee;

		//to indicate if the modal should be opened in edit mode
		modalRef.componentInstance.newAdd = false;
	}

	//this method deletes the employee from the database
	//PARAMETERS:
		//username: username of the employee to delete
		//index: index of the employee in the local array to delete locally
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