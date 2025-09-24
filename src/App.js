import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import TicketList from './components/TicketList';
import TicketForm from './components/TicketForm';
import TicketView from './components/TicketView';

const DUMMY_TICKETS = [
  { id: '1', title: 'Login not working', priority: 'High', status: 'Open', customer: 'Alice', createdAt: '2025-09-01' },
  { id: '2', title: 'Page layout broken on mobile', priority: 'Medium', status: 'In Progress', customer: 'Bob', createdAt: '2025-09-02' },
  { id: '3', title: 'Feature request: dark mode', priority: 'Low', status: 'Closed', customer: 'Charlie', createdAt: '2025-08-29' },
];

export default function App() {
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('tickets_v1');
    return saved ? JSON.parse(saved) : DUMMY_TICKETS;
  });

  useEffect(() => {
    localStorage.setItem('tickets_v1', JSON.stringify(tickets));
  }, [tickets]);

  const login = (userObj) => setUser(userObj);
  const logout = () => setUser(null);

  const createTicket = (ticket) => {
    setTickets((t) => [{ ...ticket, id: Date.now().toString(), createdAt: new Date().toISOString().slice(0,10) }, ...t]);
  };

  const updateTicket = (id, updated) => {
    setTickets((t) => t.map(x => x.id === id ? { ...x, ...updated } : x));
  };

  const deleteTicket = (id) => {
    setTickets((t) => t.filter(x => x.id !== id));
  };

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Simple Ticket App</h1>
        <div className="header-right">
          {user ? (
            <>
              <span className="username">{user.username}</span>
              <button className="link-btn" onClick={logout}>Logout</button>
            </>
          ) : (
            <span className="muted">Not logged in</span>
          )}
        </div>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={user ? <Navigate to="/tickets" /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage onLogin={login} />} />

          <Route path="/tickets" element={
            <Protected user={user}>
              <TicketList tickets={tickets} onDelete={deleteTicket} />
            </Protected>
          } />

          <Route path="/tickets/create" element={
            <Protected user={user}>
              <TicketForm onSave={createTicket} />
            </Protected>
          } />

          <Route path="/tickets/:id" element={
            <Protected user={user}>
              <TicketView tickets={tickets} onUpdate={updateTicket} onDelete={deleteTicket} />
            </Protected>
          } />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="app-footer">© {new Date().getFullYear()} Ticket App — Dummy data & demo only</footer>
    </div>
  );
}

function Protected({ user, children }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);
  return user ? children : null;
}

function NotFound() {
  return (
    <div className="center">
      <h2>404 — Not Found</h2>
      <p>Try <a href="/tickets">tickets</a> or <a href="/login">login</a>.</p>
    </div>
  );
}