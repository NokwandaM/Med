import { Component, OnInit, KeyValueDiffers } from '@angular/core';
import { RemmadService } from './../Service/remmad.service';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import * as firebase from 'firebase';

import { SMS } from '@ionic-native/sms/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-next-of-kin',
  templateUrl: './next-of-kin.page.html',
  styleUrls: ['./next-of-kin.page.scss'],
})
export class NextOfKinPage implements OnInit {

  // getting data into appointment table
  Name;
  Surname;
  Age;
  Contact;
  Relationship;
  next_of_keenForm:FormGroup

  // user data
  userId;
  patientName
  patientSurname

  // pulling Data from kin table
  Kin;
  User;

  // SMS Data
  smsText;
  KinNumber;
  KinMSG;


  constructor(
    public sms:SMS,
    public androidPermissions:AndroidPermissions,
    public remmadService: RemmadService,
    public formGroup: FormBuilder,
    public router: Router,
    public alertController: AlertController,
    public toastController: ToastController
  ) {
    this.next_of_keenForm = formGroup.group({
      Name : ["",[Validators.required,Validators.pattern("[a-zA-Z]+$")]],
      Surname : ["",[Validators.required,Validators.pattern("[a-zA-Z]+$")]],
      Age : ["",[Validators.required,Validators.max(110),
        Validators.maxLength(3),Validators.pattern("[0-9]+$")]],
      Contact : ["",[Validators.required,Validators.maxLength(10)]],
      Relationship : ["",[Validators.required,Validators.pattern("[a-zA-Z]+$")]]
    })
    this.userId = this.remmadService.Return_User_ID();
   
   }

  ngOnInit() {
    this.remmadService.getUserInformation().then(user =>{
      this.User = user
      this.patientName = user[0].name
      this.patientSurname = user[0].surname
      console.log(this.User);
      console.log(this.User[0].name)
    })
  }

  sendKinConfirmSMS() {

      this.KinMSG = 'Dear ' + this.Name + " " + this.Surname + ' this Message is Sent to you to confirm that' + this.patientName + " "+
      this.patientSurname + ' has added you as their Next-of-Kin on MedRem Application which remind the User to take their Medication';
      console.log(this.KinMSG);

      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(
        result => console.log('Has permission?', result.hasPermission),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS)
      );
  
      this.androidPermissions.requestPermissions([
        this.androidPermissions.PERMISSION.SEND_SMS,
        this.androidPermissions.PERMISSION.GET_ACCOUNTS
      ]);

      this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(() => {
        var options = {
          replaceLineBreaks: false, // true to replace \n by a new line, false by default
          android: {
              intent: '' // send SMS without opening any other app
          }
      };
        this.sms.send( this.Contact , this.KinMSG, options).then(data => {
        console.log('Msg Data Ok');
        // this.smsText = "Sms sent to the; user!"
        this.submitFirebaseKin()
        this.presentToast()

        console.log(data);
      }).catch(error => {
        console.log(error);
      });
    }).catch((err) => {
        alert(JSON.stringify(err));
        console.log(err);
    });
  }

  submitFirebaseKin() {
    this.remmadService.submitNextOfKin(this.Name, this.Surname,this.Age,
      this.Contact, this.Relationship,this.userId);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Kin added to My Data.',
      duration: 9000,
      color: 'primary',
      position: 'bottom'
    });
    toast.present();
  }

}
