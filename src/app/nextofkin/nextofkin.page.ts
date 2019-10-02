import { Component, OnInit } from '@angular/core';
import { RemmadService } from './../Service/remmad.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-nextofkin',
  templateUrl: './nextofkin.page.html',
  styleUrls: ['./nextofkin.page.scss'],
})
export class NextofkinPage implements OnInit {

  ID;
  userId;
  name;
  email;
  photoUrl;
  uid;

  users;
  used: any;
  kinnz = [];

  constructor(
    public remmadService: RemmadService,
    public loadingController: LoadingController,
    private router: Router
  ) {
    this.userId = this.remmadService.UserInfor();
    this.kinnz = this.remmadService.getKin();
    console.log(this.kinnz);
     // pulling data for kinnz
    this.kinnz = this.remmadService.getKin();
    console.log(this.kinnz);
    this.clearArray(this.kinnz);
    // getting user Auth
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.ID = user.uid;
        // console.log(this.ID);
      } else {
        // No user is signed in.
        this.router.navigate(['/login']);
      }
    });
   }

  ngOnInit() {
  }

  clearArray(array) {
    for (let i = 0; i < array.length; i++) {
      array.splice(i);
  }
  }

}
