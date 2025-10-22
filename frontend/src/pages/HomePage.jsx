import { useEffect, useState } from "react";
import api from "../services/api";
import HeroSection from "../components/HeroSection";
import IssuesTable from "../components/IssuesTable";

export default function HomePage() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

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
          status: "Open",
          highlighted: false,
        },
        {
          id: 2,
          title: "Feil farge på knapp",
          description: "Knappen har feil farge på forsiden.",
          status: "Closed",
          createdAt: "2025-10-08T12:00:00Z",
          highlighted: false,
        },
      ];
      setIssues(dummyData);
      setLoading(false);
    }, 1000);

    // Slik skal det implementeres når backend er senere implementert
    // const fetchIssues = async () => {
    //   try {
    //     const res = await api.get("/issues");
    //     setIssues(res.data);
    //   } catch (err) {
    //     console.error("Feil ved henting av issues:", err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchIssues();
  }, []);

  const featured = issues.find((i) => i.highlighted);

  if (loading)
    return (
      <div className="container mt-5">
        <p>Laster saker...</p>
      </div>
    );

  return (
    <div className="container mt-4">
      <HeroSection featured={featured} />
      <IssuesTable issues={issues} />
    </div>
  );
}
