import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { RemmadService } from '../Service/remmad.service';

@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.page.html',
  styleUrls: ['./patient-registration.page.scss'],
})
export class PatientRegistrationPage implements OnInit {

   /////// Nathi
   uid;
   name;
   surname;
   age;
   gender;
   contact_number;
   location;
   email_address;
   password;

   /////// Arron
   RegisterForm: FormGroup;
   // password;
   confirm_password;
   ErrorMessage;
   // gender;

  constructor(
    public remmadService: RemmadService,
    public formGroup: FormBuilder,
    public router: Router,
    public alertController: AlertController,
    public toastController: ToastController
  ) {
    this.RegisterForm = formGroup.group({
      name : ['', [Validators.required, Validators.pattern('[a-zA-Z]+$')]],
      surname : ['', [Validators.required, Validators.pattern('[a-zA-Z]+$')]],
      age : ['', [Validators.required, Validators.maxLength(3), Validators.max(110), Validators.pattern('[0-9]+$')]],
      contact_number : ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      location : ['', [Validators.required, Validators.pattern('[a-zA-Z]+$')]],
      email_address : ['', [Validators.required, Validators.pattern('[a-zA-Z0-9.]+@[a-zA-Z-.]+\.[a-zA-Z]+$')]],
      password : ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      confirm_password : ['', [Validators.required]]
    });
   }

  ngOnInit() {
  }

  signup() {
    if (this.confirm_password !== this.password) {
      this.ErrorMessage = 'The passwords you entered do not match.';
      this.presentAlert(this.ErrorMessage);
    } else {
      this.remmadService.signup(
        this.email_address,
        this.password,
        this.name,
        this.surname,
        this.age,
        this.gender,
        this.location,
        this.contact_number
        ).then(data => {
          if (data.operationType === 'signIn') {
            this.router.navigate(['/next-of-kin']);
            this.presentToast();
          } else {
            this.presentAlert(data);
          }
        });
    }
  }

  getGender(event) {
    this.gender = event.detail.value;
  }

    async presentAlert(data) {
      const alert = await this.alertController.create({
        header: 'Alert',
        message: data,
        buttons: ['OK']
      });

      await alert.present();
    }

    async presentToast() {
      const toast = await this.toastController.create({
        message: 'New Account Created.',
        duration: 9000,
        color: 'primary',
        position: 'bottom'
      });
      toast.present();
    }

}
