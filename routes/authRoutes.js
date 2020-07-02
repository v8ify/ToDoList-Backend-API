const express = require("express");
const passport = require("passport");
const router = express.Router();

// requests to route /auth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.redirect(`${process.env.FRONTEND_CLIENT}/dashboard`);
});

router.get("/current_user", (req, res) => {
  res.json(req.user);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(`${process.env.FRONTEND_CLIENT}/`);
});

module.exports = router;
