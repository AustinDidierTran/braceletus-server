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
    
    return list.$add(obj);
  },
  getPatient: (id) => {
    const ref = firebase.database().ref('patients/' + id);
    return $firebaseObject(ref);
  },
  getPatientFromRFID: (rfid) => {
    var ref = firebase.database().ref('patients');

    return $firebaseArray(ref.orderByChild('rfid').equalTo(rfid));
  }
}