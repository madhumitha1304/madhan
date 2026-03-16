import { useState, useEffect } from 'react';
import Navbar from './Navbar';

const UserDashboard = ({ userRole, onLogout, onNavigate }) => {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'success'|'error', text: '' }
  const [recentTx, setRecentTx] = useState([]);
  const [isFetchingTx, setIsFetchingTx] = useState(true);

  const getToken = () => localStorage.getItem('token');

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const response = await fetch('/api/user/transactions', {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        if (response.ok) {
          const data = await response.json();
          setRecentTx(data.slice(-5).reverse()); // show last 5
        } else if (response.status === 401) {
          onLogout();
        }
      } catch (err) {
        console.error('Fetch recent tx error:', err);
      } finally {
        setIsFetchingTx(false);
      }
    };
    fetchRecent();
  }, [onLogout]);

  const handleTransaction = async (type) => {
    const parsed = parseFloat(amount);
    if (!amount || isNaN(parsed) || parsed <= 0) {
      setMessage({ type: 'error', text: 'Please enter a valid positive amount.' });
      return;
    }
    setIsLoading(true);
    setMessage(null);
    try {
      const endpoint = type === 'deposit' ? '/api/user/deposit' : '/api/user/withdraw';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ amount: parsed }),
      });

      if (response.ok) {
        const text = await response.text();
        setMessage({ type: 'success', text: text || `${type === 'deposit' ? 'Deposit' : 'Withdrawal'} successful!` });
        setAmount('');
        // Refresh recent transactions
        const txRes = await fetch('/api/user/transactions', {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        if (txRes.ok) {
          const data = await txRes.json();
          setRecentTx(data.slice(-5).reverse());
        }
      } else if (response.status === 401) {
        onLogout();
      } else {
        const errText = await response.text().catch(() => '');
        setMessage({ type: 'error', text: errText || 'Transaction failed. Please try again.' });
      }
    } catch (err) {
      console.error('Transaction error:', err);
      setMessage({ type: 'error', text: 'Connection error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const formatAmount = (amt) =>
    amt !== undefined && amt !== null
      ? `$${Number(amt).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : '$0.00';

  const formatTime = (dt) => {
    if (!dt) return '—';
    const d = new Date(dt);
    return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="dashboard-container animate-in">
      <header className="dashboard-header">
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>My Account</h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.875rem' }}>Welcome back! Manage your banking here.</p>
        </div>
        <Navbar activeView="user-home" onNavigate={onNavigate} onLogout={onLogout} userRole={userRole} />
      </header>

      {/* Transaction Panel */}
      <div className="user-panel-grid">
        <div className="chart-container" style={{ flex: 1 }}>
          <h3 style={{ marginBottom: '6px', fontSize: '1.1rem' }}>💵 Make a Transaction</h3>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginBottom: '20px' }}>
            Deposit or withdraw funds from your account
          </p>

          {message && (
            <div
              style={{
                padding: '10px 16px',
                borderRadius: '10px',
                marginBottom: '16px',
                fontSize: '0.875rem',
                fontWeight: '500',
                background: message.type === 'success' ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
                color: message.type === 'success' ? '#22c55e' : '#ef4444',
                border: `1px solid ${message.type === 'success' ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
              }}
            >
              {message.type === 'success' ? '✓ ' : '✗ '}{message.text}
            </div>
          )}

          <div className="form-group">
            <label>Amount (USD)</label>
            <div style={{ position: 'relative' }}>
              <span
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-dim)',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                }}
              >
                $
              </span>
              <input
                type="number"
                className="input-field"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                step="0.01"
                style={{ paddingLeft: '30px' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <button
              className="btn-primary"
              style={{
                flex: 1,
                marginTop: 0,
                background: 'linear-gradient(135deg, #16a34a, #22c55e)',
                color: '#fff',
                opacity: isLoading ? 0.6 : 1,
              }}
              disabled={isLoading}
              onClick={() => handleTransaction('deposit')}
            >
              {isLoading ? '⏳ Processing...' : '⬆ Deposit'}
            </button>
            <button
              className="btn-primary"
              style={{
                flex: 1,
                marginTop: 0,
                background: 'linear-gradient(135deg, #dc2626, #ef4444)',
                color: '#fff',
                opacity: isLoading ? 0.6 : 1,
              }}
              disabled={isLoading}
              onClick={() => handleTransaction('withdraw')}
            >
              {isLoading ? '⏳ Processing...' : '⬇ Withdraw'}
            </button>
          </div>

          <div
            style={{
              marginTop: '20px',
              padding: '14px',
              borderRadius: '12px',
              background: 'rgba(202,138,4,0.07)',
              border: '1px solid rgba(202,138,4,0.2)',
              fontSize: '0.78rem',
              color: 'var(--text-dim)',
              lineHeight: '1.6',
            }}
          >
            ⚠ Withdrawals are subject to fraud detection review. Large amounts may be flagged for manual approval.
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="chart-container" style={{ flex: 1 }}>
          <h3 style={{ marginBottom: '6px', fontSize: '1.1rem' }}>🕒 Recent Transactions</h3>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginBottom: '16px' }}>
            Your last 5 transactions
          </p>

          {isFetchingTx ? (
            <div style={{ textAlign: 'center', color: 'var(--text-dim)', padding: '2rem' }}>Loading...</div>
          ) : recentTx.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-dim)', padding: '2rem' }}>
              No transactions yet. Make your first deposit!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {recentTx.map((tx, idx) => (
                <div
                  key={tx.id || idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 16px',
                    background: 'rgba(0,0,0,0.25)',
                    borderRadius: '10px',
                    border: '1px solid var(--glass-border)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '1.4rem' }}>
                      {tx.transactionType === 'DEPOSIT' ? '⬆' : '⬇'}
                    </span>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '0.875rem' }}>
                        {tx.transactionType === 'DEPOSIT' ? 'Deposit' : 'Withdrawal'}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                        {formatTime(tx.transactionTime)}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      fontWeight: '700',
                      fontSize: '1rem',
                      color: tx.transactionType === 'DEPOSIT' ? '#22c55e' : '#ef4444',
                    }}
                  >
                    {tx.transactionType === 'DEPOSIT' ? '+' : '-'}{formatAmount(tx.amount)}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <button className="link-btn" onClick={() => onNavigate('user-transactions')}>
              View All Transactions →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
