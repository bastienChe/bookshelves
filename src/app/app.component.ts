import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(){
     // Initialize Firebase
    var config = {
      apiKey: "AIzaSyAAWCkmTdWDiuN8DoznV4OBVVNFRzGdF2g",
      authDomain: "bookshelves-f3a25.firebaseapp.com",
      databaseURL: "https://bookshelves-f3a25.firebaseio.com",
      projectId: "bookshelves-f3a25",
      storageBucket: "",
      messagingSenderId: "912286377185"
    };
    firebase.initializeApp(config);
  }
}
