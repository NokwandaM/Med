import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RemmadService {

  database = firebase.database().ref();

  // getting data for auth
  userId;
  username;
  userUID;
  email;

  // getting data from users table
 userzArray = [];
 userNamez;
 userSurname;
 userAge;
 userGender;
 userContact;
 userEmail;
 userPaswword;
 userUIDUID;

 // data from appointment database
 appoint = [];
 Appointzname;
 Appointzsurname;
 Appointzinstitution;
 Appointzdate;
 Appointztime;
 AppointzReason;

 // data from Kin database
 Kin = [];
 kinname;
 kinsurname;
 kinAge;
 kinContact;
 kinRelationship;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // log in, sign up and register code
  login(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password).then((results) => {
      if (results) {
        this.userUID = results['user'].uid;
      }
      return results;
    }).catch((error) => {
      var errorCode = error.code;
      var errorCode = error.message;
      return errorCode;
    });
  }

  signup(email, password, name, surname, age, gender, location, contact) {
    return firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
      if (user) {
        this.userId = user['user'].uid;
        this.userUID = user['user'].uid;
        this.email = user['user'].email;

      // inserting into database
        firebase.database().ref('users/' + this.userId).set({
        username: name,
        surnamez: surname,
        agez: age,
        genderz: gender,
        locationz: location,
        contactz: contact,
        emails: email,
        }, (error) => {
          if (error) {
          } else {
          }
        });
      }
      return user;
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return errorMessage;
      // ...resetepassword
    });
  }

  logout() {
    firebase.auth().signOut().then(() => {
      console.log('Sign-out successful.');

      // Sign-out successful.
    }).catch((error) => {
      console.log('An error happened.');
      // An error happened.
    });
  }

  resetepassword(email) {
    const auth = firebase.auth();

    auth.sendPasswordResetEmail(email.Email).then(() => {
    // Email sent.
    }).catch((error) => {
      // An error happened.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }

  getUserInformation() {
    return new Promise ((resolve) => {
      this.clearArray(this.userzArray);
      const rootRef = firebase.database().ref('users/' + this.userUID);
      rootRef.on('value', (data) => {
      const userzz = data.val();
      this.userNamez = userzz.username;
      this.userSurname = userzz.surnamez;
      this.userAge = userzz.agez;
      this.userGender = userzz.genderz;
      this.userContact = userzz.contactz;
      this.userEmail = userzz.emails;
      this.userzArray.push({
        name: this.userNamez,
        surname: this.userSurname,
        age: this.userAge,
        gender: this.userGender,
        contact: this.userContact,
        email: this.userEmail
        // userzz
      });
      resolve(this.userzArray);
    });
      return this.userzArray;
    });
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // login gaurd

  UserInfor() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userUID = user.uid;
      } else {
        // No user is signed in.
      }
    });
    return this.userUID;
  }

 //////////////////////////////////////////////////////////////////////////////////////////
 // data from appointment database

getAppointment() {
  // this.clearArray(this.ScoreArray);
 const dataz = firebase.database().ref('Appointment/' + this.userUID);
 dataz.once('child_added', (snap) => {
    this.Appointzname = snap.child('name').val();
    this.Appointzsurname = snap.child('surname').val();
    this.Appointzinstitution = snap.child('institution').val();
    this.Appointzdate = snap.child('date').val();
    this.Appointztime = snap.child('time').val();
    this.AppointzReason = snap.child('Reason').val();
    this.appoint.push({
      name: this.Appointzname,
      surname: this.Appointzsurname,
      institution: this.Appointzinstitution,
      date: this.Appointzdate,
      time: this.Appointztime,
      Reason: this.AppointzReason
    });
 });
 return this.appoint;
}

//////////////////////////////////////////////////////////////////////////////////////////
 // code for appointment

 getKin() {
  // this.clearArray(this.ScoreArray);
 const dataz = firebase.database().ref('Kin/' + this.userUID);
 dataz.on('child_added', (snap) => {
    this.kinname = snap.child('name').val();
    this.kinsurname = snap.child('surname').val();
    this.kinAge = snap.child('Age').val();
    this.kinContact = snap.child('Contact').val();
    this.kinRelationship = snap.child('Relationship').val();
    this.Kin.push({
      name: this.kinname,
      surname: this.kinsurname,
      age: this.kinAge,
      contact: this.kinContact,
      relationship: this.kinRelationship
    });
 });
 return this.Kin;
}

//////////////////////////////////////////
// The next lines of codes submit data to the firebase database

generateKey() {
  let newPostKey = firebase.database().ref().child('Appointment/' + this.userId + '/').push().key;
  return newPostKey;
}

submitAppointment(Appointname, Appointsurname, Appointinstitution, Appointdate, Appointtime, AppointReason, userId, newPostKey) {
    let newappointment = firebase.database().ref('Appointment/' + '/' + this.userId + '/' + newPostKey + '/');
    newappointment.set({
      name: Appointname,
      surname:  Appointsurname,
      institution:  Appointinstitution,
      date:  Appointdate,
      time:  Appointtime,
      Reason:  AppointReason,
    }, (error) => {
      if (error) {
      } else {
        this.router.navigate(['/home']);
        // this.presentToast();
      }
    });
}

submitNextOfKin(Name, Surname, Age, Contact, Relationship, userId) {
  let newPostKey = firebase.database().ref().child('Kin/' + userId + '/').push().key;
  let newappointment = firebase.database().ref('Kin/' + '/' + userId + '/' + newPostKey + '/');
  return newappointment.set({
      name: Name,
      surname: Surname,
      Age: Age,
      Contact: Contact,
      Relationship: Relationship,
    }, (error) => {
      if (error) {
      } else {
        this.router.navigate(['/home']);
        // this.presentToast();
      }
    });
}

 /////////////////////////////////////////////////////////////////////////////
 // supporting functions
 clearArray(array) {
  for (let i = 0; i < array.length; i++) {
    array.splice(i);
  }
}

Return_ID() {
  return this.userId;
}

Return_User_ID() {
  return this.userUID;
  }

  MakeReminder(med_name, med_type, start_time, duration, period, userUID, newPostKey) {
    let remainder = firebase.database().ref('Reminder/' + userUID + '/' + newPostKey);
    remainder.set({
      Medicine_Name : med_name,
      Medicine_Type : med_type,
      Start : start_time,
      Duration : duration,
      Period : period
    }, (error) => {
      if (error) {
      } else {
        this.router.navigate(['/home']);
      }
    });
  }

  GetDrugs() {
    return this.http.get('https://api.fda.gov/drug/label.json?count=openfda.brand_name.exact&limit=1000');
  }

}
