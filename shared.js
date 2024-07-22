const fs = require("fs");

const sampleFiles = fs.readdirSync("./sample_data");

const sampleTimes = sampleFiles
  .map((fileName) => `${parseInt(fileName.replace(".json", ""))}`)
  .slice(0, 2); // Comment out if we want to use whole data set

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

module.exports = {
  sampleTimes,
  getRandomInt,
};
