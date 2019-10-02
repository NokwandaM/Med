import { Component, OnInit } from '@angular/core';
import { RemmadService } from './../Service/remmad.service';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit {

  // getting data into appointment table
  Appointname;
  Appointsurname;
  Appointinstitution;
  Appointdate;
  Appointtime;
  AppointReason;

  // user data
  userId;

  // Firebase data
  Appointments = [];
  newPostKey;

  constructor(
    public remmadService: RemmadService,
    public formGroup: FormBuilder,
    public router: Router,
    public alertController: AlertController,
    public toastController: ToastController
  ) {
    this.userId = this.remmadService.Return_User_ID();
    this.newPostKey = this.remmadService.generateKey();
    // this.Appointments = this.remmadService.getAppointment();
    // console.log(this.Appointments);
   }

  ngOnInit() {
  }

  submitFirebaseAppointment() {
    this.remmadService.submitAppointment(this.Appointname, this.Appointsurname,
      this.Appointinstitution, this.Appointdate, this.Appointtime, this.AppointReason, this.userId, this.newPostKey);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'New Appointment Created.',
      duration: 9000,
      color: 'primary',
      position: 'bottom'
    });
    toast.present();
  }

  edit() {

  }

  cancel() {

  }

}
