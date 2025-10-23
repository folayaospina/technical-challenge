import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PatientList from "./pages/PatientList";
import CreatePatient from "./pages/CreatePatient";
import CreateProvider from "./pages/CreateProvider";
import PatientDetail from "./pages/PatientDetail";
import { Header } from "./components/Header";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <Routes>
          <Route path="/" element={<PatientList />} />
          <Route path="/create-patient" element={<CreatePatient />} />
          <Route path="/create-provider" element={<CreateProvider />} />
          <Route path="/patient/:id" element={<PatientDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
