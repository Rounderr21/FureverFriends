const router = require("express").Router();
const userRoute = require("./userRoute");
const postRoute = require("./postRoute");

router.use("/user", userRoute);
router.use("/post", postRoute);

module.exports = router;
