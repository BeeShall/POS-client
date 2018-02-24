import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../../../dataModels/menu';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'view-details',
	templateUrl: 'view-details.component.html',
	styleUrls: ["view-details.component.css"]
})

export class ViewDetailsComponent implements OnInit {

	@Input()
	menu:Menu;

	constructor(public activeModal: NgbActiveModal) { }

	ngOnInit() { }
}