import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { AppWaitressComponent } from './app-waitress.component'
import { AddOrderComponent } from './add-order/add-order.component';
import { CloseOrderComponent } from './add-order/close-order/close-order.component';
import { MainPipeModule } from '../pipes/main-pipe.module';
@NgModule({
	imports: [FormsModule, CommonModule, NgbModule, ReactiveFormsModule, RouterModule, MainPipeModule],
	exports: [],
	declarations: [AppWaitressComponent, AddOrderComponent, CloseOrderComponent],
	entryComponents: [AddOrderComponent, CloseOrderComponent],
	providers: [],
})
export class AppWaitressModule { }
