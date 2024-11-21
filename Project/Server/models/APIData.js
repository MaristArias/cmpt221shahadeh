const fs = require("fs");
const path = require("path");

class APIData {
  //connects to file
  constructor() {
    this.dataFilePath = path.join(__dirname, "..", "data.json");
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
  getData() {
    try {
      //path to the data file
      const dataFilePath = path.join(__dirname, "../data.json");
      //log the file path
      console.log("Data file path:", dataFilePath);
      // Read the data from the file
      const data = fs.readFileSync(dataFilePath, "utf-8");
      // log the data
      console.log("Raw data read from file:", data);
      // Parse and return the JSON data
      const parsedData = JSON.parse(data);
      //log the parsed data
      console.log("Parsed data:", parsedData);
      return parsedData;
    } catch (error) {
      // Log any errors
      console.error("Error in getData:", error);
      // Throw error
      throw new Error("Error reading or parsing data from data.json");
    }
  }

  extractId(id) {
    const dataFilePath = path.join(__dirname, "../data.json");
    const data = fs.readFileSync(dataFilePath, "utf-8");
    const parsedData = JSON.parse(data);
    // Ensure articles array exists
    if (!parsedData.articles || !Array.isArray(parsedData.articles)) {
      throw new Error("Articles data is missing or not an array in data.json");
    }
    // Find the article with the matching id
    const article = parsedData.articles.find(
      (article) => article.source && article.source.id === id
    );
    // throw an error if you can't find the article
    if (!article) {
      throw new Error(`No article found with source ID: ${id}`);
    }
    // Return the entire article upon searching for the id
    return article;
  }
}

module.exports = new APIData();
