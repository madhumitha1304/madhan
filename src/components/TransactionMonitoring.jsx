import { useState, useEffect } from 'react';
import Navbar from './Navbar';

const TransactionMonitoring = ({ userRole, onLogout, onNavigate }) => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        const endpoint = userRole === 'ADMIN' ? '/api/admin/transactions' : '/api/user/transactions';
        const response = await fetch(endpoint, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          // Map backend data to frontend format
          const formattedData = data.map(tx => ({
            id: `TX-${tx.id}`,
            customer: `AC-${tx.accountId || 'Unknown'}`,
            type: tx.transactionType || 'Transfer',
            amount: `$${tx.amount?.toLocaleString() || '0'}`,
            status: 'Completed', // Defaulting to Completed as backend doesn't seem to provide status in this schema
            time: new Date(tx.transactionTime || Date.now()).toLocaleTimeString(),
            raw: tx
          }));
          setTransactions(formattedData);
        } else if (response.status === 401) {
          onLogout();
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [userRole, onLogout]);

  return (
    <div className="dashboard-container animate-in">
      <header className="dashboard-header">
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Transaction Monitoring</h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.875rem' }}>Real-time audit log for {userRole}</p>
        </div>
        <Navbar activeView="transactions" onNavigate={onNavigate} onLogout={onLogout} userRole={userRole} />
      </header>

      <div className="filter-bar">
        <div className="filter-group">
          <label>Date Range</label>
          <input type="date" className="filter-input" defaultValue="2026-03-14" />
        </div>
        <div className="filter-group">
          <label>Employee ID</label>
          <input type="text" className="filter-input" placeholder="EMP-0000" />
        </div>
        <div className="filter-group">
          <label>Transaction Type</label>
          <select className="filter-input">
            <option>All Types</option>
            <option>Wire Transfer</option>
            <option>Cash Deposit</option>
            <option>Withdrawal</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Amount Range</label>
          <select className="filter-input">
            <option>All Amounts</option>
            <option>$0 - $1,000</option>
            <option>$1,000 - $10,000</option>
            <option>$10,000+</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Employee ID</th>
              <th>Customer Account</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx => (
              <tr key={tx.id}>
                <td className="emp-id">{tx.id}</td>
                <td>{tx.empId}</td>
                <td>{tx.customer}</td>
                <td>{tx.type}</td>
                <td className="tx-amount">{tx.amount}</td>
                <td>
                  <span className={`status-badge status-${tx.status.toLowerCase()}`}>
                    {tx.status}
                  </span>
                </td>
                <td style={{ color: 'var(--text-dim)' }}>{tx.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionMonitoring;
