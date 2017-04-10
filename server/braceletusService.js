const firebaseService = require('./firebaseService');

const stabilityEnum = {
  stable: '01',
  instable: '00',

}

const manageRoom = (RFID, roomID) => {
  console.log('managing room', RFID, roomID);
  // Create in history
  const obj = {
    RFID: RFID,
    roomID: roomID,
    time: new Date().toTimeString,
  };

  console.log('manageRFID', obj);

  firebaseService.createObject('roomAccessHistory', obj)
}

const manageStable = (RFID, isStable) => {
  console.log('managing stable', RFID, isStable);
  // Fetch patient
  const patient = firebaseService.getPatientFromRFID(rfid);

  patient.$loaded().then((result) => {
    // Manage patient
    patient['isStable'] = isStable

    // Save patient
    patient.$save();
  });
  
}

module.exports = {
  manageRoom: manageRoom,
  manageStable: manageStable
}