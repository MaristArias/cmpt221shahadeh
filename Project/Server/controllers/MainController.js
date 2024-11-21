let apiData = require(`../models/APIData`);
exports.getData = function (req, res) {
  res.send(JSON.stringify(apiData.getData()));
};
exports.getId = function (req, res) {
  res.send(JSON.stringify(apiData.extractId()));
};
//get one item
//get the whole array
