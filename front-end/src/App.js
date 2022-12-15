import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './pages/RegistrationForm'
import RegistrationForm from './pages/RegistrationForm';

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
