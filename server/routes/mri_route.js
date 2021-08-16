const express = require("express");
const router = express.Router();
const fs = require("fs");
const request = require("request");
const MedicalReports = require("../models/medical_reports");
const PatientRecords = require("../models/patient_records");
const path = require("path");
const auth = require("../middleware/auth");

router.get("/getPatientList", auth, (req, res, next) => {
  // local retrieve

  // res.setHeader("Content-Type", "application/json");
  // let patient_list_raw = fs.readFileSync(path.join(__dirname, "../temp_data/patient_list.json"));
  // let patient_list = JSON.parse(patient_list_raw);
  // res.send(patient_list);

  //db retrieve
  PatientRecords.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
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
  res.sendFile(path.join(__dirname, "../temp_data/braintumor_image_dataset/" + patient_id + "/" + file_name));
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

  // retrieve data from local json

  // res.setHeader("Content-Type", "application/json");
  // let patient_list_raw = fs.readFileSync(path.join(__dirname, "../temp_data/patient_list_sort_with_id.json"));
  // let patient_list = JSON.parse(patient_list_raw);
  // res.send(patient_list[patient_id]);

  //retrieve data from mongodb in cloud

  PatientRecords.findOne({ patient_id: patient_id })
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

router.get("/getReportList", (req, res, next) => {
  // retrieve from local json

  // res.setHeader("Content-Type", "application/json");
  // let report_list_raw = fs.readFileSync(path.join(__dirname, "../temp_data/report_list.json"));
  // let report_list = JSON.parse(report_list_raw);
  // res.send(report_list);

  // retrieve from mongodb on cloud

  MedicalReports.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

router.get("/getReport/:patient_id", (req, res, next) => {
  var patient_id = req.params.patient_id;

  // retrieve from mongodb on cloud
  MedicalReports.findOne({ patient_id: patient_id })
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
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

  const newMedicalReport = new MedicalReports({
    patient_id: req.body.patient_id,
    patient_name: req.body.patient_name,
    NRIC: req.body.NRIC,
    height: req.body.height,
    weight: req.body.weight,
    blood_type: req.body.blood_type,
    race: req.body.race,
    allergies: req.body.allergies,
    medical_history: req.body.medical_history,
    priority: req.body.priority,
    date: req.body.date,
    doctor_name: req.body.doctor_name,
    doctor_email: req.body.doctor_email,
    doctor_contact: req.body.doctor_contact,
    medical_image: req.body.medical_image,
    tumor_type: req.body.tumor_type,
    findings: req.body.findings,
    treatment: req.body.treatment,
  });

  newMedicalReport
    .save()
    .then((result) => {
      console.log(result);

      PatientRecords.deleteOne({ patient_id: req.body.patient_id })
        .then((result) => {})
        .catch((err) => console.log(err));
      res.send("finish");
    })
    .catch((err) => console.log(err));
});

/*
router.get("/newacc", (req, res, next) => {

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      const newStaffaccount = new StaffAccount({
        login_id: "edwardjenner",
        password: hash,
        salt: salt,
      });
    
      newStaffaccount
        .save()
        .then((result) => {
          console.log(result);
          res.send("finish");
        })
        .catch((err) => console.log(err));
    });
  });
});*/

module.exports = router;
