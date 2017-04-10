const firebaseService = require('./firebaseService');

const stabilityEnum = {
  stable: '01',
  instable: '00',

}

const manageRFID = (RFID, roomID) => {
  // Create in history
  const obj = {
    RFID: RFID,
    roomID: roomID,
    time: new Date().toTimeString,
  };

  console.log('manageRFID', obj);

  firebaseService.createObject('roomAccessHistory', obj)
}

const manageSignal = (fall, help, cancel, rfid) => {
  // Fetch patient
  const patient = firebaseService.getPatientFromRFID(rfid);

  patient.$loaded().then((result) => {
    // Manage patient
    if(fall || help) {
      patient['isStable'] = stabilityEnum['instable'];
    }

    if(cancel) {
      patient['isStable'] = stabilityEnum['stable'];
    }

    // Save patient
    patient.$save();
  });
  
}

module.exports = {
  manageRFID: manageRFID,
  manageSignal: manageSignal
}