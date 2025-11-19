import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import FeaturedIssueCard from "./FeaturedIssueCard";


export default function HeroSection({ featured }) {
    return (
      <Container className="hero-text-container mx-auto" style={{marginTop: "150px"}}>
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

      </Container>
    );
  }