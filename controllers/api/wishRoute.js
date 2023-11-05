const router = require("express").Router();
const { WishList, User, Pet } = require("../../models");
const withAuth = require("../../utils/auth");

// get list of wished pets
router.get("/", withAuth, async (req, res) => {
  try {
    const allWish = await WishList.findAll({
      include: [{ model: Pet, attributes: ["name"] }],
    });

    res.status(200).json({ allWish, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

// add to wishlist
router.post("/", async (req, res) => {
  try {
    const { petId } = req.body;

    const newWishlistItem = await WishList.create({
      user_id: req.user.id,
      pet_id: petId,
    });

    if (newWishlistItem) {
      res.status(200).json({ message: "Pet added to the wishlist" });
    } else {
      res.status(500).json({ error: "Failed to add pet to the wishlist" });
    }
  } catch (error) {
    console.error("Error adding pet to wishlist:", error);
    res.status(500).json({ error: "Failed to add pet to the wishlist" });
  }
});

// remove from wishlist
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const deleteWishList = await WishList.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!deleteWishList) {
      res.status(404).json({ message: "Post not found!" });
      return;
    }

    res.status(200).json({ deleteWishList, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
