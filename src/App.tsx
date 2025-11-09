import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import AriaAnnouncer from "./components/AriaAnnouncer";
import Home from "./views/Home";
import About from "./views/About";
import GetInvolved from "./views/GetInvolved";
import Login from "./views/Login";
import Register from "./views/Register";
import AdminDashboard from "./views/AdminDashboard";
import PaymentVerify from "./views/PaymentVerify";
import AccessibilityStatement from "./views/AccessibilityStatement";
import Box from "@mui/material/Box";

export default function App() {
  return (
    <AriaAnnouncer>
      <AuthProvider>
        <LanguageProvider>
          <Router>
            <Box
              sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Header />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/get-involved' element={<GetInvolved />} />
                <Route
                  path='/accessibility'
                  element={<AccessibilityStatement />}
                />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/admin/dashboard' element={<AdminDashboard />} />
                <Route path='/payment/verify' element={<PaymentVerify />} />
                {/* Add more routes here as pages are created */}
                <Route
                  path='/programs'
                  element={<div>Programs page coming soon</div>}
                />
                <Route
                  path='/donate'
                  element={<div>Donate page coming soon</div>}
                />
              </Routes>
            </Box>
          </Router>
        </LanguageProvider>
      </AuthProvider>
    </AriaAnnouncer>
  );
}
