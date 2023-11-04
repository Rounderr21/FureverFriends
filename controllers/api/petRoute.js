const router = require("express").Router();
const { User, Pet } = require("../../models");
const withAuth = require("../../utils/auth");

// 1. Get a feed of all pet posts
router.get("/", withAuth, async (req, res) => {
  try {
    const allPosts = await Pet.findAll({
      include: [{ model: User, attributes: ["name"] }],
    });

    res.status(200).json({allPosts, loggedIn: req.session.loggedIn});
  } catch (err) {
    res.status(500).json(err);
  }
});

// 2. Get a single pet post by its ID
router.get("/:id", async (req, res) => {
  try {
    const singlePost = await Pet.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: User, attributes: ["name"] }],
    });

    if (!singlePost) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(singlePost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 3. Create a pet post
router.post("/", async (req, res) => {
  try {
    const newPetPost = await Pet.create(req.body);
    res.status(200).json(newPetPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// 4. Update a pet post by ID
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatedPost = await Pet.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!updatedPost) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json({updatedPost, loggedIn: req.session.loggedIn});
  } catch (err) {
    res.status(500).json(err);
  }
});

// 5. Delete a pet post by ID
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const deletedPetPost = await Pet.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!deletedPetPost) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json({deletedPetPost, loggedIn: req.session.loggedIn});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;