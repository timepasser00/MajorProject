import "./App.css";
import { Routes, Route } from "react-router-dom";
import "./pages/RegistrationForm";
import RegistrationForm from "./pages/RegistrationForm";
import PatientDetails from "./pages/PatientDetails";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/prescription/Header";
import Prescription from "./components/prescription/Prescription";
import Home from "./pages/home/Home";
import MainAdminPage from "./components/mainAdminPage/MainAdminPage";
import RegistrationRequest from "./components/registerationRequest/RegistrationRequest";
import HospitalList from "./pages/hospitalList/HospitalList";
import PrescriptionGenerator from "./pages/prescriptionGenerator/PrescriptionGenerator";
import RequestForm from "./pages/requestFrom/RequestForm";
import Hospital from "./pages/hospital/Hospital";
import BookAppointmentForm from "./components/bookAppointmentForm/BookAppointmentForm";
import Appointment from "./pages/appointment/Appointment";
import Patient from "./pages/patient/Patient";
import Lab from "./pages/lab/Lab";
import LabList from "./pages/labList/LabList";
import InsuranceCompanyDetailsForm from "./pages/insuranceCompanyDetailsForm/InsuranceCompanyDetailsForm";
import InsuranceCompany from "./pages/insuranceCompany/InsuranceCompany";
import InsuranceCompanyList from "./pages/insuranceCompanyList/InsuranceCompanyList";
import Doctor from "./pages/doctor/Doctor";
import LabTech from "./pages/labTech/LabTech";
import LabReportGenerator from "./pages/labReportGenerator/LabReportGenerator";
import LabReport from "./pages/labReport/LabReport";
import UserGuide from "./pages/userGuide/UserGuide";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assignWalletAddress } from "./redux/actions/patientActions";

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [id, setId] = useState("");
  const tempwallet = useSelector((state) => state.walletAddress);
  const dispatch = useDispatch();
  const [userType, setUserType] = useState("");
  useEffect(() => {
    // e.preventDefault();
    const metaCheck = async () => {
      if (window.ethereum) {
        console.log("metaCheck");
        try {
          const curr_accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });

          await Promise.resolve(curr_accounts);
          let twallet = await curr_accounts[0];
          setWalletAddress(curr_accounts[0]);
          console.log("walletAddress :: ", walletAddress);
          // dispatch({type: "SET_WALLET_ADDRESS", payload: walletAddress});
          // dispatch(assignWalletAddress(walletAddress));
          // const Info = {
          //   walletAddress: walletAddress,
          //  category: "Patient"
          // }

          // dispatch(assignWalletAddress(Info));
          console.log("twallet :: ", twallet);
          fetchUserType(twallet);
        } catch (error) {
          console.log("Error connecting ..");
        }
      } else {
        console.log("not detected");
      }
    };
    metaCheck();

    const fetchUserType = async (twallet) => {
      fetch(`http://localhost:3001/home/findUserType`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletAddress: twallet,
        }),
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else if (res.status === 404) {
            alert(" error here1");
          }
        })
        .then((data) => {
          console.log(data, "data");
          setUserType(data.category);
          const Info = {
            walletAddress: twallet,
            category: data.category,
          };
          dispatch(assignWalletAddress(Info));

          // setInsuranceCompanyList(data.insuranceCompany);
        });
    };
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/home"
            element={
              <>
                <Home />
              </>
            }
          />
          <Route
            path="/userGuide"
            element={
              <>
                <UserGuide />
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Home />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <RegistrationForm />
              </>
            }
          />
          <Route
            path="/patientDetails"
            element={
              <>
                <PatientDetails />
              </>
            }
          />
          <Route
            path="/requestForm"
            element={
              <>
                <RequestForm />
              </>
            }
          />
          {/* <Route
            path="/home"
            element={
              <>
                <Prescription />
                <Home/>
              </>
            }
          /> */}
          <Route
            path="/admin"
            element={
              <>
                {/* <Prescription/> */}
                <MainAdminPage />
              </>
            }
          />
          <Route
            path="/te"
            element={
              <>
                {/* <Prescription/> */}
                <RegistrationRequest />
              </>
            }
          />
          <Route path="/hospitals" element={<HospitalList />} />
          <Route
            path="/doctor/prescription"
            element={<PrescriptionGenerator />}
          />
          <Route path="/hospital/:id" element={<Hospital />} />
          <Route path="/test3" element={<BookAppointmentForm />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/patient/:id" element={<Patient />} />
          <Route path="/lab/:id" element={<Lab />} />
          <Route path="/labs" element={<LabList />} />
          <Route
            path="/insuranceCompanyDetailsForm"
            element={<InsuranceCompanyDetailsForm />}
          />
          <Route path="/insuranceCompany/:id" element={<InsuranceCompany />} />
          <Route
            path="/insuranceCompanies"
            element={<InsuranceCompanyList />}
          />
          <Route path="/doctor/:id" element={<Doctor />} />
          <Route path="/labTech/:id" element={<LabTech />} />
          <Route
            path="/labTech/genrateReport"
            element={<LabReportGenerator />}
          />
          <Route path="/labTech/report" element={<LabReport />} />

          {/* <Route path="/*" element={<h1>404 Not Found</h1>} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
