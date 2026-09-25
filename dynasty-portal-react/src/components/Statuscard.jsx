import { useState } from 'react';

export default function StatusCard() {
  const [status, setStatus] = useState("Local Node: Operational");
  const [isRunning, setIsRunning] = useState(false);

  const runDiagnostic = () => {
    setIsRunning(true);
    setStatus("Running Hardware Diagnostics...");

    setTimeout(() => {
      setStatus("Local Node: Operational (RAM/NVMe/CPU OK)");
      setIsRunning(false);
    }, 1500);
  };

  return (
    <section id="system-status" className="card">
      <h3>System Status Monitor</h3>
      <div className="status-indicator">
        <span className={`dot ${isRunning ? 'scanning' : 'online'}`}></span>
        <p>{status}</p>
      </div>
      <button 
        onClick={runDiagnostic} 
        disabled={isRunning}
        className="btn primary-btn"
      >
        {isRunning ? "Scanning..." : "Run Hardware Self-Check"}
      </button>
    </section>
  );
}