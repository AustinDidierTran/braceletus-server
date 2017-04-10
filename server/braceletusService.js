const firebaseService = require('./firebaseService');
const firebase = require('firebase');

const stabilityEnum = {
  stable: '01',
  instable: '00',

}

const manageRoom = (RFID, roomID) => {
  console.log('managing room', RFID, roomID);

  // Retrieve all patients
  firebaseService.getPatients().once('value').then((snapshot) => {
      // console.log(snapshot.val());

      const patients = snapshot.val();
      let patient;
      let patientID_index;

      // Retrieve the right patient
      for(let p in patients) {
        if(patients[p].rfid === RFID) {
          patient = patients[p];
          patientID_index = p;
        }
      }

      if(patient) {
        console.log('patient found', patient);
        // Create in history
        const obj = {
          patientID: patientID_index,
          roomID: roomID,
          time: new Date().toTimeString(),
        };

        console.log('manageRFID', obj);

        firebaseService.createObject('roomAccessHistory', obj)
      } else {
        console.log('patient not found');
      }
    });

  
}

const manageStable = (RFID, isStable) => {
  console.log('managing stable', RFID, isStable);

  firebaseService.getPatients().once('value').then((snapshot) => {
      // console.log(snapshot.val());

      const patients = snapshot.val();
      let patient;
      let patientID_index;

      // Retrieve the right patient
      for(let p in patients) {
        if(patients[p].rfid === RFID) {
          patient = patients[p];
          patientID_index = p;
        }
      }

      if(patient) {

        console.log('patient found', patient);
        patient['isStable'] = isStable;

        const updates = {};

        updates['patients/'+patientID_index] = patient;

        firebase.database().ref().update(updates);        
      } else {
        console.log('patient not found');
      }
    });
}

module.exports = {
  manageRoom: manageRoom,
  manageStable: manageStable
}