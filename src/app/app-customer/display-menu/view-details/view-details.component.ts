import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../../../dataModels/menu';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DailyValues } from '../../../dataModels/nutrition';

@Component({
	selector: 'view-details',
	templateUrl: 'view-details.component.html',
	styleUrls: ["view-details.component.css"]
})

export class ViewDetailsComponent implements OnInit {

	dailyValues = DailyValues;

	currentRate = 5;

	@Input()
	menu:Menu;

	constructor(public activeModal: NgbActiveModal) { }

	ngOnInit() { }
}