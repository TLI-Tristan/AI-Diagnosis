const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientRecordsSchema = new Schema({
    
});

const PatientRecords = mongoose.model('patient_records', patientRecordsSchema);

module.exports = PatientRecords;