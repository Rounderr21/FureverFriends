const sequelize = require("../config/connection");
const { User, Pet } = require("../models");

const userData = require("./userData.json");
const petData = require("./petData.json");

const seedAll = async () => {
  try {
    await sequelize.sync({ force: true });

    // Insert user data
    await User.bulkCreate(userData);

    // Insert pet data
    await Pet.bulkCreate(petData);

    console.log("Data seeded successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    process.exit(0);
  }
};

seedAll();
