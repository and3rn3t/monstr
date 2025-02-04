const express = require("express");
const router = express.Router();

// Import models
const Users = require("../models").Users;
const Posts = require("../models").Posts;

// GET Index
router.get("/", (req, res) => {
  Users.findAll().then((user) => {
    res.render("users/index.ejs", {
      users: user,
    });
  });
});

// GET Profile
router.get("/:id", (req, res) => {
  Users.findByPk(req.params.id, {
    include: [
      {
        model: Posts,
        attributes: ["textContent", "picture"],
      },
    ],
  }).then((userProfile) => {
    res.render("users/show.ejs", {
      user: userProfile,
    });
  });
});

// GET Profile (Edit)
router.get("/edit/:id", (req, res) => {
  Users.findByPk(req.params.id).then((userProfile) => {
    res.render("users/profile.ejs", {
      user: userProfile,
    });
  });
});

// PUT Profile (Edit)
router.put("/:id", (req, res) => {
  Users.update(req.body, {
    where: { id: req.params.id },
    returning: true,
  }).then((user) => {
    res.redirect("/users");
  });
});

// Delete Profile
router.delete("/:id", (req, res) => {
  Users.destroy({ where: { id: req.params.id } }).then(() => {
    res.redirect("/users");
  });
});

module.exports = router;
