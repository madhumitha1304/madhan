import { useState } from 'react';
import Navbar from './Navbar';

const SystemSettings = ({ userRole, onLogout, onNavigate }) => {
  const [settings, setSettings] = useState({
    txLimit: 50000,
    loginRestricted: true,
    riskThreshold: 75,
    autoLock: true,
    sessionTimeout: 30
  });

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="dashboard-container animate-in">
      <header className="dashboard-header">
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>System Settings</h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.875rem' }}>Configure fraud detection parameters</p>
        </div>
        <Navbar activeView="settings" onNavigate={onNavigate} onLogout={onLogout} userRole={userRole} />
      </header>

      <div className="settings-section">
        <div className="settings-card animate-in" style={{ animationDelay: '0.1s' }}>
          <h2 style={{ marginBottom: '24px', fontSize: '1.2rem', color: 'var(--primary)' }}>Detection Rules</h2>
          <div className="settings-group">
            <div className="setting-item">
              <div className="setting-info">
                <span className="setting-title">Transaction Limit Alert</span>
                <span className="setting-desc">Flag transactions exceeding this amount for manual review.</span>
              </div>
              <div className="setting-control">
                <input 
                  type="range" 
                  min="1000" 
                  max="100000" 
                  step="1000"
                  className="range-input" 
                  value={settings.txLimit}
                  onChange={(e) => handleChange('txLimit', e.target.value)}
                />
                <span className="setting-value">${Number(settings.txLimit).toLocaleString()}</span>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <span className="setting-title">Risk Scoring Threshold</span>
                <span className="setting-desc">Auto-investigate employees if risk score exceeds this %.</span>
              </div>
              <div className="setting-control">
                <input 
                  type="range" 
                  min="50" 
                  max="100" 
                  className="range-input" 
                  value={settings.riskThreshold}
                  onChange={(e) => handleChange('riskThreshold', e.target.value)}
                />
                <span className="setting-value">{settings.riskThreshold}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="settings-card animate-in" style={{ animationDelay: '0.2s' }}>
          <h2 style={{ marginBottom: '24px', fontSize: '1.2rem', color: 'var(--primary)' }}>Access Control</h2>
          <div className="settings-group">
            <div className="setting-item">
              <div className="setting-info">
                <span className="setting-title">Login Time Restrictions</span>
                <span className="setting-desc">Restrict staff access to standard business hours (9AM-6PM).</span>
              </div>
              <div className="setting-control">
                <div 
                  className={`toggle-switch ${settings.loginRestricted ? 'active' : ''}`}
                  onClick={() => handleChange('loginRestricted', !settings.loginRestricted)}
                >
                  <div className="toggle-knob"></div>
                </div>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <span className="setting-title">Session Timeout (minutes)</span>
                <span className="setting-desc">Automatic logout after period of inactivity.</span>
              </div>
              <div className="setting-control">
                <select 
                  className="filter-input" 
                  style={{ width: '100px' }}
                  value={settings.sessionTimeout}
                  onChange={(e) => handleChange('sessionTimeout', e.target.value)}
                >
                  <option value="15">15 min</option>
                  <option value="30">30 min</option>
                  <option value="60">60 min</option>
                </select>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <span className="setting-title">Automatic Account Lockout</span>
                <span className="setting-desc">Lock account after 3 failed login attempts.</span>
              </div>
              <div className="setting-control">
                <div 
                  className={`toggle-switch ${settings.autoLock ? 'active' : ''}`}
                  onClick={() => handleChange('autoLock', !settings.autoLock)}
                >
                  <div className="toggle-knob"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '32px' }}>
        <button className="btn-primary" style={{ width: 'auto', padding: '12px 32px' }}>
          Save Configuration
        </button>
      </div>
    </div>
  );
};

export default SystemSettings;
