// src/App.jsx

// Nødvendige importerte komponenter
// src/App.jsx
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ReportPage from "./pages/ReportPage";
import Footer from "./components/Footer";
import Summary from "./pages/Summary";
import ConfirmationPage from "./pages/ConfirmationPage";
import api from "./services/api"; // axios med withCredentials
import "./App.css"; 

// Her skal kun komponenter som trengs importeres her. Resten av innholdet plasseres i HomePage.jsx


export default function App() {

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // sjekk om vi har gyldig JWT-cookie ved oppstart
    useEffect(() => {
        api.get("/auth/me") // endpoint som krever JWT
            .then(() => setIsLoggedIn(true))
            .catch(() => setIsLoggedIn(false));
    }, []);

   

    // Logout: sletter HttpOnly JWT-Cookie og sender bruker tilbake til login-siden
    const HandleLogOut = async () => {
        await api.post("/auth/logout"); // backend sletter cookie
        setIsLoggedIn(false);
        navigate("/login"); // naviger tilbake til login
    };

  return (
    // Toppnivå div
    <div>
      {/* Navigasjonsbar (vises på alle sider) */}
      <Navbar className="app-header">
        <Container>
          {/* Logo/Brand */}
          <Navbar.Brand href="/">TestFest</Navbar.Brand> 
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            </Nav>

                      {/* vis KUN "logg ut" hvis bruker er inne (JWT-cookie eksisterer) */ }
                      {isLoggedIn && (
                          <Button variant="dark" onClick={HandleLogOut}>
                              Logg ut
                          </Button>
                      )}

                      {/* Vis "Register / Login " hvis bruker IKKE er inne */ }
                      {!isLoggedIn && ( 
                                    <>  
                                <Button className="Login-button" variant="dark" onClick={() =>
                                    window.location.href="/login"}>Login</Button>
                            </>
                      )}
            <Nav>
            
              {/* Login knapper på høyre siden */}
              <Button className="Login-button" variant="dark">Login</Button>

                      {/* Vis KUN "logg ut" hvis bruker er inne (JWT-cookie eksisterer) */ }
                      {isLoggedIn && (
                          <Button variant="dark" onClick={HandleLogOut}>
                              Logg ut
                          </Button>
                      )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      {/* Routing (bestemmer hvilket sideinnhold som vises) */}
      <Routes>
        {/* '/' er startsiden og vil vise innholdet fra HomePage */}
        <Route path="/" element={<HomePage />} /> 
        <Route path="/report" element={<ReportPage />} /> 
        <Route path="/summary" element={<Summary />} /> 
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
      
      {/* Footer (vises på alle sider) */}
      <Footer className="app-footer"/>

    </div>
  );
}