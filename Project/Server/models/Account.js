// models/Account.js

const mongoose = require('mongoose');

// Define the schema for the Account
const accountSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String },
  createdOn: { type: Date, default: Date.now },
  lastAccess: { type: Date, default: Date.now },
});

// Create the model
const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
