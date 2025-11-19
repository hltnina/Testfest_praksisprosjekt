// src/pages/Confirmation.jsx

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function Confirmation() {
    const navigate = useNavigate();
    
    // Henter e-posten fra location-staten
    const location = useLocation();
    const { email } = location.state || { email: "Ingen e-post funnet" };

    return (
        <Container className="confirmation-container my-5 text-center" style={{justifyContent: "center"}}>
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <h1 className="mb-4" style={{ fontSize: "2.5rem", fontWeight: 'bold' }}>
                        Takk for din innsending!
                    </h1>
                    
                    <p className="mb-4 fs-5">
                        Saken din er sendt inn. Under ligger det et sammendrag av det du sendte inn.
                    </p>
                    <p className="mb-5 fs-5">
                        Du vil motta en bekreftelses på mail dersom du fylte det ut. Følgende e-post er fylt ut:
                        <br />
                        <a href={`mailto:${email}`} style={{ fontWeight: "bold", textDecoration: 'underline' }}>
                            {email}
                        </a>
                    </p>

                    <div className="d-flex justify-content-center gap-3">
                        {/*<Button variant="outline-dark" onClick={() => navigate('/')}>
                            Gå tilbake til hjem
                         </Button> */}
                        <Button onClick={() => navigate("/")} style={{backgroundColor: "#092444", color: "#ffffff", borderRadius: "8px", padding: "1.1rem", paddingLeft: "2.5rem", paddingRight: "2.5rem", marginBottom: "25px" }}>
                            Gå tilbake til fix
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}