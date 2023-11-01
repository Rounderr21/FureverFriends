const router = require("express").Router();
const { User } = require("../models/user");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const feedData = await Feed.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
          include: [
            {
              model: Pet,
              attributes: ["name"],
            },
          ],
        },
      ],
    });

    // Serialize data so the template can read it
    const feeds = feedData.map((project) => feed.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      feeds,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/feed/:id", async (req, res) => {
  try {
    const feedData = await FEed.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const feeds = feedData.get({ plain: true });

    res.render("feed", {
      ...feeds,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Feed }],
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

module.exports = router;