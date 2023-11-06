const router = require("express").Router();
const { User, Pet } = require("../../models");
const withAuth = require("../../utils/auth");

// 1. Get a feed of all pet posts
router.get("/", async (req, res) => {
  try {
    const allPets = await Pet.findAll({
      include: [{ model: User, attributes: ["name"] }],
    });
    const plainData = allPets.map((pet) => pet.get({ plain: true }));
    console.log("All posts (plain):", plainData);
    res.json(plainData);
  } catch (err) {
    console.error("Error fetching posts:", err);
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
// Mapping of pet types to image URLs
const petImages = {
  dog: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxRVRnkiqpP0ijLFlkwd_7EHZXQf0ME9tnLg&usqp=CAU",
  cat: "https://www.dutch.com/cdn/shop/articles/shutterstock_538333303.jpg?v=1683242960&width=1080",
  bird: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsVDV2UUDrNsjXXEihOlFHAIPAiuWb9U23oA&usqp=CAU",
  fish: "https://media.cnn.com/api/v1/images/stellar/prod/210713100916-03-giant-goldfish-minnesota.jpg?q=w_2100,h_1500,x_0,y_0,c_fill",
  cow: "https://cdn.britannica.com/55/174255-050-526314B6/brown-Guernsey-cow.jpg",
  snake: "https://image.petmd.com/files/styles/978x550/public/cornsnake.gif",
  horse:
    "https://ichef.bbci.co.uk/news/640/cpsprodpb/B875/production/_102512274_gettyimages-518360318.jpg",
  rabbit:
    "https://www.caldervets.co.uk/images/pet-care/rabbits/rabbits-dental-care-for-rabbits-01.jpg",
  lizard:
    "https://images.saymedia-content.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cq_auto:eco%2Cw_1200/MTk2OTk1MDI2MjEzOTM4OTQ5/how-to-make-a-house-for-your-pet-lizard.png",
  pig: "https://i.natgeofe.com/k/0ed36c42-672a-425b-9e62-7cc946b98051/pig-fence_square.jpg",
  hedgehog:
    "https://vetmed.illinois.edu/wp-content/uploads/2021/04/pc-keller-hedgehog.jpg",

  // More mappings...
};

// 3. Create a pet post
router.post("/", withAuth, async (req, res) => {
  try {
    // Retrieve the pet type from the request body
    const petType = req.body.type;

    // Find the image URL based on the pet type, or use a default image URL
    const imageUrl =
      petImages[petType.toLowerCase()] || "https://example.com/default.jpg";

    // Include the image URL in the data to be stored for the new pet post
    const newPetData = {
      ...req.body,
      user_id: req.session.user_id, // Ensure you associate the pet with a user, if applicable
      image_url: imageUrl,
    };

    // Create the new pet post with the full data, including the image URL
    const newPetPost = await Pet.create(newPetData);

    // Redirect to the feed, or you might want to send a JSON response
    res.redirect("/feed");
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

    res.status(200).json({ updatedPost, loggedIn: req.session.loggedIn });
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

    res.status(200).json({ deletedPetPost, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
