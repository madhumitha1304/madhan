import Navbar from './Navbar';

const ActivityLogs = ({ userRole, onLogout, onNavigate }) => {
  const logs = [
    { id: 'E101', action: 'System Login', time: '09:00 AM', system: 'Auth Gateway', status: 'Success' },
    { id: 'E102', action: 'Transaction Approval', time: '10:32 AM', system: 'Core Banking', status: 'Success' },
    { id: 'E103', action: 'Account Lockout', time: '11:15 AM', system: 'Customer Portal', status: 'Alert' },
    { id: 'E101', action: 'Report Export', time: '01:45 PM', system: 'Analytics Engine', status: 'Success' },
    { id: 'E104', action: 'Password Change', time: '03:20 PM', system: 'Identity Manager', status: 'Success' },
    { id: 'E102', action: 'System Logout', time: '05:00 PM', system: 'Auth Gateway', status: 'Success' },
  ];

  return (
    <div className="dashboard-container animate-in">
      <header className="dashboard-header">
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Employee Activity Logs</h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.875rem' }}>System usage audit for {userRole}</p>
        </div>
        <Navbar activeView="logs" onNavigate={onNavigate} onLogout={onLogout} userRole={userRole} />
      </header>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Action Performed</th>
              <th>Timestamp</th>
              <th>System Accessed</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, i) => (
              <tr key={i}>
                <td className="emp-id">{log.id}</td>
                <td>{log.action}</td>
                <td style={{ color: 'var(--text-dim)' }}>{log.time}</td>
                <td>
                  <span style={{ padding: '4px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', fontSize: '0.8rem' }}>
                    {log.system}
                  </span>
                </td>
                <td>
                   <span style={{ color: log.status === 'Alert' ? '#ef4444' : '#22c55e' }}>
                     ● {log.status}
                   </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityLogs;
