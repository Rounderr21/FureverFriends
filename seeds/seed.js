const sequelize = require("../config/connection");
const { User, Pet, Feed } = require("../models");

const userData = require("./userData.json");
const petData = require("./petData.json");
const feedData = require("./feedData.json");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await userData();
  await petData();
  await feedData();

  process.exit(0);
};

seedAll();
