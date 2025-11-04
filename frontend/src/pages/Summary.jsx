// src/pages/Summary.jsx

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
// Importer dataene fra ReportPage for å vise riktig info
import { categories } from './ReportPage.jsx'; 


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
    
    // Funksjon for å fullføre innsendingen
    const handleConfirm = () => {
        console.log("Sender skjema til API:", formData);
        
        // Simulerer API-kall her. Etter at API-kallet er OK:
        
        // 1. Naviger til bekreftelsessiden.
        // 2. Sender email-adressen for visning på takkesiden.
        navigate('/confirmation', { state: { email: formData.email } });
    };

    return (
        <Container className="my-5">
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

                    {/* 2. Type problem */}
                    <h4 className="mb-3">1. Type problem</h4>
                    <div className="d-flex flex-wrap gap-2 mb-4">
                        <span className="badge bg-dark">{formData.type}</span>
                        {/* Flere badges for de andre knappene hvis du sporer dem */}
                    </div>
                    
                    {/* 3. Beskrivelse */}
                    <h4 className="mb-3">2. Beskrivelse*</h4>
                    <div className="mb-4 p-2 border rounded" style={{ whiteSpace: 'pre-wrap' }}>
                        {formData.description || 'Ingen beskrivelse'}
                    </div>

                    {/* 4. Anbefalt hNDLING */}
                    <h4 className="mb-3">3. Anbefalt handling</h4>
                    <div className="mb-5 p-2 border rounded" style={{ whiteSpace: 'pre-wrap' }}>
                        {formData.expectedBehavior || "Ikke fylt ut."}
                    </div>

                    {/* Knapper for bekreftelse/tilbake */}
                    <div className="d-flex justify-content-between">
                        <Button 
                            variant="outline-dark" 
                            onClick={() => navigate("/report", { state: { formData: formData } })} // Tilbake til redigering
                        >
                            Endre skjema
                        </Button>
                        <Button 
                            variant="dark" 
                            onClick={handleConfirm}
                        >
                            Bekreft og send inn
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}