const Login = ({ form, errors, isLoading, onInputChange, onSubmit, onToggleMode }) => {
  return (
    <form onSubmit={onSubmit}>
      <h2 className="title">Bank Staff Portal</h2>
      <p className="subtitle">Enter your credentials to access the system</p>
      
      <div className="form-group">
        <label>Email Address</label>
        <input 
          type="email" 
          name="email"
          className="input-field" 
          placeholder="employee@mockbank.com"
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
          <option value="ADMIN">Admin</option>
          <option value="USER">User/Auditor</option>
        </select>
      </div>

      <button type="submit" className="btn-primary" disabled={isLoading}>
        {isLoading ? 'Verifying...' : 'Login Securely'}
      </button>

      <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-dim)' }}>
        Don't have an account? {' '}
        <span 
          onClick={onToggleMode} 
          style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: '500' }}
        >
          Register here
        </span>
      </p>
    </form>
  );
};

export default Login;
