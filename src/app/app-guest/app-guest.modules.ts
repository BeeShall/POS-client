import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppGuestComponent } from './app-guest.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { RouterModule } from '@angular/router';


@NgModule({
	imports: [FormsModule, CommonModule, NgbModule, ReactiveFormsModule, RouterModule],
	exports: [],
	declarations: [AppGuestComponent],
	entryComponents : [ ],
	providers: [],
})
export class AppGuestModule { }
