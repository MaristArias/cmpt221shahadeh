// controllers/AccountController.js

const Account = require('../models/Account');  // Assuming you're using Mongoose for MongoDB

// Create a new account
exports.createAccount = async (req, res) => {
  const { firstName, lastName, email, phoneNumber } = req.body;

  // Basic validation for required fields
  if (!firstName || !lastName || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Create a new account document
    const newAccount = new Account({
      firstName,
      lastName,
      email,
      phoneNumber,
      createdOn: new Date(),
      lastAccess: new Date(),
    });

    // Save the new account in the database
    await newAccount.save();

    // Respond with a success message and the created account data
    res.status(201).json({ message: 'Account created successfully', user: newAccount });
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ error: 'Failed to create account' });
  }
};

// Update an account
exports.updateAccount = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, phoneNumber } = req.body;

  try {
    const updatedAccount = await Account.findByIdAndUpdate(
      id,
      { firstName, lastName, email, phoneNumber, lastAccess: new Date() },
      { new: true }
    );

    if (!updatedAccount) {
      return res.status(404).json({ error: 'Account not found' });
    }

    res.status(200).json({ message: 'Account updated successfully', user: updatedAccount });
  } catch (error) {
    console.error('Error updating account:', error);
    res.status(500).json({ error: 'Failed to update account' });
  }
};

// Delete an account
exports.deleteAccount = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAccount = await Account.findByIdAndDelete(id);

    if (!deletedAccount) {
      return res.status(404).json({ error: 'Account not found' });
    }

    res.status(200).json({ message: 'Account deleted successfully', user: deletedAccount });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ error: 'Failed to delete account' });
  }
};

// Get an account by ID
exports.getAccountById = async (req, res) => {
  const { id } = req.params;

  try {
    const account = await Account.findById(id);

    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    res.status(200).json(account);
  } catch (error) {
    console.error('Error fetching account:', error);
    res.status(500).json({ error: 'Failed to fetch account' });
  }
};

// Get all accounts (optional)
exports.getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();

    res.status(200).json(accounts);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).json({ error: 'Failed to fetch accounts' });
  }
};
