// Wait for the DOM structure to load completely
document.addEventListener('DOMContentLoaded', () => {

    // 1. Select key DOM elements
    const diagBtn = document.getElementById('run-diag-btn');
    const statusText = document.getElementById('status-text');
    const statusDot = document.querySelector('.dot');
    
    const repairForm = document.getElementById('repair-form');
    const ticketList = document.getElementById('ticket-list');

    // State array to store logged support tickets
    const tickets = [];

    // 2. Hardware Self-Check Button Event
    diagBtn.addEventListener('click', () => {
        statusText.textContent = "Running Hardware Diagnostics...";
        statusText.style.color = "#38bdf8";
        statusDot.style.backgroundColor = "#38bdf8";
        statusDot.style.boxShadow = "0 0 8px #38bdf8";

        // Simulate a 1.5-second system scan delay
        setTimeout(() => {
            statusText.textContent = "Local Node: Operational (RAM/NVMe/CPU OK)";
            statusText.style.color = "#f8fafc";
            statusDot.style.backgroundColor = "#22c55e";
            statusDot.style.boxShadow = "0 0 8px #22c55e";
            console.log("[DIAGNOSTIC]: Hardware health check completed successfully.");
        }, 1500);
    });

    // 3. Form Submission Event for Logging Support Tickets
    repairForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop default browser page refresh

        // Extract values from form fields
        const clientName = document.getElementById('client-name').value.trim();
        const deviceType = document.getElementById('device-type').value;
        const issueDescription = document.getElementById('issue-description').value.trim();

        if (!clientName || !deviceType || !issueDescription) {
            alert("Please complete all form fields.");
            return;
        }

        // Create a new ticket data object
        const newTicket = {
            id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
            clientName: clientName,
            deviceType: deviceType,
            issueDescription: issueDescription,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        // Add ticket to state and update the UI
        tickets.push(newTicket);
        renderTickets();

        // Reset the form inputs
        repairForm.reset();
        console.log("[TICKET CREATED]:", newTicket);
    });

    // 4. Function to Render Tickets to the DOM
    function renderTickets() {
        if (tickets.length === 0) {
            ticketList.innerHTML = `<p class="empty-msg">No active tickets submitted yet.</p>`;
            return;
        }

        // Clear existing container content
        ticketList.innerHTML = '';

        // Generate HTML card for each ticket in state
        tickets.forEach(ticket => {
            const ticketCard = document.createElement('div');
            ticketCard.className = 'card';
            ticketCard.style.marginTop = '1rem';
            ticketCard.style.borderColor = '#3b82f6';

            ticketCard.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                    <strong style="color: #60a5fa;">Ticket ID: ${ticket.id}</strong>
                    <span style="font-size: 0.8rem; color: #94a3b8;">${ticket.timestamp}</span>
                </div>
                <p><strong>Client:</strong> ${ticket.clientName}</p>
                <p><strong>Device:</strong> ${ticket.deviceType.toUpperCase()}</p>
                <p style="margin-top: 0.5rem; color: #cbd5e1; font-size: 0.9rem;">
                    <strong>Fault Description:</strong> ${ticket.issueDescription}
                </p>
            `;

            ticketList.appendChild(ticketCard);
        });
    }
});