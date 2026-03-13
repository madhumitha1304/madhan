import './index.css';

const Navbar = ({ activeTab, setActiveTab }) => {
  return (
    <header className="global-header glass-panel navbar-container">
      <div className="nav-logo" onClick={() => setActiveTab('home')}>
        Nexus<span className="title-gradient">Core</span>
      </div>
      <nav>
        <ul className="nav-links">
          <li>
            <button 
              onClick={() => setActiveTab('home')} 
              className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
            >
              Home
            </button>
          </li>
          <li>
            <button 
              onClick={() => setActiveTab('about')} 
              className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
            >
              About
            </button>
          </li>
          <li>
            <button 
              onClick={() => setActiveTab('form')} 
              className={`nav-link ${activeTab === 'form' ? 'active' : ''}`}
            >
              Form
            </button>
          </li>
        </ul>
      </nav>
      <button className="btn-primary nav-btn" onClick={() => setActiveTab('form')}>Get Started</button>
    </header>
  );
};

export default Navbar;
