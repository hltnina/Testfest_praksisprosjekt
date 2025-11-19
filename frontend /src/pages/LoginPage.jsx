// src/pages/LoginPage.jsx
import { Container, Button } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();

    // Etter fullført OAUth-flyt kommer vi tilbake med ?loggedIn=true i URLen. 
    // da har serveren allerede satt en HttpOnly JWT-cookie, så vi trenger bare å navigere hjem.
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get("loggedIn") === "true") {
            navigate("/", { replace: true });
        }
    }, [navigate]);

    return (
        <Container className="mt-5 text-center">
            <h2>Logg inn</h2>
            <p>Du logger inn med GitHub</p>

            <Button
                variant="dark"
                onClick={() => (window.location.href = "https://localhost:7256/api/auth/login")}
            >
                Login
            </Button>
        </Container>
    );
}