import { useState } from 'react'

// Layout Components
import Login from './components/Login'
import Register from './components/Register'

// User Components
import UserDashboard from './components/UserDashboard'
import UserTransactions from './components/UserTransactions'

// Admin Components
import Dashboard from './components/Dashboard'
import TransactionMonitoring from './components/TransactionMonitoring'
import FraudAlerts from './components/FraudAlerts'
import ActivityLogs from './components/ActivityLogs'
import ReportsAnalytics from './components/ReportsAnalytics'
import AdminManagement from './components/AdminManagement'
import SystemSettings from './components/SystemSettings'

function App() {
  const storedRole = localStorage.getItem('role') || 'USER';
  const defaultView = localStorage.getItem('token')
    ? storedRole === 'ADMIN' ? 'dashboard' : 'user-home'
    : 'login';

  const [view, setView] = useState(defaultView);
  const [authMode, setAuthMode] = useState('login');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: storedRole,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateAuth = () => {
    const newErrors = {};
    if (authMode === 'register' && !form.name) newErrors.name = 'Full name is required';
    if (!form.email) newErrors.email = 'Email is required';
    if (!form.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateAuth()) {
      setIsLoading(true);
      setErrors({});
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: form.email, password: form.password }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', form.role);
          setToken(data.token);
          setIsLoading(false);
          // Route based on role selected at login
          setView(form.role === 'ADMIN' ? 'dashboard' : 'user-home');
        } else {
          const errorData = await response.json().catch(() => ({}));
          setErrors({ auth: errorData.message || 'Invalid credentials' });
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Login error:', error);
        setErrors({ auth: 'Connection to server failed' });
        setIsLoading(false);
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (validateAuth()) {
      setIsLoading(true);
      setErrors({});
      try {
        const endpoint = form.role === 'ADMIN' ? '/api/admin/register' : '/api/user/register';
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
        });

        if (response.ok) {
          setIsLoading(false);
          setAuthMode('login');
          setErrors({ auth: 'Registration successful! Please login.' });
        } else {
          const errorData = await response.json().catch(() => ({}));
          setErrors({ auth: errorData.message || 'Registration failed' });
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Registration error:', error);
        setErrors({ auth: 'Connection to server failed' });
        setIsLoading(false);
      }
    }
  };

  const handleLogout = () => {
    setView('login');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken('');
    setForm(prev => ({ ...prev, password: '' }));
  };

  const handleNavigate = (target) => {
    setView(target);
  };

  const renderView = () => {
    const userRole = form.role;

    // User (non-admin) views
    if (userRole === 'USER') {
      switch (view) {
        case 'user-home':
          return <UserDashboard userRole={userRole} onLogout={handleLogout} onNavigate={handleNavigate} />;
        case 'user-transactions':
          return <UserTransactions userRole={userRole} onLogout={handleLogout} onNavigate={handleNavigate} />;
        default:
          break;
      }
    }

    // Admin views
    if (userRole === 'ADMIN') {
      switch (view) {
        case 'dashboard':
          return <Dashboard userRole={userRole} onLogout={handleLogout} onNavigate={handleNavigate} />;
        case 'transactions':
          return <TransactionMonitoring userRole={userRole} onLogout={handleLogout} onNavigate={handleNavigate} />;
        case 'alerts':
          return <FraudAlerts userRole={userRole} onLogout={handleLogout} onNavigate={handleNavigate} />;
        case 'logs':
          return <ActivityLogs userRole={userRole} onLogout={handleLogout} onNavigate={handleNavigate} />;
        case 'reports':
          return <ReportsAnalytics userRole={userRole} onLogout={handleLogout} onNavigate={handleNavigate} />;
        case 'admin':
          return <AdminManagement userRole={userRole} onLogout={handleLogout} onNavigate={handleNavigate} />;
        case 'settings':
          return <SystemSettings userRole={userRole} onLogout={handleLogout} onNavigate={handleNavigate} />;
        default:
          break;
      }
    }

    // Auth views (login / register)
    return (
      <main className="glass-card animate-in">
        <div className="logo-container" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            width: '64px', height: '64px',
            background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))',
            borderRadius: '16px', margin: '0 auto',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#000', fontSize: '2rem', fontWeight: 'bold',
            boxShadow: '0 8px 20px rgba(202,138,4,0.3)',
          }}>
            B
          </div>
        </div>

        {errors.auth && (
          <div
            className="status-banner"
            style={{
              textAlign: 'center',
              marginBottom: '1rem',
              background: errors.auth.includes('successful') ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
              color: errors.auth.includes('successful') ? '#22c55e' : '#ef4444',
              padding: '0.5rem',
              borderRadius: '8px',
              fontSize: '0.875rem',
            }}
          >
            {errors.auth}
          </div>
        )}

        {authMode === 'login' ? (
          <Login
            form={form}
            errors={errors}
            isLoading={isLoading}
            onInputChange={handleInputChange}
            onSubmit={handleLogin}
            onToggleMode={() => { setAuthMode('register'); setErrors({}); }}
          />
        ) : (
          <Register
            form={form}
            errors={errors}
            isLoading={isLoading}
            onInputChange={handleInputChange}
            onSubmit={handleRegister}
            onToggleMode={() => { setAuthMode('login'); setErrors({}); }}
          />
        )}
      </main>
    );
  };

  return (
    <div className="app-container">
      <div className="bg-decoration">
        <div className="blob" style={{ top: '10%', left: '10%' }}></div>
        <div className="blob" style={{ bottom: '20%', right: '10%', background: '#1e40af' }}></div>
      </div>
      {renderView()}
    </div>
  );
}

export default App
