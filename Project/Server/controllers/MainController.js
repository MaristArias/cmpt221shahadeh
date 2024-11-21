let apiData = require(`../models/APIData`);
exports.getData = function (req, res) {
  try {
    //log the incoming request
    console.log("Received GET request for /api/data");
    // Call apiData.getData
    const data = apiData.getData();
    // log the data
    console.log("Data retrieved:", data);
    // Send the data as a JSON response
    res.send(JSON.stringify(data));
  } catch (error) {
    // Log any errors
    console.error("Error in getData:", error);
    // Send error response
    res.status(500).send({ error: "An error occurred while fetching data" });
  }
};

exports.getId = function (req, res) {
  try {
    const id = req.params.id; // Access the ID from the URL
    // make sure the id exists and a string
    if (!id || typeof id !== "string") {
      return res
        .status(400)
        .send({ error: "ID must be provided and must be a string" });
    }
    // Call extractId to find the article
    const article = apiData.extractId(id);
    // if there is no matching article then return an error
    if (!article) {
      return res
        .status(404)
        .send({ error: `No article found with source ID: ${id}` });
    }
    // Send the full article
    res.send(article);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
