const firebase = require('firebase');

const firebaseConfig = {
    apiKey: "AIzaSyBKjNO1GcxwDVylqAizWQgMKK3NeOGGJO0",
    authDomain: "braceletus-7a2e6.firebaseapp.com",
    databaseURL: "https://braceletus-7a2e6.firebaseio.com",
    projectId: "braceletus-7a2e6",
    storageBucket: "braceletus-7a2e6.appspot.com",
    messagingSenderId: "90223967938"
  };

module.exports = {
  app: firebase.initializeApp(firebaseConfig),
  createObject: (key, obj, _callback) => {
    const ref = firebase.database().ref(key);
    const list = $firebaseArray(ref);
    const newObjectKey = firebase.database().ref().child(key).push().key;
    const updates = {};
    updates[`${key}${newObjectKey}`] = obj;

    return firebase.database().ref().update(updates);
    
  },
  getPatient: (id) => {
    const ref = firebase.database().ref('patients/' + id);

    return firebase.database().ref('/patients/' + id).once('value');
  },
  getPatients: () => {
    var ref = firebase.database().ref('patients');

    return firebase.database().ref('/patients/');
  },
  getPatientFromRFID: (rfid) => {
    var ref = firebase.database().ref('patients');

    firebase.database().ref('/patients/').once('value').then((snapshot) => {
      // console.log(snapshot.val());

      const patients = snapshot.val();

      patients.forEach((patient) => {
        if(patient.rfid === rfid) {
          console.log(patient);
          return patient;
        }
      })
    });
  }
}