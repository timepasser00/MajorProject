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
               <RequestForm/>
              </>
            }
          />
          <Route
            path="/home"
            element={
              <>
                <Prescription />
                {/* <Home/> */}
              </>
            }
          />
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
          <Route path = "/doctor/prescription" element = {<PrescriptionGenerator/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
