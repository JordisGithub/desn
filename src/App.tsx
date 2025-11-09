import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { LanguageProvider } from "./contexts/LanguageContext";
import AriaAnnouncer from "./components/AriaAnnouncer";
import Home from "./views/Home";
import About from "./views/About";
import Box from "@mui/material/Box";

export default function App() {
  return (
    <AriaAnnouncer>
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
              {/* Add more routes here as pages are created */}
              <Route
                path='/programs'
                element={<div>Programs page coming soon</div>}
              />
              <Route
                path='/get-involved'
                element={<div>Get Involved page coming soon</div>}
              />
              <Route
                path='/donate'
                element={<div>Donate page coming soon</div>}
              />
            </Routes>
          </Box>
        </Router>
      </LanguageProvider>
    </AriaAnnouncer>
  );
}
