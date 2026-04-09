import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./components/ProtectedRoute"
import { AuthProvider } from './context/AuthContext';
import AppLayout from './layouts/AppLayout';


const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
          <Route
            path="/app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>} 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
