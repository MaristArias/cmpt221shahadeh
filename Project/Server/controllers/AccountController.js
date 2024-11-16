const fs = require("fs");
const dataFilePath = "./server/accounts.json";

//method to create a new account
exports.createAccount = (req, res) => {
  const { firstName, lastName, email, phoneNumber } = req.body;

  //create a new account object
  const newAccount = {
    id: Date.now(), //assigning a unique id based on current timestamp
    firstName,
    lastName,
    email,
    phoneNumber,
    createdOn: new Date(),
  };

  //read the existing accounts from the file
  fs.readFile(dataFilePath, (err, data) => {
    if (err) {
      return res.status(500).send("Error reading data");
    }

    //parse the data, if it exists
    let accounts = [];
    if (data.length > 0) {
      accounts = JSON.parse(data);
    }

    //add the new account to the list
    accounts.push(newAccount);

    //write the updated accounts back to the file
    fs.writeFile(dataFilePath, JSON.stringify(accounts, null, 2), (err) => {
      if (err) {
        return res.status(500).send("Error saving account");
      }
      res.status(201).json(newAccount); //send the newly created account
    });
  });
};

//method to update an existing account
exports.updateAccount = (req, res) => {
  const { id } = req.params; //account id to update
  const { firstName, lastName, email, phoneNumber } = req.body;

  //read the existing accounts from the file
  fs.readFile(dataFilePath, (err, data) => {
    if (err) {
      return res.status(500).send("Error reading data");
    }

    //parse the data
    let accounts = JSON.parse(data);
    const account = accounts.find((account) => account.id === parseInt(id));

    //if account is not found, return a 404
    if (!account) {
      return res.status(404).send("Account not found");
    }

    //update account fields
    account.firstName = firstName || account.firstName;
    account.lastName = lastName || account.lastName;
    account.email = email || account.email;
    account.phoneNumber = phoneNumber || account.phoneNumber;

    //write the updated accounts back to the file
    fs.writeFile(dataFilePath, JSON.stringify(accounts, null, 2), (err) => {
      if (err) {
        return res.status(500).send("Error updating account");
      }
      res.json(account); //send the updated account details
    });
  });
};

//method to delete an account
exports.deleteAccount = (req, res) => {
  const { id } = req.params; //account id to delete

  //read the existing accounts from the file
  fs.readFile(dataFilePath, (err, data) => {
    if (err) {
      return res.status(500).send("Error reading data");
    }

    //parse the data
    let accounts = JSON.parse(data);
    accounts = accounts.filter((account) => account.id !== parseInt(id));

    //write the updated accounts back to the file
    fs.writeFile(dataFilePath, JSON.stringify(accounts, null, 2), (err) => {
      if (err) {
        return res.status(500).send("Error deleting account");
      }
      res.status(200).send("Account deleted"); //confirm account deletion
    });
  });
};
