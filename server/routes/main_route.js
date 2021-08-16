const express = require("express");
const router = express.Router();
const StaffAccount = require("../models/staff_accounts");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

router.post("/login", (req, res, next) => {
  if (!(req.body.login_id && req.body.password)) {
    res.status(400).send(JSON.stringify({ result: "fail", message: "Invalid Login ID or Password." }));
  } else {
    //db retrieve
    StaffAccount.findOne({ login_id: req.body.login_id.toLowerCase() }).then((user) => {
      if (user != null) {
        bcrypt.compare(req.body.password, user.password, function (err, result) {
          if (result) {
            //res.send(JSON.stringify({ result: "success" }));
            const token = jwt.sign({ user_id: result.login_id }, process.env.secret, {
              //expiresIn: "2h",
              expiresIn: "30000",
              //expiresIn: "5000",
            });
            //res.cookie('jwt', token, { httpOnly: true, secure: true, maxAge: 7200}).status(200).send({ result: "success" });
            res.status(200).send(JSON.stringify({ result: "success", token: token, user_id: result.login_id }));
          } else {
            res.status(400).send(JSON.stringify({ result: "fail", message: "Invalid Login ID or Password." }));
          }
        });
        /*
        if (result.password == req.body.password) {
          //res.send(JSON.stringify({ result: "success" }));
          const token = jwt.sign({ user_id: result.login_id }, process.env.secret, {
            //expiresIn: "2h",
            expiresIn: "30000",
            //expiresIn: "5000",
          });
          //res.cookie('jwt', token, { httpOnly: true, secure: true, maxAge: 7200}).status(200).send({ result: "success" });
          res.status(200).send(JSON.stringify({ result: "success", token: token, user_id: result.login_id }));
        } else {
          res.status(400).send(JSON.stringify({ result: "fail", message: "Invalid Login ID or Password." }));
        }*/
      } else {
        res.status(400).send(JSON.stringify({ result: "fail", message: "Invalid Login ID or Password." }));
      }
    });
  }
});

router.post("/verifyToken", (req, res, next) => {
  const token = req.body.token;

  if (!token) {
    return res.status(403).send(JSON.stringify({ result: "fail", message: "No token" }));
  }
  try {
    const decoded = jwt.verify(token, process.env.secret);
    req.user = decoded;
    res.status(200).send(JSON.stringify({ result: "success", token: token }));
  } catch (err) {
    return res.status(401).send(JSON.stringify({ result: "fail", message: "Invalid token" }));
  }
});

router.post("/refreshToken", (req, res, next) => {
  const token = req.body.token;

  if (!token) {
    return res.status(403).send(JSON.stringify({ result: "fail", message: "No token" }));
  }
  try {
    const decoded = jwt.verify(token, process.env.secret);
    req.user = decoded.user_id;
    console.log("decoded");
    console.log(decoded);
    const new_token = jwt.sign({ user_id: req.user }, process.env.secret, {
      //expiresIn: "2h",
      expiresIn: "30000",
      //expiresIn: "5000",
    });
    res.status(200).send(JSON.stringify({ result: "success", token: new_token }));
  } catch (err) {
    consol.log(err);
    return res.status(401).send(JSON.stringify({ result: "fail", message: "Invalid token" }));
  }
});

module.exports = router;
