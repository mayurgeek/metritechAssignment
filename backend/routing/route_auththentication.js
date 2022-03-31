const express = require('express');
const User = require('../models/usermodel');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var jwtauth = require('../middleware/middleware_auth');
// const { application } = require('express');

const Secret_jwt_key = 'mayur$Yadav';



//Create a User 
router.post('/createuser', [
  body('name', 'Enter a name').isLength({max:20}),
  body('email', 'Enter a email adress').isEmail(),
  body('date_of_birth', "enter your date of birth").isLength(),
  body('password', 'Password').isLength({min:6}),
],

 async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(600).json({errors });
  }

try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ err: "this email already exists" })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
      date_of_birth: req.body.date_of_birth,
    });
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, Secret_jwt_key);
    res.status(200).json({ authtoken })

  } catch (error) {
    console.error(error.message);
    send("Internal Server Error");
  }
})


// ROUTE LOGIN
router.post('/login', [
  body('email', 'Enter a email').isEmail(),
  body('password', 'Password ').exists(),
], async (req, res) => {
  let success = false;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ err:"email is empty" });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      success = false
      return res.status(600).json({ err:"invalid credintials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false
      return res.status(600).json({ success, err: "invalid credintials" });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, Secret_jwt_key);
    success = true;
    res.status(200).json({ success, authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }


});


// Get loggin
router.post('/getuser', jwtauth,  async (req, res) => {

  
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.status(200).send(user)
  
})
module.exports = router