import * as firebase from 'firebase/app';
import 'firebase/storage';

import { Injectable } from "@angular/core";

@Injectable()
export class FileUploadService {

	private config = {
		apiKey: "AIzaSyA4Wsc8xn7euyS1Fn45fbdFd82ZRf37zlk",
		authDomain: "seniorproject-45c7b.firebaseapp.com",
		databaseURL: "https://seniorproject-45c7b.firebaseio.com",
		projectId: "seniorproject-45c7b",
		storageBucket: "seniorproject-45c7b.appspot.com",
		messagingSenderId: "940441894733"
	  };

	constructor() {
		firebase.initializeApp(this.config);
	}

	private basePath: string = '/uploads';

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