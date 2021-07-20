const router = require("express").Router();
const { checkUsernameExists, validateRoleName } = require('./auth-middleware');
const { JWT_SECRET } = require("../secrets"); // use this secret!
const bcrypt = require('bcryptjs');
const Users = require('../users/users-model');
const jwt = require('jsonwebtoken');

router.post("/register", validateRoleName, (req, res, next) => {
  const {username} = req.body;
  const {role_name} = req;
  const unhashedPass = req.body.password;
  const password = bcrypt.hashSync(unhashedPass, 10);
  Users.add({username, password, role_name})
    .then(user => {
      res.json(user);
    })
    .catch(next);
  /**
    [POST] /api/auth/register { "username": "anna", "password": "1234", "role_name": "angel" }

    response:
    status 201
    {
      "user"_id: 3,
      "username": "anna",
      "role_name": "angel"
    }
   */
});


router.post("/login", checkUsernameExists, (req, res, next) => {
  const { username, password } = req.body;
  const user = req.user;
  const passwordIsGood = bcrypt.compareSync(password, user.password);
  if (passwordIsGood) {
    const payload = {
      subject: user.user_id,
      username: user.username,
      role_name: user.role_name
    };
    const options = {
      expiresIn: '1d'
    };
    const token = jwt.sign(payload, JWT_SECRET, options);
    res.json({
      message: `${username} is back!`,
      token
    });
  } else {
    next({
      status: 401,
      message: 'Invalid credentials'
    });
  }
  /**
    [POST] /api/auth/login { "username": "sue", "password": "1234" }

    response:
    status 200
    {
      "message": "sue is back!",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ETC.ETC"
    }

    The token must expire in one day, and must provide the following information
    in its payload:

    {
      "subject"  : 1       // the user_id of the authenticated user
      "username" : "bob"   // the username of the authenticated user
      "role_name": "admin" // the role of the authenticated user
    }
   */
});

module.exports = router;
