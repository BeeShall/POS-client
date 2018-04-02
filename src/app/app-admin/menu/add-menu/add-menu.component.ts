import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Menu, MenuType, SizeList } from '../../../dataModels/menu';
import { MenuService } from '../../../services/menu.service'
import { NgForm } from '@angular/forms';
import { Nutrition, DailyValues } from '../../../dataModels/nutrition';
import { FileUploadService } from '../../../services/fileUpload.service';



@Component({
	selector: 'add-menu',
	templateUrl: 'add-menu.component.html',
	styleUrls: ['add-menu.component.css']
})

export class AddMenuComponent implements OnInit {

	menuTypes = MenuType;
	sizeList = SizeList;
	dailyValues = DailyValues;

	@Input()
	menus: Menu[];

	@Input()
	newAdd: boolean;

	@Input()
	menu: Menu;

	images: any;

	constructor(public activeModal: NgbActiveModal,
		private menuService: MenuService,
		private fileUploadService: FileUploadService) { }

	ngOnInit() {
		if (this.newAdd) {
			this.menu = new Menu();
			this.images = []
		}
		else {
			this.images = this.menu.images
		}
	}

	addImage(uploader) {
		let files = uploader.target.files;
		for (let i = 0; i < files.length; i++) {
			this.images.push(files[i])
		}
		console.log(files)
		console.log(this.images)
	}

	removeImage(index) {
		//remove from firebase as well
		this.images.splice(index, 1)

	}

	submit() {
		console.log(this.menu);
		console.log(this.images)


		for (let i = 0; i < this.images.length; i++) {
			this.fileUploadService.pushUpload(this.images[i])
			let data = {
				"name": this.images[i].name,
				"url": "https://firebasestorage.googleapis.com/v0/b/seniorproject-45c7b.appspot.com/o/" + this.images[i].name + "?alt=media"
			}
			console.log(data)
			if (data != null) {
				this.menu.images.push(data)
			}
		}

		//add pictures

		if (this.newAdd) {
			this.menuService.addMenu(this.menu)
				.subscribe(data => {
					if (data["success"]) {
						console.log("Menu added");
						this.menu.menuId = data["id"];
						this.menus.push(this.menu);

						this.activeModal.close('Close click');
					}
					else {
						console.log("Error adding menu!")
					}
				})
		}
		else {
			this.menuService.updateMenu(this.menu)
				.subscribe(data => {
					if (data["success"]) {
						console.log("Menu updated");

						this.activeModal.close('Close click');
					}
					else {
						console.log("Error updating menu!")
					}
				})
		}
	}
}