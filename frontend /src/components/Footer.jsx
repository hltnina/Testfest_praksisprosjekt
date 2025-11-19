import React from "react";
import { Container } from "react-bootstrap";

const Footer = ({className}) => {
    return(
        // className prop-en (som inneholder 'app-footer') brukes her
        <footer className={className}>
            {/* p-4 gir padding rundt innholdet */}
            <Container className="p-4">
                
                {/* d-flex, justify-content-center og gap-4 for å sentrere og gi mellomrom */}
                <div className="d-flex justify-content-center gap-4 text-muted small">
                    
                    {/* Bruk <a>-tagger for lenker, og text-dark for å sikre synlighet */}
                    <a href="#" className="text-dark">Privacy Policy</a>
                    <a href="#" className="text-dark">Terms of Service</a>
                    <a href="#" className="text-dark">Kontakt oss</a>
                    <a href="#" className="text-dark">Hjelp</a>

                </div>
            </Container>
        </footer>
    );  
};

export default Footer;
