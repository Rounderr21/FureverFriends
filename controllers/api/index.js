const router = require("express").Router();
const userRoute = require("./userRoute");
const petRoute = require("./petRoute");

router.use("/user", userRoute);
router.use("/pet", petRoute);

module.exports = router;
