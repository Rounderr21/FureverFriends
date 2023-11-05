const router = require("express").Router();
const userRoute = require("./userRoute");
const petRoute = require("./petRoute");
const wishRoute = require("./wishRoute");

router.use("/user", userRoute);
router.use("/pet", petRoute);
router.use("/wishlist", wishRoute);

module.exports = router;
