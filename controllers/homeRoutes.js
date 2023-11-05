const router = require("express").Router();
const { User, Pet } = require("../models");
const withAuth = require("../utils/auth");

// Redirect to profile if logged in, or show the login page if not
router.get("/", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/feed");
  } else {
    res.render("login");
  }
});

//renders the feed page when the feed page is requested and gets all the pets from the database
router.get("/feed", withAuth, async (req, res) => {
  try {
    const petsData = await Pet.findAll({
      include: [{ model: User, attributes: ["name"] }],
      order: [["created_at", "DESC"]],
    });

    const pet = petsData.map((pet) => pet.get({ plain: true }));

    res.render("feed", { pet, loggedIn: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// In your server-side code (e.g., Express.js route)
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged-in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: ["name", "email"],
      // Include any other relevant data, e.g., pets
    });

    if (!userData) {
      // Handle the case where the user doesn't exist
      return res.status(404).send("User not found");
    }

    const user = userData.get({ plain: true });

    res.render("profile", {
      user, // Pass the user data to the template
      loggedIn: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
