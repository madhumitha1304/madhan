import { useState, useEffect } from 'react';
import Navbar from './Navbar';

const Dashboard = ({ userRole, onLogout, onNavigate }) => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    suspiciousTransactions: 0,
    highRiskEmployees: 0,
    fraudAlertsToday: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { 'Authorization': `Bearer ${token}` };
        
        // Fetch users count
        const usersRes = await fetch('/api/admin/users', { headers });
        const users = usersRes.ok ? await usersRes.json() : [];
        
        // Fetch transactions count
        const txRes = await fetch('/api/admin/transactions', { headers });
        const transactions = txRes.ok ? await txRes.json() : [];
        
        setStats({
          totalEmployees: users.length,
          suspiciousTransactions: Math.floor(transactions.length * 0.1), // Mock ratio
          highRiskEmployees: Math.ceil(users.length * 0.05), // Mock ratio
          fraudAlertsToday: Math.floor(transactions.length * 0.05) // Mock ratio
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userRole === 'ADMIN') {
      fetchStats();
    } else {
      setIsLoading(false);
    }
  }, [userRole]);

  return (
    <div className="dashboard-container animate-in">
      <header className="dashboard-header">
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Fraud Analysis Dashboard</h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.875rem' }}>Welcome back, {userRole}</p>
        </div>
        <Navbar activeView="dashboard" onNavigate={onNavigate} onLogout={onLogout} userRole={userRole} />
      </header>

      <div className="dashboard-grid">
        <div className="stat-card">
          <span className="stat-label">Total Employees</span>
          <span className="stat-value">{stats.totalEmployees}</span>
          <div className="stat-trend trend-up">
            <span>↑ 2.4%</span> <span style={{ color: 'var(--text-dim)' }}>vs last month</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-label">Suspicious Transactions</span>
          <span className="stat-value">{stats.suspiciousTransactions}</span>
          <div className="stat-trend trend-down">
            <span>↓ 5%</span> <span style={{ color: 'var(--text-dim)' }}>vs last month</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-label">High Risk Employees</span>
          <span className="stat-value">{stats.highRiskEmployees}</span>
          <div className="stat-trend trend-up">
            <span>↑ 1</span> <span style={{ color: 'var(--text-dim)' }}>new today</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-label">Fraud Alerts Today</span>
          <span className="stat-value" style={{ color: 'var(--primary)' }}>{stats.fraudAlertsToday}</span>
          <div className="stat-trend">
            <span style={{ color: 'var(--text-dim)' }}>Urgent action required</span>
          </div>
        </div>
      </div>

      <div className="main-content-grid">
        <div className="chart-container">
          <h3 style={{ marginBottom: '20px' }}>Weekly Fraud Activity</h3>
          <div className="bar-chart">
            {[65, 45, 75, 50, 85, 40, 60].map((h, i) => (
              <div key={i} className="bar" style={{ height: `${h}%` }}>
                <span className="bar-label">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-container">
          <h3 style={{ marginBottom: '16px' }}>System Health</h3>
          <div className="health-grid">
            <div className="health-item">
              <span className="health-label">Database</span>
              <span className="health-value">99.9%</span>
            </div>
            <div className="health-item">
              <span className="health-label">API Latency</span>
              <span className="health-value">24ms</span>
            </div>
            <div className="health-item">
              <span className="health-label">Detection Engine</span>
              <span className="health-value">Active</span>
            </div>
            <div className="health-item">
              <span className="health-label">Uptime</span>
              <span className="health-value">12d 4h</span>
            </div>
          </div>
          
          <h3 style={{ marginTop: '24px', marginBottom: '16px' }}>Employees Under Investigation</h3>
          <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
             <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>7 cases pending review</p>
             <button className="link-btn" style={{ fontSize: '0.75rem', marginTop: '8px' }} onClick={() => onNavigate('monitoring')}>View All Cases →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
