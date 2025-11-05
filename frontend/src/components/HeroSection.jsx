import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import FeaturedIssueCard from "./FeaturedIssueCard";


export default function HeroSection({ featured }) {
    return (
      <Container className="hero-text-container mx-auto">
        {/* Velkomstseksjonen */}
        <Row>
          <Col>
            <h1>Velkommen til Fix!</h1>
            <p>
              Her kan du sende inn issue som du vil bli fikset! Trykk på "Send inn issue" for å bli videreført til skjema-siden.
              Under vil du se en oversikt over alle tidligere innsendte saker.
            </p>
            
            {/* Send inn issue og Les mer knapper under velkomstseksjon */}
            <div className="d-flex justify-content-center my-4">
              <Link to="/report" className="btn me-2" style={{backgroundColor: "#092444", color: "#ffffff", borderRadius: "8px", padding: "1.1rem", paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>
                Send inn issue
              </Link>
              <Button className="btn me-2" style={{backgroundColor: "#ffffff", color: "#092444", borderRadius: "8px", padding: "1.1rem", paddingLeft: "3.5rem", paddingRight: "3.5rem" }} variant="outline-dark">
                Les mer
              </Button>
            </div>
          </Col>
        </Row>

        {/* Deler pagen med en linje */}
        <div className="content-divider my-5"></div>
  
        {/* Seksjonen for fremhevet sak */}
        <Row className="">
          <Col>
            {/* Placeholder-bilde eller den fremhevede saken
            <div className="d-flex justify-content-center my-4">
              {featured ? (
                <FeaturedIssueCard issue={featured} />
              ) : (
                <div style={{ width: '400px', height: '200px', backgroundColor: "#e9ecef", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '5rem', color: '#6c757d' }}>&#x2613;</span>
                </div>
              )}
            </div> */}
            <h2 className="mt-5 mb-4">Alle saker vil bli fremhevet her</h2>
            <p>
              Her vil du kunne se alle tidligere saker som er blitt sendt inn av andre testere.
            </p>
            
            {/* Knapp under placeholder-bildet */}
            <Link to="/report" className="btn mt-3" 
            style={{backgroundColor: "#092444", color: "#ffffff", borderRadius: "8px", padding: "1.1rem", paddingLeft: "2.5rem", paddingRight: "2.5rem", marginBottom: "25px" }}>
              Send inn issue
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }