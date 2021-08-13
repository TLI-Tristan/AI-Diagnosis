const express = require("express");
const router = express.Router();
const StaffAccount = require("../models/staff_accounts");

router.post("/login", (req, res, next) => {
  //db retrieve
  StaffAccount.findOne({ login_id: req.body.login_id.toLowerCase() }).then((result) => {
    if (result != null) {
      console.log(result);
      if (result.password == req.body.password) {
        res.send(JSON.stringify({ result: "success" }));
      } else {
        res.send(JSON.stringify({ result: "fail" }));
      }
    } else {
      res.send(JSON.stringify({ result: "fail" }));
    }
  });
});

module.exports = router;
