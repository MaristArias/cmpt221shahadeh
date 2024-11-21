class Account {
  constructor(firstName, lastName, userId, email, phoneNumber, createdOn) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userId = userId;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.createdOn = createdOn || new Date();
    this.lastAccess = new Date();
  }

  //get account details from data.json
  updateDetails({ firstName, lastName, email, phoneNumber }) {
    if (firstName) this.firstName = firstName;
    if (lastName) this.lastName = lastName;
    if (email) this.email = email;
    if (phoneNumber) this.phoneNumber = phoneNumber;
    this.lastAccess = new Date(); //update last access time
  }

  //get account info from data.json
  getProfile() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      userId: this.userId,
      email: this.email,
      phoneNumber: this.phoneNumber,
      createdOn: this.createdOn,
      lastAccess: this.lastAccess,
    };
  }

  /*  ///read data.json
  readData() {
    try {
      const data = fs.readFileSync(this.dataFilePath, "utf-8");
      return JSON.parse(data);
    } catch (err) {
      console.error("Error reading data file:", err);
      return [];
    }
  }

  //write data.json
  writeData(data) {
    try {
      fs.writeFileSync(
        this.dataFilePath,
        JSON.stringify(data, null, 2),
        "utf-8"
      );
    } catch (err) {
      console.error("Error writing data to file:", err);
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
    return users.find((user) => user.userId === parseInt(userId));
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
    const index = users.findIndex((user) => user.userId === parseInt(userId));
    if (index !== -1) {
      users[index] = {
        ...users[index],
        ...updatedUser,
        lastAccess: new Date(),
      };
      this.writeData(users);
      return true;
    }
    return false;
  }

  //profile deleter
  deleteUser(userId) {
    const users = this.readData();
    const index = users.findIndex((user) => user.userId === parseInt(userId));
    if (index !== -1) {
      users.splice(index, 1);
      this.writeData(users);
      return true;
    }
    return false;
  }
  */
}

module.exports = Account;
