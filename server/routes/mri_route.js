const express = require("express");
const router = express.Router();
const fs = require("fs");
const request = require("request");
const StaffAccount = require("../models/staff_accounts");
const MedicalReports = require("../models/medical_reports");
const PatientRecords = require("../models/patient_records");
const Patient = require("../models/patient");
const Doctor = require("../models/doctor");
const path = require("path");

router.get("/getPatientList", (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  let patient_list_raw = fs.readFileSync(path.join(__dirname, "../temp_data/patient_list.json"));
  let patient_list = JSON.parse(patient_list_raw);
  res.send(patient_list);
});

router.get("/getPatientImageFileNames/:patient_id", (req, res, next) => {
  var patient_id = req.params.patient_id;

  var filelist = fs.readdirSync(path.join(__dirname, "../temp_data/braintumor_image_dataset/" + patient_id));
  res.send(filelist);
  //res.sendFile(__dirname + "/temp_data/braintumor_image_dataset/" + patient_id + "/" + filelist[0]);

  //res.setHeader('Content-Type', 'image/PNG');
});

router.get("/getImageFile/:patient_id/:file_name", (req, res, next) => {
  var patient_id = req.params.patient_id;
  var file_name = req.params.file_name;
  res.sendFile(path.join(__dirname, "../temp_data/braintumor_image_dataset/" + patient_id + '/' + file_name));
});

router.get("/getSegmentation/:patient_id/:file_name", (req, res, next) => {
  var patient_id = req.params.patient_id;
  var file_name = req.params.file_name;
  var file_name_wo_extension = file_name.split(".").slice(0, -1).join(".");

  var options = {
    method: "POST",
    url: "http://127.0.0.1:5000/predictImage?file",
    //url: "http://it3100-180512b-ai-diagnosis-project.southeastasia.azurecontainer.io/predictImage?file",
    encoding: null,
    headers: {},
    formData: {
      file: {
        value: fs.createReadStream(path.join(__dirname ,"../temp_data/braintumor_dataset/" + patient_id + "/" + file_name_wo_extension + ".npy")),
        options: {
          filename: file_name,
          contentType: null,
        },
      },
    },
  };

  request(options, function (error, response) {
    if (error) throw new Error(error);

    let image = new Buffer.from(response.body, "base64url");
    res.header("Content-Type", "image/PNG");
    res.status(200);
    res.send(image);
    //res.send(response.body);
  });
});

router.get("/getOverlaySegmentation/:patient_id/:file_name", (req, res, next) => {
  var patient_id = req.params.patient_id;
  var file_name = req.params.file_name;
  var file_name_wo_extension = file_name.split(".").slice(0, -1).join(".");

  var options = {
    method: "POST",
    url: "http://127.0.0.1:5000/predictImageWithOverlay?file",
    //url: "http://it3100-180512b-ai-diagnosis-project.southeastasia.azurecontainer.io/predictImageWithOverlay?file",
    encoding: null,
    headers: {},
    formData: {
      file: {
        value: fs.createReadStream(path.join(__dirname, "../temp_data/braintumor_dataset/" + patient_id + "/" + file_name_wo_extension + ".npy")),
        options: {
          filename: file_name,
          contentType: null,
        },
      },
    },
  };

  request(options, function (error, response) {
    if (error) throw new Error(error);

    let image = new Buffer.from(response.body, "base64url");
    res.header("Content-Type", "image/PNG");
    res.status(200);
    res.send(image);
    //res.send(response.body);
  });
});

router.get("/getCaseData/:patient_id", (req, res, next) => {
  var patient_id = req.params.patient_id;

  res.setHeader("Content-Type", "application/json");
  let patient_list_raw = fs.readFileSync(path.join(__dirname, "../temp_data/patient_list_sort_with_id.json"));
  let patient_list = JSON.parse(patient_list_raw);
  res.send(patient_list[patient_id]);
});

router.get("/getReportList", (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  let report_list_raw = fs.readFileSync(path.join(__dirname, "../temp_data/report_list.json"));
  let report_list = JSON.parse(report_list_raw);
  res.send(report_list);
});

router.post("/addNewReport", (req, res, next) => {
  //console.log(req.header('Content-Type'));
  //console.log(req.body);

  fs.readFile(path.join(__dirname, "../temp_data/report_list.json"), function (err, data) {
    var json = JSON.parse(data);
    json.push(req.body);
    
    fs.writeFile(path.join(__dirname, "../temp_data/report_list.json"), JSON.stringify(json, null, 4), (err) => {
      if (err) {
        console.log(err);
      }
    });
    
  });
  res.send("finish");
});

router.get("/testenv", (req, res, next) => {
  StaffAccount.find()
  .then((result) => {
    res.send(result);
  }).catch((err) => console.log(err));
});

router.get("/testadd", (req, res, ntext) => {
  const newAccount = new StaffAccount({
    login_id: "admin",
    password: "12345",
  });

  newAccount.save()
  .then((result) => {
    res.send(result)
  })
  .catch((err) => console.log(err));
});

router.get("/get", (req, res, next) => {
/*
  PatientRecords.find()
  .then((result) => {
    res.send(result)
  })
  .catch((err) => console.log(err));*/
  res.send(path.join(__dirname, "../") + "/temp");
});

module.exports = router;
