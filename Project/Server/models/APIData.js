const fs = require("fs");
const path = require("path");

class APIData {
  constructor() {
    // Path to the JSON file
    this.dataFilePath = path.join(__dirname, "..", "data.json");
  }

  // Helper method to read and parse JSON file
  _readData() {
    try {
      const rawData = fs.readFileSync(this.dataFilePath, "utf-8");
      return JSON.parse(rawData);
    } catch (error) {
      console.error("Error reading data.json:", error);
      throw new Error("Failed to load data from data.json");
    }
  }

  // Helper method to write updated data back to the file
  _writeData(data) {
    try {
      fs.writeFileSync(this.dataFilePath, JSON.stringify(data, null, 2), "utf-8");
    } catch (error) {
      console.error("Error writing to data.json:", error);
      throw new Error("Failed to save data to data.json");
    }
  }

  // Get all articles
  getData() {
    const data = this._readData();
    return data.articles || [];
  }

  // Get a single article by its source ID
  extractId(id) {
    const articles = this.getData();
    const article = articles.find(
      (article) => article.source && article.source.id === id
    );

    if (!article) {
      throw new Error(`No article found with source ID: ${id}`);
    }

    return article;
  }

  // Add a new article
  addArticle(newArticle) {
    const data = this._readData();
    data.articles = data.articles || [];
    data.articles.push(newArticle);
    this._writeData(data);
    return newArticle;
  }

  // Update an article by source ID
  updateArticle(id, updatedFields) {
    const data = this._readData();
    const articles = data.articles || [];

    const index = articles.findIndex(
      (article) => article.source && article.source.id === id
    );

    if (index === -1) {
      throw new Error(`No article found with source ID: ${id}`);
    }

    // Update only specified fields
    articles[index] = { ...articles[index], ...updatedFields };
    this._writeData(data);
    return articles[index];
  }

  // Delete an article by source ID
  deleteArticle(id) {
    const data = this._readData();
    const articles = data.articles || [];

    const filteredArticles = articles.filter(
      (article) => !(article.source && article.source.id === id)
    );

    if (articles.length === filteredArticles.length) {
      throw new Error(`No article found with source ID: ${id}`);
    }

    data.articles = filteredArticles;
    this._writeData(data);
    return true;
  }
}

module.exports = new APIData();
