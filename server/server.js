const express = require("express");
var request = require("request");
var cors = require("cors");
var fs = require("fs");
const { response } = require("express");

const app = express();

const hostname = "127.0.0.1";
const port = 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.get("/test1", (req, res, next) => {
  res.json(["a", "b", "c", "d", "e"]);
});

app.get("/getPatientList", (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  let patient_list_raw = fs.readFileSync("temp_data/patient_list.json");
  let patient_list = JSON.parse(patient_list_raw);
  res.send(patient_list);
});

app.get("/getPatientImageFileNames/:patient_id", (req, res, next) => {
  var patient_id = req.params.patient_id;

  var filelist = fs.readdirSync("./temp_data/braintumor_image_dataset/" + patient_id);
  res.send(filelist);
  //res.sendFile(__dirname + "/temp_data/braintumor_image_dataset/" + patient_id + "/" + filelist[0]);

  //res.setHeader('Content-Type', 'image/PNG');
  
 
});

app.get("/getImageFile/:patient_id/:file_name", (req, res, next) => {
  var patient_id = req.params.patient_id;
  var file_name = req.params.file_name;
  res.sendFile(__dirname + "/temp_data/braintumor_image_dataset/" + patient_id + "/" + file_name);
});

app.get("/getSegmentation/:patient_id/:file_name", (req, res, next) => {
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
        value: fs.createReadStream(__dirname + "/temp_data/braintumor_dataset/" + patient_id + "/" + file_name_wo_extension + ".npy"),
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

app.get("/getOverlaySegmentation/:patient_id/:file_name", (req, res, next) => {
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
        value: fs.createReadStream(__dirname + "/temp_data/braintumor_dataset/" + patient_id + "/" + file_name_wo_extension + ".npy"),
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

app.get("/getCaseData/:patient_id", (req, res, next) => {
  var patient_id = req.params.patient_id;

  res.setHeader("Content-Type", "application/json");
  let patient_list_raw = fs.readFileSync("temp_data/patient_list_sort_with_id.json");
  let patient_list = JSON.parse(patient_list_raw);
  res.send(patient_list[patient_id]);
});

app.get("/getReportList", (req, res, next) => {

  res.setHeader("Content-Type", "application/json");
  let report_list_raw = fs.readFileSync("temp_data/report_list.json");
  let report_list = JSON.parse(report_list_raw);
  res.send(report_list);
});

/*
app.get("/test2", (req, res, next) => {
  var filename = "dfffff.png";
  file_name = filename.split('.').slice(0, -1).join('.');
  res.send(file_name);
});*/

app.get("/test", (req, res, next) => {
  var options = {
    method: "POST",
    url: "http://127.0.0.1:5000/predictImage?file",
    encoding: null,
    headers: {},
    formData: {
      file: {
        value: fs.createReadStream("test.npy"),
        options: {
          filename: "test.npy",
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

app.post("/addNewReport", (req, res, next) => {
  //console.log(req.header('Content-Type'));
  //console.log(req.body);


  fs.readFile("temp_data/report_list.json", function (err, data) {
    var json = JSON.parse(data);
    json.push(req.body);
    
    fs.writeFile("temp_data/report_list.json", JSON.stringify(json, null, 4), (err)=>{
      if (err) {
        console.log(err);
      }
    });

  });
  res.send("finish");
});
