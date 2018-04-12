import * as firebase from 'firebase/app';
import 'firebase/storage';

import { Injectable } from "@angular/core";

/*

FileUploadService

DESCRIPTION: This is a service class for uploading the pictures to the firebasae database

	This method uses Google Firebase to store the pictures

AUTHOR: BISHAL REGMI

DATE: 3/28/2018

*/

@Injectable()
export class FileUploadService {

	//config for the Google Firebase
	//Please refer to FIREBASE API for detailed information about the configs
	private config = {
		apiKey: "AIzaSyA4Wsc8xn7euyS1Fn45fbdFd82ZRf37zlk",
		authDomain: "seniorproject-45c7b.firebaseapp.com",
		databaseURL: "https://seniorproject-45c7b.firebaseio.com",
		projectId: "seniorproject-45c7b",
		storageBucket: "seniorproject-45c7b.appspot.com",
		messagingSenderId: "940441894733"
	  };

	constructor() {
		//initialzing firebase with the configs
		firebase.initializeApp(this.config);
	}

	//storage directory in the firebase database to store the pictures to
	private basePath: string = '/uploads';

	//This method is used to upload a document to the firebase directory
	//PARAMETERS: upload: the file to be upoloaded of type FILE
	pushUpload(upload) {
		let storageRef = firebase.storage().ref();
		let uploadTask = storageRef.child(`${upload.name}`).put(upload);

		uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
			(snapshot) => {
				// upload in progress
				upload.progress = (snapshot['bytesTransferred'] / snapshot['totalBytes']) * 100
			},
			(error) => {
				// upload failed
				console.log(error)
				return null;
			},
			() => {
				// upload success
				console.log(uploadTask.snapshot.downloadURL)
				return {
					"url" : uploadTask.snapshot.downloadURL,
					"name": upload.name
				}
			}
		);
	}
}