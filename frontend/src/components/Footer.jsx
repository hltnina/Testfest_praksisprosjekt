import Reac from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
    return(
        <footer className="bg-light text-center text-lg-start">
            <Container className="p-4">
                <div className = "text-center">
                    <p className = "mb-0"> Kontakt oss</p>
                </div>
            </Container>
        </footer>
    );  
};

export default Footer;