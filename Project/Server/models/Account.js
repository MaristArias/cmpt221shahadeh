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
  }
  
  module.exports = Account;