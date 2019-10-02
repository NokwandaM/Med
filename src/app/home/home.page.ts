import { Component } from '@angular/core';
import { RemmadService } from './../Service/remmad.service';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // user data
  userId;
  // Firebase data
  Appointments = [];

  constructor(
    public remmadService: RemmadService,
    public formGroup: FormBuilder,
    public router: Router,
    public alertController: AlertController,
    public toastController: ToastController
  ) {
    this.userId = this.remmadService.Return_User_ID();
    this.Appointments = this.remmadService.getAppointment();
  }

}
