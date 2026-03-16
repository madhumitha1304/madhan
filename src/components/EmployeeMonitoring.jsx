import Navbar from './Navbar';

const EmployeeMonitoring = ({ userRole, onLogout, onNavigate }) => {
  const employees = [
    { id: 'EMP-4421', name: 'James Wilson', dept: 'Treasury', role: 'Clerk', tx: 145, risk: 12, status: 'Normal' },
    { id: 'EMP-8821', name: 'Sarah Miller', dept: 'IT Ops', role: 'Support', tx: 89, risk: 45, status: 'Suspicious' },
    { id: 'EMP-1102', name: 'David Chen', dept: 'Retail', role: 'Manager', tx: 210, risk: 5, status: 'Normal' },
    { id: 'EMP-9923', name: 'Maria Garcia', dept: 'Finance', role: 'Accountant', tx: 67, risk: 82, status: 'Suspicious' },
    { id: 'EMP-5567', name: 'Robert Fox', dept: 'Treasury', role: 'Trader', tx: 412, risk: 18, status: 'Normal' },
    { id: 'EMP-3310', name: 'Linda Park', dept: 'Audit', role: 'Analyst', tx: 124, risk: 7, status: 'Normal' },
  ];

  const getRiskColor = (score) => {
    if (score > 70) return '#ef4444';
    if (score > 40) return '#f59e0b';
    return '#22c55e';
  };

  return (
    <div className="dashboard-container animate-in">
      <header className="dashboard-header">
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Employee Monitoring</h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.875rem' }}>Personnel risk audit for {userRole}</p>
        </div>
        <Navbar activeView="monitoring" onNavigate={onNavigate} onLogout={onLogout} userRole={userRole} />
      </header>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Role</th>
              <th>Transactions</th>
              <th>Risk Score</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id}>
                <td className="emp-id">{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.dept}</td>
                <td>{emp.role}</td>
                <td style={{ textAlign: 'center' }}>{emp.tx}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="risk-circle" style={{ background: getRiskColor(emp.risk) }}></span>
                    {emp.risk}%
                  </div>
                </td>
                <td>
                  <span className={`status-badge status-${emp.status.toLowerCase()}`}>
                    {emp.status}
                  </span>
                </td>
                <td>
                  <div className="action-btns">
                    <button className="btn-icon">Details</button>
                    <button className="btn-icon">Investigate</button>
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

export default EmployeeMonitoring;
