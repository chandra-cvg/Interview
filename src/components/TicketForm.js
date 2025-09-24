import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TicketForm({ onSave }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Low');
  const [status, setStatus] = useState('Open');
  const [customer, setCustomer] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, priority, status, customer });
    navigate('/tickets');
  };

  return (
    <div className="center card">
      <h2>Create Ticket</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label>Customer</label>
        <input value={customer} onChange={(e) => setCustomer(e.target.value)} required />
        <label>Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>Open</option>
          <option>In Progress</option>
          <option>Closed</option>
        </select>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}