const fs = require('fs');
const path = require('path');

class APIData {
    //connects to file
  constructor() {
    this.dataFilePath = path.join(__dirname, '..', 'data.json'); 
  }

  ///read data.json
  readData() {
    try {
      const data = fs.readFileSync(this.dataFilePath, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      console.error('Error reading data file:', err);
      return [];
    }
  }

  //write data.json
  writeData(data) {
    try {
      fs.writeFileSync(this.dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error writing data to file:', err);
    }
  }

  //define and get users
  getAllUsers() {
    const users = this.readData();
    return users;
  }

  //get user id
  getUserById(userId) {
    const users = this.readData();
    return users.find(user => user.userId === parseInt(userId));
  }

  //user adder
  addUser(newUser) {
    const users = this.readData();
    newUser.userId = users.length + 1;
    newUser.createdOn = new Date();
    newUser.lastAccess = new Date();
    users.push(newUser);
    this.writeData(users);
  }

  //profile updater
  updateUser(userId, updatedUser) {
    const users = this.readData();
    const index = users.findIndex(user => user.userId === parseInt(userId));
    if (index !== -1) {
      users[index] = { ...users[index], ...updatedUser, lastAccess: new Date() };
      this.writeData(users);
      return true;
    }
    return false;
  }

  //profile deleter
  deleteUser(userId) {
    const users = this.readData();
    const index = users.findIndex(user => user.userId === parseInt(userId));
    if (index !== -1) {
      users.splice(index, 1);
      this.writeData(users);
      return true;
    }
    return false;
  }
}

module.exports = new APIData();
