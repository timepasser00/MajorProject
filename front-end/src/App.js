import './App.css';
import {Routes,Route} from 'react-router-dom'
import './pages/RegistrationForm'
import RegistrationForm from './pages/RegistrationForm';
import PatientDetails from './pages/PatientDetails';
import { BrowserRouter } from "react-router-dom";
import Header from './components/prescription/Header';
import Prescription from './components/prescription/Prescription';
import Home from './pages/home/Home';
import MainAdminPage from './components/mainAdminPage/MainAdminPage';
import RegistrationRequest from './components/registerationRequest/RegistrationRequest';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
        <Routes>
          <Route
          path="/"
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
             <PatientDetails/>
            </>
          }
          />
           <Route
          path="/test"
          element={
            <>
             {/* <Prescription/> */}
             <Home/>
            </>
          }
          
          />
           <Route
          path="/test1"
          element={
            <>
             {/* <Prescription/> */}
             <MainAdminPage/>
            </>
          }
          
          />
           <Route
          path="/test2"
          element={
            <>
             {/* <Prescription/> */}
            <RegistrationRequest/>
            </>
          }
          
          />
          
        </Routes>
        </BrowserRouter>
      
    </div>
  );
}

export default App;
