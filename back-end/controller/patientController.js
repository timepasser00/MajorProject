const Patient = require("../models/patient");
const mongoose = require("mongoose");
const Hospital = require("../models/hospital");
const Doctor = require("../models/doctor");
const Lab = require("../models/lab");

const registerDetails = async (req, res) => {
  const { firstName, lastName, email, walletAddress, age } = req.body;
  console.log(firstName, lastName, email, walletAddress, age);
  try {
    const patient = await Patient.create({
      firstName,
      lastName,
      age,
      walletAddress,
      email,
    });
    res.status(200).json({ patient });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
const getDetails = async (req, res) => {
  const { walletAddress } = req.body;
  console.log("walletAddress", walletAddress);
  try {
    const patient = await Patient.find({ walletAddress: walletAddress });
    console.log(patient);
    res.status(200).json({ patient });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
// const searchPatient = async (req, res) => {
//     const {query} = req.params;
//     console.log("query",query);
//     try {
//       const hospital=await Hospital.find({
//         $or: [
//           { name: { $regex: query, $options: "i" } },
//           { address: { $regex: query, $options: "i" } },
//           { city: { $regex: query, $options: "i" } },
//           { state: { $regex: query, $options: "i" } },
//           { country: { $regex: query, $options: "i" } },
//           { pincode: { $regex: query, $options: "i" } },
//         ],

//       });
//       res.status(200).json({ hospital });
//     } catch (err) {
//       res.status(400).json({ err: err.message });
//     }
//   };
const searchHospital = async (req, res) => {
  const { query } = req.params;
  console.log("query", query);
  try {
    const searchRegex = new RegExp(query, "i");
    const hospital = await Hospital.find({
      $or: [
        { name: searchRegex },
        // { address:  searchRegex  },
        // { city:  searchRegex  },
        // { state:  searchRegex  },
        // { country:  searchRegex  },
        // { pincode: searchRegex  },
        { "address.state": searchRegex },
        { contact: searchRegex },
      ],
    });
    res.status(200).json(hospital);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const searchHospitalForAppointment = async (req, res) => {
  const { searchType, searchText } = req.body;
  console.log("searchType", searchType);
  console.log("searchText", searchText);
  try {
    const searchRegex = new RegExp(searchText, "i");
    if (searchType === "hospital") {
      const hospitalList = await Hospital.find({
        $or: [
          { name: searchRegex },
          // { address:  searchRegex  },
          // { city:  searchRegex  },
          // { state:  searchRegex  },
          // { country:  searchRegex  },
          // { pincode: searchRegex  },
          { "address.state": searchRegex },
          { contact: searchRegex },
        ],
      });
      res.status(200).json(hospitalList);
      //   const hospital=await Hospital.find({
      //     name:  searchRegex
      //   });
      //   res.status(200).json( hospital );
      // }
      // else if(searchType==="state"){
      //   const hospital=await Hospital.find({
      //     'address.state':searchRegex
      //   });
      //   res.status(200).json( hospital );
      // }
      // else if(searchType==="contact"){
      //   const hospital=await Hospital.find({
      //     contact:searchRegex
      //   });
      //   res.status(200).json( hospital );
    } else if (searchType === "doctor") {
      const hospital = await Doctor.find({
        firstName: searchRegex,
      }).populate("hospital");
      const hospitalList = hospital.map((item) => {
        return item.hospital;
      });
      res.status(200).json(hospitalList);
    }
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const getAvailableSlots = async (req, res) => {
  const { doctorId } = req.params; //doctor id
  const date=req.body;
  try {
    const doctor = await Doctor.findById(doctorId);
    console.log("doctor", doctor);
    if (!doctor) {
      res.status(400).json({ err: "Doctor not found" });
    }
    const docAppointments = doctor.appointments;
    console.log("docAppointments", docAppointments);
    const appointments = docAppointments.filter(appointment => {
      // console.log("appointment.date", new Date(appointment.date));
      // console.log('date',new Date(date.date))

      return new Date(appointment.date).toString() === new Date(date.date).toString();
    });
    console.log("appointments", appointments);

    const availableSlots = [];
    for (let i = 9; i < 17; i++) {
      for (let j = 0; j < 4; j++) {
        let minutes = j * 15;
        let startHour = i;
        let startMinutes = minutes;
        if (minutes === 60) {
          startHour += 1;
          startMinutes = 0;
        }
        let startTime = `${startHour}:${startMinutes
          .toString()
          .padStart(2, "0")}`;
        let endHour = i;
        let endMinutes = minutes + 15;
        if (endMinutes === 60) {
          endHour += 1;
          endMinutes = 0;
        }
        let endTime = `${endHour}:${endMinutes.toString().padStart(2, "0")}`;
        let isSlotAvailable = true;
        appointments.forEach((appointment) => {
          if (
            appointment.startTime === startTime &&
            appointment.endTime === endTime
          ) {
            isSlotAvailable = false;
          }
        });
        if (isSlotAvailable) {
          availableSlots.push({ startTime, endTime });
        }
      }
    }
    res.status(200).json(availableSlots);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
const bookAppointment = async (req, res) => {
  const { doctorId } = req.params; //doctor id
  console.log("doctorId", doctorId);

  const {date,startTime,endTime,patientId}=req.body;
  try {
    const doctor = await Doctor.findById(doctorId);
    // console.log("doctor from book apointemet", doctor);
    console.log(date,"date",startTime,"startTime",endTime,"endTime",patientId,"patientId")
    if (!doctor) {
      res.status(400).json({ err: "Doctor not found" });
    }
    doctor.appointments.push({
      date,
      startTime,
      endTime,
      patient:patientId,
    });
    await doctor.save();
    res.status(200).json({ msg: "Appointment booked" });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const approveDoctor = async (req, res) => {
  const { doctorId,patientId } = req.body

  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      res.status(400).json({ err: "Doctor not found" });
    }
    const patient= await Patient.findById(patientId);
    if (!patient) {
      res.status(400).json({ err: "Patient not found" });
    }
    patient.approvedDoctors.push(doctorId);
    await patient.save();
    res.status(200).json({ msg: "Doctor approved" });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};


const getApprovedDoctors = async (req, res) => {
  const { patientId } = req.params;
  try {
    // const patient=await Patient.find({_id:patientId}).populate("approvedDoctors");
    const patient= await Patient.findById(patientId);
    if (!patient) {
      res.status(400).json({ err: "Patient not found" });
    }
    let approvedDoctorsDetails=[];
    const approvedDoctors=patient.approvedDoctors;
    for(let i=0;i<approvedDoctors.length;i++){
      const doctor=await Doctor.findById(approvedDoctors[i]);

      approvedDoctorsDetails.push(doctor);
    }
    res.status(200).json(approvedDoctorsDetails);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const approveLabs = async (req, res) => {
  const { labId,patientId } = req.body
  try{
     const lab=await Lab.findById(labId);
      if(!lab){
        res.status(400).json({err:"Lab not found"});
      }
      const patient=await Patient.findById(patientId);
      if(!patient){
        res.status(400).json({err:"Patient not found"});
      }
      patient.approvedLabs.push(labId);
      await patient.save();
      res.status(200).json({msg:"Lab approved"});
  }catch(err){
    res.status(400).json({err:err.message}); 

  }

}
const getApprovedLabs = async (req, res) => {
  const { patientId } = req.params;
  console.log("patientId",patientId);
  try {
    const patient= await Patient.findById(patientId);
    console.log("patient",patient);
      if(!patient){
        res.status(400).json({err:"Patient not found"});
      }
      let approvedLabsDetails=[];
      const approvedLabs=patient.approvedLabs;
      console.log("approvedLabs",approvedLabs);
      for(let i=0;i<approvedLabs.length;i++){
        const lab=await Lab.findById(approvedLabs[i]);
        approvedLabsDetails.push(lab);
      }
      res.status(200).json(approvedLabsDetails);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};


module.exports = {
  registerDetails,
  getDetails,

  searchHospital,
  searchHospitalForAppointment,
  getAvailableSlots,
  bookAppointment,
  getApprovedDoctors,
  approveDoctor,
  getApprovedLabs,
  approveLabs
};
