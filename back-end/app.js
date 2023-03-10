const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const homeRouter = require("./routes/home");
const patientRouter = require("./routes/patients");
const mongoose = require("mongoose"); 
const hospitalRouter = require("./routes/hospital");
const adminRouter = require("./routes/admin");
const Web3 = require("web3"); 
const contract = require("@truffle/contract");
const artifacts = require("../build/contracts/base.json");
const CONTACT_ABI = require("./config");
const CONTACT_ADDRESS = require("./config");
const doctorRouter = require("./routes/doctor");
const labRouter = require("./routes/lab");  
const labTechRouter = require("./routes/labTech"); 
const insuranceCompanyRouter = require("./routes/insuranceCompany");  

      
const app = express();  
app.use(cors()); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



const port = 3001;  
  
if (typeof web3 !== "undefined") {
  var web3 = new Web3(web3.currentProvider);   
} else {
  var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
}

app.use("/home", homeRouter);
app.use("/patient", patientRouter);
app.use("/hospital", hospitalRouter);
app.use("/admin", adminRouter);
app.use("/doctor", doctorRouter);
app.use("/lab", labRouter);
app.use("/labTech", labTechRouter);
app.use("/insuranceCompany", insuranceCompanyRouter);

mongoose
  .connect("mongodb://localhost:27017/major-project", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to database");
    // listen to port
    app.listen(4000, () => {
      console.log("listening for requests on port");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
