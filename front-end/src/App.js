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

function App() {
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
            path="/test2"
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
          <Route path="/lab/:id" element={<Lab/>} />
          <Route path="/labs" element={<LabList/>} />
          <Route path="/insuranceCompanyDetailsForm" element ={<InsuranceCompanyDetailsForm/>}/>
          <Route path="/insuranceCompany/:id" element={<InsuranceCompany/>}/>
          <Route path="/insuranceCompanies" element={<InsuranceCompanyList/>}/>
          <Route path="/doctor/:id" element={<Doctor/>}/>
          <Route path="/labTech/:id" element={<LabTech/>}/>
          <Route path="/labTech/genrateReport" element={<LabReportGenerator/>}/>
          <Route path="/labTech/report" element={<LabReport/>}/>

          {/* <Route path="/*" element={<h1>404 Not Found</h1>} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
