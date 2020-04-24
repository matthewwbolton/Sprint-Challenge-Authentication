const router = require("express").Router();

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const secret = require("../config/secret");
const generateToken = require("../config/generateToken");

const Users = require("../Users/userModel");

router.post("/register", (req, res) => {
  // implement registration
  let user = req.body;

  const rounds = process.env.HASH_ROUNDS || 14;

  const hash = bcrypt.hashSync(user.password, rounds);

  user.password = hash;

  Users.addUser(user)
    .then((newUser) => {
      const token = generateToken(newUser);

      res.status(201).json({ newUser, token });
    })
    .catch((error) => {
      res.status(500).json({
        error: `There was an error while attempting to register the new user!`,
      });
    });
});

router.post("/login", (req, res) => {
  // implement login
  let { username, password } = req.body;

  Users.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({ message: `Welcome user ${username}!!!`, token });
      } else {
        res.status(401).json({
          message: `The user with username ${username} cannot be found!`,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: `There was an internal server error while attempting to login!`,
      });
    });
});

module.exports = router;
