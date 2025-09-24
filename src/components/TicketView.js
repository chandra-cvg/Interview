import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function TicketView({ tickets, onUpdate, onDelete }) {
  const { id } = useParams();
  const ticket = tickets.find(t => t.id === id);
  const navigate = useNavigate();

  if (!ticket) return <p>Ticket not found.</p>;

  const toggleStatus = () => {
    const next = ticket.status === 'Open' ? 'In Progress' : ticket.status === 'In Progress' ? 'Closed' : 'Open';
    onUpdate(ticket.id, { status: next });
  };

  const handleDelete = () => {
    onDelete(ticket.id);
    navigate('/tickets');
  };

  return (
    <div className="center card">
      <h2>{ticket.title}</h2>
      <p><b>Customer:</b> {ticket.customer}</p>
      <p><b>Priority:</b> {ticket.priority}</p>
      <p><b>Status:</b> {ticket.status}</p>
      <p><b>Created:</b> {ticket.createdAt}</p>
      <div className="actions">
        <button onClick={toggleStatus}>Toggle Status</button>
        <button onClick={handleDelete}>Delete</button>
        <Link to="/tickets">Back to list</Link>
      </div>
    </div>
  );
}