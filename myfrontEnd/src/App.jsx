import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Use BrowserRouter
import AddUserForm from './components/createUser';
import Login from './components/login';
import AuthProvider from "./service/authservice";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/add-user" element={<AddUserForm />} />

          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
