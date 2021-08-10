const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffAccountSchema = new Schema({
    login_id: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    } 
});

const StaffAccount = mongoose.model('staff_accounts', staffAccountSchema);

module.exports = StaffAccount;