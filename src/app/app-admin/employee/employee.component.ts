import { Component, OnInit } from '@angular/core';
import {Employee} from '../../dataModels/employee'

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import{AddEmployeeComponent} from './add-employee/add-employee.component';
import {EmployeeService } from '../../services/employee.service';

@Component({
	selector: 'employee',
	templateUrl: 'employee.component.html'
})

export class EmployeeComponent implements OnInit {
	employees: Employee[]
	constructor(private modalService: NgbModal,
	private employeeService:EmployeeService) { 
		this.employeeService.getAllEmployees()
			.subscribe(data=>{
				this.employees = data["employees"]
				console.log(data);
			})
	 }

	ngOnInit() { }

	openAddMenu() {
		const modalRef = this.modalService.open(AddEmployeeComponent);
		modalRef.componentInstance.employees = this.employees;
	  }
}