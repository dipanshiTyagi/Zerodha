const express = require("express");
const { Signup, Login } = require("../controllers/AuthController");
const { userVerification } = require("../middlewares/AuthMiddleware");

const router = express.Router();

router.post("/signup", Signup);
router.post('/login', Login);
router.post('/', userVerification);


module.exports = router;