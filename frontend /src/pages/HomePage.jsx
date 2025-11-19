// src/pages/HomePage.jsx
import { useEffect, useState } from "react";
import api from "../services/api";
import HeroSection from "../components/HeroSection";
import IssuesTable from "../components/IssuesTable";

export default function HomePage() {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const { data } = await api.get("/issues");
                setIssues(data);
            } catch (err) {
                console.error("Feil ved henting av issues:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchIssues(); 
    }, []);

    if (loading)
        return (
            <div className="container mt-5">
                <p>Laster saker...</p>
            </div>
        );

    const featured = issues.find((i) => i.highlighted);

    return (
        <div className="container mt-4">
            <HeroSection featured={featured} />
        </div>
    );
}