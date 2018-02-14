import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'add-menu',
	templateUrl: 'add-menu.component.html'
})

export class AddMenuComponent implements OnInit {
	constructor(public activeModal: NgbActiveModal) { }

	ngOnInit() { }
}