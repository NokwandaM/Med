import { Component, OnInit } from '@angular/core';
import { RemmadService } from './../Service/remmad.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

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

     // pulling data for kinnz
    this.kinnz = this.remmadService.getKin();
    console.log(this.kinnz);
    this.clearArray(this.kinnz);

    ///// getting user Auth
    firebase.auth().onAuthStateChanged((user) => {
     if (user) {
         // User is signed in.
         this.ID = user.uid;
         console.log(this.ID);
      } else {
     //No user is signed in.
        this.router.navigate(['/login']);
       }
   });
   }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    const loader = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'loading user Information...'
    });
    await loader.present();
    this.remmadService.getUserInformation().then( getUserInformation => {
      this.used = getUserInformation;
      loader.dismiss();
    });
  }

  clearArray(array) {
    for (let i = 0; i < array.length; i++) {
      array.splice(i);
  }
  }

}
