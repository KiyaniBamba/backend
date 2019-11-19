const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("./user-model");


const restricted = require("../auth/restricted-middleware");

const router = express.Router();

router.get("/", restricted, (req, res) => {
  if (req.decodedToken) {
    Users.findAll()
      .then(users => {
        res.json(users);
      })
      .catch(err => {
        res.send(err);
      });
  } else {
    res.json({
      message: "You don't have the right to access this information"
    });
  }
});

router.get("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy (err => {
            if (err) {
                res.json("Oh, no! You cannot leave");
            } else {
                res.json("See you soon, goodbye!");
            }
        });
    } else {
        res.send();
    }
});

router.post("/register", (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 11);
    const newUser = {
        username: req.body.username,
        password: hash
    };
    Users.addUser(newUser)
    .then(saved => {
        res.status(201).json(saved);
    })
    .catch(error => {
        res.status(500).json(error);
    });
});


router.post("/login", (req, res) => {
    let { username, password } = req.body;
  
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({
            message: `Welcome ${user.username}`,
            token: token
          });
        } else {
          res.status(401).json({ message: "You shall not pass" });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
  
  //generateToken function
  function generateToken(user) {
    const payload = {
      subject: user.id,
      username: user.username
    };
  
    const options = {
      expiresIn: "1d"
    };
  
    const result = jwt.sign(payload, "THIS IS THE SECRET", options);
    return result;
  }

  function restricted(req, res, next) {
    if (req.session && req.session.user) {
      next();
    } else {
      res.status(400).json({ message: "No credentials provided" });
    }
  }
  
  module.exports = router;
  