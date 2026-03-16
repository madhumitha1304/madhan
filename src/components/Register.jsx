import React from 'react';

const Register = ({ form, errors, isLoading, onInputChange, onSubmit, onToggleMode }) => {
  return (
    <form onSubmit={onSubmit}>
      <h2 className="title">Join Bank Staff Portal</h2>
      <p className="subtitle">Create your account to access the system</p>
      
      <div className="form-group">
        <label>Full Name</label>
        <input 
          type="text" 
          name="name"
          className="input-field" 
          placeholder="John Doe"
          value={form.name}
          onChange={onInputChange}
        />
        {errors.name && <p className="error-msg">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label>Email Address</label>
        <input 
          type="email" 
          name="email"
          className="input-field" 
          placeholder="john.doe@mockbank.com"
          value={form.email}
          onChange={onInputChange}
        />
        {errors.email && <p className="error-msg">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label>Password</label>
        <input 
          type="password" 
          name="password"
          className="input-field" 
          placeholder="••••••••"
          value={form.password}
          onChange={onInputChange}
        />
        {errors.password && <p className="error-msg">{errors.password}</p>}
      </div>

      <div className="form-group">
        <label>Role Selection</label>
        <select 
          name="role"
          className="input-field"
          value={form.role}
          onChange={onInputChange}
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>

      <button type="submit" className="btn-primary" disabled={isLoading}>
        {isLoading ? 'Creating Account...' : 'Register Now'}
      </button>

      <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-dim)' }}>
        Already have an account? {' '}
        <span 
          onClick={onToggleMode} 
          style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: '500' }}
        >
          Login here
        </span>
      </p>
    </form>
  );
};

export default Register;
