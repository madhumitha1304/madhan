import './index.css';

const About = () => {
  return (
    <div className="about-container glass-panel animate-fade-in">
      <h2 className="section-title">About <span className="title-gradient">Us</span></h2>
      
      <div className="about-content">
        <p className="about-text">
          NexusCore is dedicated to building the next generation of web development tools. 
          Our mission is to provide developers with the most performant, secure, and easily 
          scalable platform possible. We believe in the power of beautiful design combined 
          with extreme technical excellence.
        </p>
        
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-number">10x</span>
            <span className="stat-label">Faster Rendering</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">99.9%</span>
            <span className="stat-label">Uptime SLA</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Expert Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
