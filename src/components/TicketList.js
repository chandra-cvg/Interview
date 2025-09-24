import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function TicketList({ tickets, onDelete }) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const filtered = tickets.filter((t) => {
    return (
      (!search || t.title.toLowerCase().includes(search.toLowerCase())) &&
      (!filterStatus || t.status === filterStatus)
    );
  });

  return (
    <div>
      <div className="toolbar">
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">All statuses</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
        <Link to="/tickets/create" className="btn">
          + New Ticket
        </Link>
      </div>

      <table className="tickets-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Customer</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((t) => (
            <tr key={t.id}>
              <td>
                <Link to={`/tickets/${t.id}`}>{t.title}</Link>
              </td>
              <td>{t.customer}</td>
              <td>{t.priority}</td>
              <td>{t.status}</td>
              <td>{t.createdAt}</td>
              <td>
                <button onClick={() => onDelete(t.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filtered.length === 0 && <p>No tickets found.</p>}
    </div>
  );
}
