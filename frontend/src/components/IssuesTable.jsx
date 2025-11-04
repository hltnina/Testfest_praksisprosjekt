import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Table, Pagination, Dropdown } from "react-bootstrap"; 

// Angi antall rader per side
const ITEMS_PER_PAGE = 5;

export default function IssuesTable({ issues = [] }) {
    const navigate = useNavigate();

    // Utvidet state for å håndtere alle filtre og paginering
    const [filters, setFilters] = useState({
        search: "",
        selskap: "all",
        type: "all",
        status: "all",
        sort: "dateDesc", // Legg til sortering (f.eks. sist oppdatert)
    });
    const [currentPage, setCurrentPage] = useState(1);

    // Hjelpefunksjon for å oppdatere filtre
    const handleFilterChange = (name, value) => {
        setFilters(prev => ({ ...prev, [name]: value }));
        setCurrentPage(1); // Tilbakestill til side 1 ved nytt filter
    };

    // Filtrering 
    const filteredAndSorted = issues
        .filter((issue) => {
            // Søkeordet hentes og konverteres til små bokstaver -> sikrer at søket er "case-insensitive), konvertering skjer kun én gang
            const searchTerm = (filters.search || "").toLowerCase();

            //Logikk for søk av både tekst og streng
            const matchesSearch =
                //Sjekker tittel (tekst)
                (issue.title || "").toLowerCase().includes(searchTerm) ||
                // Sjekker saksnummer (tall, hvor tallet MÅ konverteres til Streng)
                String(issue.id || "").includes(searchTerm);


            // Selskap
            const matchesCompany = filters.selskap === "all" || (issue.company || "") === filters.selskap;

            // Type
            const matchesType = filters.type === "all" || (issue.type || "") === filters.type;

            // Status (fra eksisterende logikk)
            const matchesStatus = filters.status === "all" || (issue.status || "") === filters.status;

            return matchesSearch && matchesCompany && matchesType && matchesStatus;

        })

        // Sortering
        .sort((a, b) => {
            // Enkel sortering etter sist oppdatert (dato)
            if (filters.sort === "dateDesc") {
                return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
            }
            return 0; // Ingen sortering
        });


    // Paginering 
    const totalPages = Math.ceil(filteredAndSorted.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const issuesToDisplay = filteredAndSorted.slice(startIndex, endIndex + ITEMS_PER_PAGE);

    // Generer pagineringselementer (kun for visning)
    const items = Array.from({ length: totalPages }, (_,
        i) => (
        <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => setCurrentPage(i + 1)}>
            {i + 1}
        </Pagination.Item>
    ));




    //dropdown (hard-kodet)
    const uniqueCompanies = ["Testfest"];
    const uniqueTypes = ["Ukjent"];


    return (
        <section className="my-5">
            <h3 className="mb-4">Alle issues</h3>

            {/* Filterseksjonen */}
            <div className="d-flex flex-wrap gap-5 mb-4">
                {/* Søkefelt */}
                <Form.Control
                    type="text"
                    className="w-25"
                    placeholder="Søk for Saksnummer..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                />

                {/* Dropdown for Selskap */}
                <Form.Select className="w-auto" value={filters.selskap} onChange={(e) => handleFilterChange('selskap', e.target.value)}>
                    <option value="all">Selskap</option>
                    {uniqueCompanies.map(c => <option key={c} value={c}>{c}</option>)}
                </Form.Select>

                {/* Dropdown for Type */}
                <Form.Select className="w-auto" value={filters.type} onChange={(e) => handleFilterChange('type', e.target.value)}>
                    <option value="all">Type</option>
                    {uniqueTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </Form.Select>

                {/* Dropdown for Dato (mulig sortering) */}
                <Form.Select className="w-auto" value={filters.sort} onChange={(e) => handleFilterChange('sort', e.target.value)}>
                    <option value="dateDesc">Dato</option>
                    <option value="dateDesc">Sist oppdatert (Nyeste)</option>
                    <option value="dateAsc">Sist oppdatert (Eldste)</option>
                </Form.Select>

                {/* Dropdown for Status */}
                <Form.Select className="w-auto" value={filters.status} onChange={(e) => handleFilterChange('status', e.target.value)}>
                    <option value="all">Status</option>
                    <option value="Open">Åpen</option>
                    <option value="In Progress">Under behandling</option>
                    <option value="Closed">Lukket</option>
                </Form.Select>
            </div>

            {/* Visningskontroll og antall treff */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <p className="mb-0">Viser {startIndex + 1} til {Math.min(endIndex, filteredAndSorted.length)} av {filteredAndSorted.length} saker</p>
                <Form.Select className="w-auto" style={{ maxWidth: '120px' }}>
                    <option>5 per visning</option>
                    <option>10 per visning</option>
                    <option>20 per visning</option>
                </Form.Select>
            </div>

            {/* Tabellen (issuesToDisplay for visdning av data) */}
            <Table striped hover responsive className="shadow-sm">
                <thead className="table-dark">
                    <tr>
                        <th>Tittel</th>
                        <th>Saksnummer</th>
                        <th>Selskap</th>
                        <th>Type</th>
                        <th>Sist oppdatert</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {issuesToDisplay.length > 0 ? (
                        issuesToDisplay.map((issue) => (
                            <tr
                                key={issue.id}
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate(`/issue/${issue.id}`)}
                            >
                                <td>{issue.title}</td>
                                <td>{issue.id}</td> {/* ID som saksnummer */}
                                <td>{issue.company || 'N/A'}</td>
                                <td>{issue.type || 'N/A'}</td>
                                <td>{new Date(issue.createdAt).toLocaleDateString('no-NO')}</td>
                                <td>{issue.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">
                                Ingen saker funnet
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {/* Paginering */}
            <div className="d-flex justify-content-center">
                <Pagination>
                    <Pagination.Prev onClick={() => setCurrentPage(c => Math.max(1, c - 1))} disabled={currentPage === 1} />
                    {items}
                    <Pagination.Next onClick={() => setCurrentPage(c => Math.min(totalPages, c + 1))} disabled={currentPage === totalPages} />
                </Pagination>
            </div>
        </section>
    );

}
