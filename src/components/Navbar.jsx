const Navbar = ({ activeView, onNavigate, onLogout, userRole }) => {
  const isAdmin = userRole === 'ADMIN';

  return (
    <div className="nav-bar">
      {isAdmin ? (
        <>
          <button
            className={`nav-item ${activeView === 'dashboard' ? 'active' : ''}`}
            onClick={() => onNavigate('dashboard')}
          >
            Overview
          </button>
          <button
            className={`nav-item ${activeView === 'transactions' ? 'active' : ''}`}
            onClick={() => onNavigate('transactions')}
          >
            Transactions
          </button>
          <button
            className={`nav-item ${activeView === 'admin' ? 'active' : ''}`}
            onClick={() => onNavigate('admin')}
          >
            Users
          </button>
          <button
            className={`nav-item ${activeView === 'alerts' ? 'active' : ''}`}
            onClick={() => onNavigate('alerts')}
          >
            Alerts
          </button>
          <button
            className={`nav-item ${activeView === 'reports' ? 'active' : ''}`}
            onClick={() => onNavigate('reports')}
          >
            Reports
          </button>
          <button
            className={`nav-item ${activeView === 'settings' ? 'active' : ''}`}
            onClick={() => onNavigate('settings')}
          >
            Settings
          </button>
        </>
      ) : (
        <>
          <button
            className={`nav-item ${activeView === 'user-home' ? 'active' : ''}`}
            onClick={() => onNavigate('user-home')}
          >
            My Account
          </button>
          <button
            className={`nav-item ${activeView === 'user-transactions' ? 'active' : ''}`}
            onClick={() => onNavigate('user-transactions')}
          >
            Transactions
          </button>
        </>
      )}
      <button
        onClick={onLogout}
        className="btn-primary"
        style={{ padding: '8px 16px', fontSize: '0.8rem', width: 'auto', marginTop: 0 }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Navbar;
