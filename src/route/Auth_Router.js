const express = require("express");
const Auth_Controller = require("../controllers/Auth_Controller");
const passport = require("passport");
require("../config/configPassport");
const router = express.Router();

router.post("/login", Auth_Controller.login);
router.post("/register", Auth_Controller.register);
router.post("/logout", Auth_Controller.logout);
router.post("/refresh", Auth_Controller.refreshToken);
router.post("/verify-email", Auth_Controller.verifyEmail);
router.post("/send-email", Auth_Controller.getAuthenticatedEmailCode);
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: [
      "email",
      "user_birthday",
      "user_gender",
      "user_photos",
      "public_profile",
    ],
  })
);
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);
router.get("/oauth/success", Auth_Controller.oauthSuccess);
router.get("/login/failed", (req, res) => {
  req.logOut();
  res.status(200).json();
});
router.get("/logout", (req, res) => {
  req.logOut();
  res.status(200).json();
});
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/login/failed",
    successRedirect: "http://localhost:3000/oauth/success",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login/failed",
    successRedirect: "http://localhost:3000/oauth/success",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);
module.exports = router;
