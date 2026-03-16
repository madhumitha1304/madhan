import Navbar from './Navbar';

const FraudAlerts = ({ userRole, onLogout, onNavigate }) => {
  const alerts = [
    { id: 'AL-5021', employee: 'Sarah Miller', type: 'Unusual Volume', risk: 85, status: 'Open' },
    { id: 'AL-5022', employee: 'Maria Garcia', type: 'After-hours Access', risk: 72, status: 'Investigating' },
    { id: 'AL-5023', employee: 'John Smith', type: 'System Override', risk: 90, status: 'Open' },
    { id: 'AL-5024', employee: 'David Chen', type: 'Multiple Logins', risk: 44, status: 'Closed' },
  ];

  return (
    <div className="dashboard-container animate-in">
      <header className="dashboard-header">
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Fraud Alerts Management</h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.875rem' }}>Suspicious activity queue for {userRole}</p>
        </div>
        <Navbar activeView="alerts" onNavigate={onNavigate} onLogout={onLogout} userRole={userRole} />
      </header>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Alert ID</th>
              <th>Employee</th>
              <th>Fraud Type</th>
              <th>Risk Score</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map(alert => (
              <tr key={alert.id} className="alert-item-row">
                <td className="emp-id">{alert.id}</td>
                <td>{alert.employee}</td>
                <td>{alert.type}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                      <div style={{ width: `${alert.risk}%`, height: '100%', background: alert.risk > 70 ? '#ef4444' : '#f59e0b', borderRadius: '2px' }}></div>
                    </div>
                    <span>{alert.risk}%</span>
                  </div>
                </td>
                <td>
                  <span className={`status-badge status-${alert.status.toLowerCase()}`}>
                    {alert.status}
                  </span>
                </td>
                <td>
                  <div className="action-btns">
                    <button className="btn-icon">Details</button>
                    <button className="btn-icon">Investigate</button>
                    <button className="btn-icon">Resolve</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FraudAlerts;
