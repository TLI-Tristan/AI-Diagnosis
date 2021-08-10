const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    patient_id: {
        type: String,
        unique: true,
        required: true
    },
    priority: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const PatientSchema = mongoose.model('patients', patientSchema);

module.exports = PatientSchema;