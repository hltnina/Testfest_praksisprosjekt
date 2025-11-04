import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

// Definerer de faste kategoriene for Type problem 
export const categories = [
  "Feil", "Funksjonsforespørsel", "Generell henvendelse", "Annet"
];

// Definerer de underliggende problemtypene
export const problemTypes = [
];

export default function ReportPage() {
  const navigate = useNavigate();

  //Henter location-objektet
  const location = useLocation(); 

  //.state?.formData for trygt henting av dataene
  const existingData = location.state?.formData;

  // State for å lagre alle skjemaverdiene
  const [formData, setFormData] = useState({
    email: existingData?.email || '',
    title: existingData?.title || '',
    type: existingData?.type || 'Feil', // Standardverdi
    description: existingData?.description || '',
    expectedBehavior: existingData?.expectedBehavior || '',
  });

  // Håndterer endringer i tekstfelt og dropdowns
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Håndterer klikk på type-knappene
  const handleTypeSelect = (type) => {
    setFormData(prev => ({ ...prev, type }));
  };

  // Håndterer innsending av skjema
  const handleSubmit = (e) => {
    e.preventDefault();

    // Senere kalle API-et her (f.eks. axios.post('/issues', formData))
    
    // Navigerer til oppsummeringssiden, med sending av alle skjema-dataene i "state"
    navigate("/summary", {state: {formData: formData}});
  };

  return (
    <Container className="Report-form my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="text-center mb-5">
            <h1>Meld inn din sak</h1>
            <p className="text-muted">
              Fyll ut følgende skjerma, fra felt 1 til felt 4. Det er viktig at du er spesifikt og tydelig. 
            </p>
          </div>

          <Form onSubmit={handleSubmit}>

            {/* Tittel på sak 
            <h4 className="mb-3">2. Tittel på sak</h4>
            <Form.Group className="mb-4" controlId="formTitle">
              <Form.Control 
                type="text" 
                name="title" 
                placeholder="Skriv inn en kort tittel..." 
                value={formData.title}
                onChange={handleChange}
                required
              />
              <Form.Text className="text-muted">Vær spesifikk.</Form.Text>
            </Form.Group> */}

            {/* Type problem */}
            <h4 className="mb-3">1. Type problem</h4>
            <div className="mb-4">
              <div className="d-flex flex-wrap gap-2">
                {categories.map(cat => (
                  <Button
                    key={cat}
                    variant={formData.type === cat ? 'dark' : 'outline-dark'}
                    size="sm"
                    onClick={() => handleTypeSelect(cat)}
                    className="me-2"
                  >
                    {cat}
                  </Button>
                ))}
              </div>
              <Form.Text className="text-muted">
                Velg kategorien som passer best til problemet ditt.
              </Form.Text>
              
              {/* Legg til de ekstra "Generell henvendelse" knappene under 
              <div className="d-flex flex-wrap gap-2 mt-2">
                {problemTypes.map((type, index) => (
                    <Button 
                        key={index} 
                        variant="outline-secondary" 
                        size="sm"
                    >
                        {type}
                    </Button>
                ))}
              </div>*/}
            </div>

            {/* Beskrivelse */}
            <h4 className="mb-3">2. Beskrivelse*</h4>
            <Form.Group className="mb-4" controlId="formDescription">
              <Form.Control 
                as="textarea" 
                rows={4} 
                name="description"
                placeholder="Kort beskrivelse av problemet..." 
                value={formData.description}
                onChange={handleChange}
                required
              />
              <Form.Text className="text-muted d-flex justify-content-between">
                <span>Hva prøvde du å gjøre? Hva skjedde?</span>
              </Form.Text>
            </Form.Group>

            {/* Forventet oppførsel */}
            <h4 className="mb-3">3. Anbefalt handling</h4>
            <Form.Group className="mb-5" controlId="formExpected">
              <Form.Control 
                as="textarea" 
                rows={3} 
                name="expectedBehavior"
                placeholder="Kort beskrivelse av hvordan det skulle ha fungert..." 
                value={formData.expectedBehavior}
                onChange={handleChange}
              />
              {/*<Form.Text className="text-muted">
                Hvordan skulle det ha vært?
            </Form.Text>*/}
            </Form.Group>

            {/* Fyll inn din e-postadresse */}
            <h4 className="mb-3">4. Fyll inn din e-postadresse</h4>
            <Form.Group className="mb-4" controlId="formEmail">
              <Form.Control 
                type="email" 
                name="email" 
                placeholder="Din e-postadresse her..." 
                value={formData.email}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                Ikke obligatorisk.
              </Form.Text>
            </Form.Group>

            {/* Knapper for innsending/tilbake */}
            <div className="d-flex justify-content-between">
              <Button variant="outline-dark" onClick={() => navigate('/')}>
                Gå tilbake til hjem
              </Button>
              <Button variant="dark" type="submit">
                Send inn
              </Button>
            </div>
            
          </Form>
        </Col>
      </Row>
    </Container>
  );
}