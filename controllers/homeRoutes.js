const router = require("express").Router();
const { User } = require("../models");
const withAuth = require("../utils/auth");


// Redirect to profile if logged in, or show the login page if not
router.get("/", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
  } else {
    res.render("login");

  }
});

router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] }, // Exclude only the password from the user data
      include: [{ model: Feed }],
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
