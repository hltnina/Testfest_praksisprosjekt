// src/pages/HomePage.jsx
import { useEffect, useState } from "react";
import api from "../services/api";
import HeroSection from "../components/HeroSection";
import IssuesTable from "../components/IssuesTable";

export default function HomePage() {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

<<<<<<< HEAD
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
=======
  useEffect(() => {
    // midlertidige "dummy-data" -> hvordan det skal vises når backend er implementert
    setTimeout(() => {
      const dummyData = [
        {
          id: 1,
          title: "Feil på innlogging",
          description: "Knappen på mobil fungerer ikke.",
          company: "Testfest",
          type: "funksjon",
          createdAt: "2025-10-10T12:00:00Z",
          status: "Åpen",
          highlighted: false,
        },
        {
          id: 2,
          title: "Feil farge på knapp",
          description: "Knappen har feil farge på forsiden.",
          status: "Lukket",
          createdAt: "2025-10-08T12:00:00Z",
          highlighted: false,
        },
      ];
      setIssues(dummyData);
      setLoading(false);
    }, 1000);
>>>>>>> 085055b6358ba023fb4ec91bc7a47d3a39f130d7



    return (
        <div className="container mt-4">
            <HeroSection featured={featured} />
            <IssuesTable issues={issues} />
        </div>
    );
}