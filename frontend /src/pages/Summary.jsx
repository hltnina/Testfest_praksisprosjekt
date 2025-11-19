// src/pages/Summary.jsx

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
// Importer dataene fra ReportPage for å vise riktig info
import { categories } from './ReportPage.jsx'; 
import axios from "axios";


export default function Summary() {
    const navigate = useNavigate();
    
    // Bruk useLocation for å hente state (formData) fra ReportPage
    const location = useLocation();
    const { formData } = location.state || { formData: {} };
    
    // Sikkerhetssjekk: Hvis ingen data, gå hjem
    if (!formData || Object.keys(formData).length === 0) {
        navigate('/');
        return null;
    }
    
    const handleConfirm = async () => {
        console.log("Sender skjema til API:", formData);
    
        try {
            // Send issue data to your Node.js backend
            const response = await axios.post("http://localhost:3000/issues", {
                title: formData.title || "Brukerinnsendt sak",
                body: `
    Beskrivelse:
    ${formData.description}
    
    Anbefalt handling:
    ${formData.expectedBehavior || "Ingen anbefaling oppgitt."}
    
    Avsender:
    ${formData.email || "Ikke oppgitt"}
                `
            });
    
            console.log("Issue created:", response.data);
    
            // Etter vellykket innsending, gå til confirmation-siden
            navigate('/confirmation', { state: { email: formData.email } });
    
        } catch (error) {
            console.error("Feil under innsending av sak:", error);
            alert("Noe gikk galt ved innsendingen. Prøv igjen senere.");
        }
    };

    return (
        <Container className="my-5" style={{paddingTop: "130px", paddingBottom: "155px"}}>
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    
                    <div className="text-center mb-5">
                        <h1>Oppsummering</h1>
                        <p className="text-muted">Nedenfor finner du detaljene i din innsendingen. Bekreft og send inn når alt ser riktig ut. Dersom noe må endres, trykk på endre skjema for å redigere. </p>
                    </div>
                    
                    {/* VISNING AV DATAENE (som i bildet) */}
                    
                    {/* 1. Tittel på sak 
                    <h4 className="mb-3">1. Tittel på sak</h4>
                    <p className="mb-4 p-2 border rounded">{formData.title || 'Ingen tittel'}</p>
                    */}
                    
                    {/* 1. Beskrivelse */}
                    <h4 className="mb-3">1. Beskrivelse*</h4>
                    <div className="mb-4 p-2 border rounded bg-white" style={{ whiteSpace: 'pre-wrap' }}>
                        {formData.description || "Ingen beskrivelse"}
                    </div>

                    {/* 2. Anbefalt ha */}
                    <h4 className="mb-3">2. Anbefalt handling</h4>
                    <div className="mb-5 p-2 border rounded bg-white" style={{ whiteSpace: 'pre-wrap' }}>
                        {formData.expectedBehavior || "Ikke fylt ut."}
                    </div>

                    {/* 3. E-postaddresse */}
                    <h4 className="mb-3">3. E-postaddresse</h4>
                    <div className="mb-5 p-2 border rounded bg-white" style={{ whiteSpace: 'pre-wrap' }}>
                        {formData.email || "Ikke fylt ut."}
                    </div>

                    {/* Knapper for bekreftelse/tilbake */}
                    <div className="d-flex justify-content-between">
                        <Button 
                            variant="outline-dark" 
                            onClick={() => navigate("/report", { state: { formData: formData } })} // Tilbake til redigering
                            style={{backgroundColor: "#ffffff", color: "#092444", padding: "0.8rem", paddingLeft: "2.3rem", paddingRight: "2.3rem"}} 
                        >
                            Endre skjema
                        </Button>
                        <Button 
                            variant="dark" 
                            onClick={handleConfirm}
                            style={{backgroundColor: "#092444", paddingLeft: "2rem", paddingRight: "2rem"}}
                        >
                            Bekreft og send inn
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}