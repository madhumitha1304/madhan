import { useState, useEffect } from 'react';
import Navbar from './Navbar';

const AdminManagement = ({ userRole, onLogout, onNavigate }) => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '' });
  const [registerRole, setRegisterRole] = useState('USER');
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerMsg, setRegisterMsg] = useState(null);

  const getToken = () => localStorage.getItem('token');

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/users', {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (response.ok) {
        const data = await response.json();
        setEmployees(
          data.map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: true,
          }))
        );
      } else if (response.status === 401) {
        onLogout();
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleStatus = (id) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, status: !emp.status } : emp))
    );
  };

  const handleRegisterInput = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!registerForm.name || !registerForm.email || !registerForm.password) {
      setRegisterMsg({ type: 'error', text: 'All fields are required.' });
      return;
    }
    setRegisterLoading(true);
    setRegisterMsg(null);
    try {
      const endpoint =
        registerRole === 'ADMIN' ? '/api/admin/register' : '/api/user/register';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(registerForm),
      });

      if (response.ok) {
        setRegisterMsg({ type: 'success', text: `${registerRole} account created successfully!` });
        setRegisterForm({ name: '', email: '', password: '' });
        await fetchUsers(); // refresh user list
        setTimeout(() => {
          setShowModal(false);
          setRegisterMsg(null);
        }, 1500);
      } else {
        const text = await response.text().catch(() => '');
        setRegisterMsg({ type: 'error', text: text || 'Registration failed.' });
      }
    } catch (err) {
      setRegisterMsg({ type: 'error', text: 'Connection error.' });
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <div className="dashboard-container animate-in">
      <header className="dashboard-header">
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>User Management</h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.875rem' }}>
            {employees.length} registered user{employees.length !== 1 ? 's' : ''} in system
          </p>
        </div>
        <Navbar activeView="admin" onNavigate={onNavigate} onLogout={onLogout} userRole={userRole} />
      </header>

      <div className="admin-actions-bar">
        <button
          className="btn-primary"
          style={{ width: 'auto', padding: '10px 20px' }}
          onClick={() => { setShowModal(true); setRegisterMsg(null); }}
        >
          + Register New User
        </button>
      </div>

      <div className="table-container" style={{ marginTop: 0 }}>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Full Name</th>
              <th>Email Address</th>
              <th>Role</th>
              <th>Account Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-dim)' }}>
                  {isLoading ? 'Loading users...' : 'No users found.'}
                </td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp.id}>
                  <td className="emp-id">#{emp.id}</td>
                  <td style={{ fontWeight: '500' }}>{emp.name}</td>
                  <td style={{ color: 'var(--text-dim)' }}>{emp.email}</td>
                  <td>
                    <span className={`role-badge ${emp.role?.toLowerCase()}`}>
                      {emp.role}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        className={`toggle-switch ${emp.status ? 'active' : ''}`}
                        onClick={() => toggleStatus(emp.id)}
                      >
                        <div className="toggle-knob"></div>
                      </div>
                      <span style={{ fontSize: '0.8rem', color: emp.status ? '#22c55e' : 'var(--text-dim)' }}>
                        {emp.status ? 'Active' : 'Disabled'}
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Register New User Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal-card">
            <button className="modal-close" onClick={() => setShowModal(false)}>
              ✕
            </button>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '6px' }}>
              Register New Account
            </h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginBottom: '20px' }}>
              Create a new user or admin account in the system
            </p>

            {registerMsg && (
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  fontSize: '0.85rem',
                  fontWeight: '500',
                  background: registerMsg.type === 'success' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                  color: registerMsg.type === 'success' ? '#22c55e' : '#ef4444',
                  border: `1px solid ${registerMsg.type === 'success' ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
                }}
              >
                {registerMsg.type === 'success' ? '✓ ' : '✗ '}{registerMsg.text}
              </div>
            )}

            <form onSubmit={handleRegisterSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="input-field"
                  placeholder="John Doe"
                  value={registerForm.name}
                  onChange={handleRegisterInput}
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="input-field"
                  placeholder="user@mockbank.com"
                  value={registerForm.email}
                  onChange={handleRegisterInput}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="input-field"
                  placeholder="••••••••"
                  value={registerForm.password}
                  onChange={handleRegisterInput}
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select
                  className="input-field"
                  value={registerRole}
                  onChange={(e) => setRegisterRole(e.target.value)}
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              <button
                type="submit"
                className="btn-primary"
                disabled={registerLoading}
                style={{ opacity: registerLoading ? 0.6 : 1 }}
              >
                {registerLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManagement;
