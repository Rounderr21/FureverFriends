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
  console.log(req.session.user_id);
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [{ model: Pet, attributes: ["name","age", "type", "breed","weight", "description", "image_url"] }],
      attributes: ["name", "email"],
    });

    console.log(userData);

    const user = userData.get({ plain: true });

    console.log(user);

    res.render("profile", { user, loggedIn: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
