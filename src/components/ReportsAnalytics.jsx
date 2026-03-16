import Navbar from './Navbar';

const ReportsAnalytics = ({ userRole, onLogout, onNavigate }) => {
  const reportsData = [
    { title: 'Fraud Cases by Department', desc: 'Breakdown of suspicious activity across banking units.', icon: '🏢' },
    { title: 'High Risk Employees', desc: 'Personnel with risk scores exceeding safety thresholds.', icon: '⚠️' },
    { title: 'Suspicious Transactions', desc: 'Detailed log of all transactions currently under review.', icon: '💳' },
    { title: 'Monthly Fraud Trends', desc: 'Statistical trends and projection for the next 30 days.', icon: '📉' },
  ];

  return (
    <div className="dashboard-container animate-in">
      <header className="dashboard-header">
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Reports & Analytics</h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.875rem' }}>Management reporting unit for {userRole}</p>
        </div>
        <Navbar activeView="reports" onNavigate={onNavigate} onLogout={onLogout} userRole={userRole} />
      </header>

      <div className="reports-grid">
        {reportsData.map((report, idx) => (
          <div key={idx} className="report-card animate-in" style={{ animationDelay: `${idx * 0.1}s` }}>
            <div className="report-icon">{report.icon}</div>
            <h3 style={{ marginBottom: '8px', fontSize: '1.1rem' }}>{report.title}</h3>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', lineHeight: '1.4' }}>{report.desc}</p>
            
            <div className="export-group">
              <button className="btn-export">📄 PDF</button>
              <button className="btn-export">📊 Excel</button>
              <button className="btn-export">⬇️ Download</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsAnalytics;
