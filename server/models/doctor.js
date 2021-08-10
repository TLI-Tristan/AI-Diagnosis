const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    doctor_id: {
        type: Number,
        unique: true,
        required: true
    },
    doctor_name: {
        type: String,
        required: true
    },
    doctor_email: {
        type: String,
        required: true
    },
    doctor_contact: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

const DoctorSchema = mongoose.model('doctors', doctorSchema);

module.exports = DoctorSchema;