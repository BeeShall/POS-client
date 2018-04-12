import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Menu, MenuType, SizeList } from '../../../dataModels/menu';
import { MenuService } from '../../../services/menu.service'
import { NgForm } from '@angular/forms';
import { Nutrition, DailyValues } from '../../../dataModels/nutrition';
import { FileUploadService } from '../../../services/fileUpload.service';

/*

AddMenuComponent

DESCRIPTION: This is a component class for the modal for adding menu

AUTHOR: BISHAL REGMI

DATE: 2/28/2018

*/


@Component({
	selector: 'add-menu',
	templateUrl: 'add-menu.component.html',
	styleUrls: ['add-menu.component.css']
})

export class AddMenuComponent implements OnInit {

	//list of all the types of menu possible
	menuTypes = MenuType;

	//list of all the sizes available
	sizeList = SizeList;

	//list of all the daily values for the nutrition
	dailyValues = DailyValues;

	//list of all the menus passed from the menu component
	@Input()
	menus: Menu[];

	//to indicated if a new menu is being added
	@Input()
	newAdd: boolean;

	//if an old menu is being updated, the menu is passed here
	@Input()
	menu: Menu;

	//list of all the images for the menu
	images: any;

	constructor(public activeModal: NgbActiveModal,
		private menuService: MenuService,
		private fileUploadService: FileUploadService) { }

	ngOnInit() {
		if (this.newAdd) {
			//if a new menu is being added, initialize everything to empty
			this.menu = new Menu();
			this.images = []
		}
		else {
			this.images = this.menu.images
		}
	}

	//this method is used to add image to the list of images
	addImage(uploader) {
		let files = uploader.target.files;
		for (let i = 0; i < files.length; i++) {
			this.images.push(files[i])
		}
		console.log(files)
		console.log(this.images)
	}

	//this method is used to remove the images 
	removeImage(index) {
		//remove from firebase as well
		this.images.splice(index, 1)

	}

	//this method is used to commit the images to firebase and 
	//submit all the menu data to the databse
	submit() {
		console.log(this.menu);
		console.log(this.images)


		//uploading images to the firebase
		//and generating the URL for each image
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
		//if new menu is being added
		if (this.newAdd) {
			//add the menus and picture URLS to the databse
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
		//if a menu is being updated
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