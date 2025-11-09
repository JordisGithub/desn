import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import AriaAnnouncer from "./components/AriaAnnouncer";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

// Lazy load route components for code splitting (40-60% bundle reduction)
const Home = lazy(() => import("./views/Home"));
const About = lazy(() => import("./views/About"));
const GetInvolved = lazy(() => import("./views/GetInvolved"));
const Events = lazy(() => import("./views/Events"));
const Resources = lazy(() => import("./views/Resources"));
const Contact = lazy(() => import("./views/Contact"));
const Programs = lazy(() => import("./views/Programs"));
const Login = lazy(() => import("./views/Login"));
const Register = lazy(() => import("./views/Register"));
const AdminDashboard = lazy(() => import("./views/AdminDashboard"));
const MemberDashboard = lazy(() => import("./views/MemberDashboard"));
const PaymentVerify = lazy(() => import("./views/PaymentVerify"));
const AccessibilityStatement = lazy(
  () => import("./views/AccessibilityStatement")
);

// Loading component
const LoadingFallback = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "60vh",
    }}
  >
    <CircularProgress />
  </Box>
);

export default function App() {
  return (
    <AriaAnnouncer>
      <AuthProvider>
        <LanguageProvider>
          <Router>
            <Layout>
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/about' element={<About />} />
                  <Route path='/get-involved' element={<GetInvolved />} />
                  <Route path='/events' element={<Events />} />
                  <Route path='/resources' element={<Resources />} />
                  <Route path='/contact' element={<Contact />} />
                  <Route path='/programs' element={<Programs />} />
                  <Route
                    path='/accessibility'
                    element={<AccessibilityStatement />}
                  />
                  <Route path='/login' element={<Login />} />
                  <Route path='/register' element={<Register />} />
                  <Route path='/admin/dashboard' element={<AdminDashboard />} />
                  <Route
                    path='/member/dashboard'
                    element={<MemberDashboard />}
                  />
                  <Route path='/payment/verify' element={<PaymentVerify />} />
                  {/* Add more routes here as pages are created */}
                  <Route
                    path='/donate'
                    element={<div>Donate page coming soon</div>}
                  />
                </Routes>
              </Suspense>
            </Layout>
          </Router>
        </LanguageProvider>
      </AuthProvider>
    </AriaAnnouncer>
  );
}
