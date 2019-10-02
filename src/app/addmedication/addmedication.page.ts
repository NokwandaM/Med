import { Component, OnInit } from '@angular/core';
import { RemmadService } from '../Service/remmad.service';

@Component({
  selector: 'app-addmedication',
  templateUrl: './addmedication.page.html',
  styleUrls: ['./addmedication.page.scss'],
})
export class AddmedicationPage implements OnInit {

  d: Date = new Date();
  medicineName;
  medicineType;
  TakeTime;
  Days;
  Period;
  UID;
  newPostKey;
  Pills;

  constructor(
    public reminderService: RemmadService
  ) {
    this.UID = this.reminderService.Return_User_ID();
    this.newPostKey = this.reminderService.generateKey();

    this.reminderService.GetDrugs().subscribe(data => {
      this.Pills = data;
      console.log(this.Pills);
    });
   }

  ngOnInit() {
    console.log(this.d);
  }

  intakeTime(event) {
    this.TakeTime = event.detail.value;
  }

  setDays(event) {
    this.Days = event.detail.value;
  }

  setTime(event) {
    this.Period = event.detail.value;
  }

  AddReminder() {
    this.reminderService.MakeReminder(this.medicineName, this.medicineType,
     this.TakeTime, this.Days, this.Period, this.UID, this.newPostKey);
  }

}
