import { useState, useEffect } from 'react';
import Header from './components/Header';
import StatusCard from './components/StatusCard';
import RepairForm from './components/RepairForm';
import './App.css';

export default function App() {
  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('dynasty_react_tickets');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('dynasty_react_tickets', JSON.stringify(tickets));
  }, [tickets]);

  const handleAddTicket = (newTicket) => {
    setTickets((prevTickets) => [newTicket, ...prevTickets]);
  };

  const handleDeleteTicket = (id) => {
    setTickets((prevTickets) => prevTickets.filter(ticket => ticket.id !== id));
  };

  return (
    <div className="app-root">
      <Header />
      <main className="container">
        <section className="hero-section">
          <h1>Hardware Diagnostic & Service Portal (React)</h1>
          <p>Run instant component checks or log system repair tickets.</p>
        </section>

        <StatusCard />
        <RepairForm onAddTicket={handleAddTicket} />

        <section className="card">
          <h3>Logged Support Tickets ({tickets.length})</h3>
          {tickets.length === 0 ? (
            <p className="empty-msg">No active tickets submitted yet.</p>
          ) : (
            <div className="ticket-list">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="card ticket-card">
                  <div className="ticket-header">
                    <strong className="ticket-id">{ticket.id}</strong>
                    <span className="ticket-time">{ticket.timestamp}</span>
                  </div>
                  <p><strong>Client:</strong> {ticket.clientName}</p>
                  <p><strong>Device:</strong> {ticket.deviceType.toUpperCase()}</p>
                  <p className="ticket-desc"><strong>Fault:</strong> {ticket.issueDescription}</p>
                  <button 
                    onClick={() => handleDeleteTicket(ticket.id)}
                    className="delete-btn"
                  >
                    Clear Ticket
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}