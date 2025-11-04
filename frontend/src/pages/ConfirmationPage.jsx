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
        <Container className="my-5 text-center">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <h1 className="mb-4" style={{ fontSize: "2.5rem", fontWeight: 'bold' }}>
                        Takk for din innsending!
                    </h1>
                    
                    <p className="mb-4">
                        Saken din er sendt inn. Under ligger det et sammendrag av det du sendte inn.
                    </p>
                    <p className="mb-5">
                        Du vil motta en bekreftelses-e-post dersom du fylte det ut. Følgende e-post fylt ut:
                        <br />
                        <a href={`mailto:${email}`} style={{ fontWeight: "bold", textDecoration: 'underline' }}>
                            {email}
                        </a>
                    </p>

                    <div className="d-flex justify-content-center gap-3">
                        {/*<Button variant="outline-dark" onClick={() => navigate('/')}>
                            Gå tilbake til hjem
                         </Button> */}
                        <Button variant="dark" onClick={() => navigate("/")}>
                            Gå tilbake til fix
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}