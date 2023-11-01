const router = require("express").Router();
const userRoute = require("./userRoute");
const feedRoute = require("./feedRoute");

router.use("/user", userRoute);
router.use("/feed", feedRoute);

module.exports = router;
