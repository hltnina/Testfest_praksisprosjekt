// src/App.jsx

// Nødvendige importerte komponenter
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Navbar, Nav, Container, Button } from "react-bootstrap"; 
import "bootstrap/dist/css/bootstrap.min.css";
import ReportPage from "./pages/ReportPage"; 
import Footer from "./components/Footer";
import Summary from "./pages/Summary";
import ConfirmationPage from "./pages/ConfirmationPage";
// Her skal kun komponenter som trengs importeres her. Resten av innholdet plasseres i HomePage.jsx


export default function App() {
  return (
    // Toppnivå div
    <div>
      
      {/* Navigasjonsbar (vises på alle sider) */}
      <Navbar bg="light" expand="lg">
        <Container>
          {/* Logo/Brand */}
          <Navbar.Brand href="/">TestFest</Navbar.Brand> 
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            
            <Nav>
              {/* Registrer og Login knapper på høyre siden */}
              <Button variant="outline-dark" className="me-2">Register</Button>
              <Button variant="dark">Login</Button>
            </Nav>
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
      <Footer>

      </Footer>

    </div>
  );
}