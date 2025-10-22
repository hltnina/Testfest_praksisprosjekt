import { useNavigate } from "react-router-dom";

export default function FeaturedIssueCard({ issue }) {
  const navigate = useNavigate();

  if (!issue) return null;

  return (
    <div
      className="card p-4 shadow mt-4"
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/issue/${issue.id}`)}
    >
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <h2 className="mb-2">{issue.title}</h2>
          <p className="mb-1 text-muted">
            Opprettet: {new Date(issue.createdAt).toLocaleDateString()}
          </p>
          <p>
            {issue.description.slice(0, 150)}
            {issue.description.length > 150 ? "..." : ""}
          </p>
        </div>
        <div>
          <span className="badge bg-primary">{issue.status}</span>
        </div>
      </div>
    </div>
  );
}
