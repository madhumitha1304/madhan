import { useState, useEffect } from 'react';
import Navbar from './Navbar';

const UserTransactions = ({ userRole, onLogout, onNavigate }) => {
  const [transactions, setTransactions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('ALL');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/user/transactions', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          const sorted = [...data].sort(
            (a, b) => new Date(b.transactionTime) - new Date(a.transactionTime)
          );
          setTransactions(sorted);
          setFiltered(sorted);
        } else if (response.status === 401) {
          onLogout();
        }
      } catch (err) {
        console.error('Error fetching user transactions:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransactions();
  }, [onLogout]);

  useEffect(() => {
    if (typeFilter === 'ALL') {
      setFiltered(transactions);
    } else {
      setFiltered(transactions.filter((tx) => tx.transactionType === typeFilter));
    }
  }, [typeFilter, transactions]);

  const formatAmount = (amt) =>
    amt !== undefined
      ? `$${Number(amt).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : '$0.00';

  const formatDateTime = (dt) => {
    if (!dt) return '—';
    const d = new Date(dt);
    return d.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const totalDeposits = transactions
    .filter((tx) => tx.transactionType === 'DEPOSIT')
    .reduce((sum, tx) => sum + (tx.amount || 0), 0);
  const totalWithdrawals = transactions
    .filter((tx) => tx.transactionType === 'WITHDRAW')
    .reduce((sum, tx) => sum + (tx.amount || 0), 0);

  return (
    <div className="dashboard-container animate-in">
      <header className="dashboard-header">
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>My Transactions</h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.875rem' }}>
            {transactions.length} total transaction{transactions.length !== 1 ? 's' : ''} on your account
          </p>
        </div>
        <Navbar activeView="user-transactions" onNavigate={onNavigate} onLogout={onLogout} userRole={userRole} />
      </header>

      {/* Summary Cards */}
      <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="stat-card">
          <span className="stat-label">Total Transactions</span>
          <span className="stat-value">{transactions.length}</span>
          <div className="stat-trend">
            <span style={{ color: 'var(--text-dim)' }}>All time</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total Deposited</span>
          <span className="stat-value" style={{ color: '#22c55e', fontSize: '1.4rem' }}>{formatAmount(totalDeposits)}</span>
          <div className="stat-trend trend-up">
            <span>↑ DEPOSIT</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total Withdrawn</span>
          <span className="stat-value" style={{ color: '#ef4444', fontSize: '1.4rem' }}>{formatAmount(totalWithdrawals)}</span>
          <div className="stat-trend trend-down">
            <span>↓ WITHDRAW</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="filter-group">
          <label>Transaction Type</label>
          <select
            className="filter-input"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="ALL">All Types</option>
            <option value="DEPOSIT">Deposits Only</option>
            <option value="WITHDRAW">Withdrawals Only</option>
          </select>
        </div>
        <div className="filter-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', paddingBottom: '10px' }}>
            Showing {filtered.length} of {transactions.length} transactions
          </span>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="table-container" style={{ marginTop: 0 }}>
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-dim)' }}>
            Loading your transactions...
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-dim)' }}>
            {transactions.length === 0 ? 'No transactions yet.' : 'No transactions match this filter.'}
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx) => (
                <tr key={tx.id}>
                  <td className="emp-id">#{tx.id}</td>
                  <td>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        background:
                          tx.transactionType === 'DEPOSIT'
                            ? 'rgba(34,197,94,0.15)'
                            : 'rgba(239,68,68,0.15)',
                        color: tx.transactionType === 'DEPOSIT' ? '#22c55e' : '#ef4444',
                      }}
                    >
                      {tx.transactionType === 'DEPOSIT' ? '⬆' : '⬇'} {tx.transactionType}
                    </span>
                  </td>
                  <td
                    className="tx-amount"
                    style={{
                      color: tx.transactionType === 'DEPOSIT' ? '#22c55e' : '#ef4444',
                    }}
                  >
                    {tx.transactionType === 'DEPOSIT' ? '+' : '-'}{formatAmount(tx.amount)}
                  </td>
                  <td style={{ color: 'var(--text-dim)' }}>{formatDateTime(tx.transactionTime)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserTransactions;
