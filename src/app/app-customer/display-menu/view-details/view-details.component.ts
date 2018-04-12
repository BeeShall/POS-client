import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../../../dataModels/menu';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DailyValues } from '../../../dataModels/nutrition';

/*

ViewDetailsComponent

DESCRIPTION: This is a component class for the modal to display the details of a menu

AUTHOR: BISHAL REGMI

DATE: 2/28/2018

*/

@Component({
	selector: 'view-details',
	templateUrl: 'view-details.component.html',
	styleUrls: ["view-details.component.css"],
})

export class ViewDetailsComponent implements OnInit {

	//daily values for nutritions
	dailyValues = DailyValues;

	//menu to view the details for
	//passed by reference from the display-menu component
	@Input()
	menu:Menu;

	constructor(public activeModal: NgbActiveModal) { }

	ngOnInit() { }
}