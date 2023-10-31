const router = require("express").Router();
const { UserPost } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const newUserPost = await UserPost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newUserPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const newUserPost = await UserPost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!newUserPost) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(newUserPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
