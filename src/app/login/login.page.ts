import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RemmadService } from '../Service/remmad.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email;
  password;

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(
    public remmadService: RemmadService,
    public Alert: AlertController,
    public loadingCtrl: LoadingController,
    public toastController: ToastController,
    private router: Router,
  ) { }

  ngOnInit() {
   
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
}

login() {
  this.remmadService.login(this.email, this.password).then(data => {
    if (data.operationType === "signIn") {
      this.router.navigate(['/home']);
      this.presentToast();
    } else {
      this.presentAlert(data);
    }
  });
}

async presentAlert(data) {
  const alert = await this.Alert.create({
    header: 'Alert',
    message: data,
    buttons: ['OK'],
  });

  await alert.present();
}

async presentToast() {
  const toast = await this.toastController.create({
    message: 'Welcome Back.',
    duration: 100,
    color: 'primary',
    position: 'bottom'
  });
  toast.present();
}

async resetepassword() {
  let alert = await this.Alert.create({
    header: 'Reset Password!',
    inputs: [{
      name: 'Email',
      type: 'email',
      placeholder: 'Please enter Your New Email'
    }],
    buttons: [{
      text: 'cancel',
      handler: () => {
      }
    }, {
      text: 'send',
      handler: (email) => {
        this.remmadService.resetepassword(email);
      }
    }]
  });
  await alert.present();
}

}
