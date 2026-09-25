document.addEventListener('DOMContentLoaded', () => {

    const diagBtn = document.getElementById('run-diag-btn');
    const statusText = document.getElementById('status-text');
    const statusDot = document.querySelector('.dot');
    
    const repairForm = document.getElementById('repair-form');
    const ticketList = document.getElementById('ticket-list');

    // 1. Initialize tickets array by reading from localStorage (or defaulting to an empty array)
    const storedTickets = localStorage.getItem('dynasty_tickets');
    const tickets = storedTickets ? JSON.parse(storedTickets) : [];

    // Render any previously saved tickets immediately on page load
    renderTickets();

    // 2. Hardware Self-Check Event
    diagBtn.addEventListener('click', () => {
        statusText.textContent = "Running Hardware Diagnostics...";
        statusText.style.color = "#38bdf8";
        statusDot.style.backgroundColor = "#38bdf8";
        statusDot.style.boxShadow = "0 0 8px #38bdf8";

        setTimeout(() => {
            statusText.textContent = "Local Node: Operational (RAM/NVMe/CPU OK)";
            statusText.style.color = "#f8fafc";
            statusDot.style.backgroundColor = "#22c55e";
            statusDot.style.boxShadow = "0 0 8px #22c55e";
            console.log("[DIAGNOSTIC]: Hardware health check completed.");
        }, 1500);
    });

    // 3. Form Submission Event
    repairForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const clientName = document.getElementById('client-name').value.trim();
        const deviceType = document.getElementById('device-type').value;
        const issueDescription = document.getElementById('issue-description').value.trim();

        if (!clientName || !deviceType || !issueDescription) {
            alert("Please complete all form fields.");
            return;
        }

        const newTicket = {
            id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
            clientName: clientName,
            deviceType: deviceType,
            issueDescription: issueDescription,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        // Add ticket to state
        tickets.push(newTicket);

        // Save updated tickets array to localStorage
        saveTicketsToStorage();

        // Refresh UI
        renderTickets();

        repairForm.reset();
        console.log("[TICKET SAVED TO LOCALSTORAGE]:", newTicket);
    });

    // 4. Save helper function
    function saveTicketsToStorage() {
        localStorage.setItem('dynasty_tickets', JSON.stringify(tickets));
    }

    // 5. Render tickets to the DOM with a Delete button
    function renderTickets() {
        if (tickets.length === 0) {
            ticketList.innerHTML = `<p class="empty-msg">No active tickets submitted yet.</p>`;
            return;
        }

        ticketList.innerHTML = '';

        tickets.forEach((ticket, index) => {
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
                <button class="delete-btn" data-index="${index}" style="margin-top: 0.75rem; background: #ef4444; color: white; border: none; padding: 0.4rem 0.8rem; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                    Clear Ticket
                </button>
            `;

            ticketList.appendChild(ticketCard);
        });

        // Add event listeners to Delete buttons
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const targetIndex = e.target.getAttribute('data-index');
                tickets.splice(targetIndex, 1); // Remove from array
                saveTicketsToStorage();         // Sync with localStorage
                renderTickets();                // Re-render UI
            });
        });
    }
});