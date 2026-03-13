import heroOrb from '../../assets/hero-orb.png';
import Counter from '../counter';

const Home = () => {
  return (
    <div className="animate-fade-in">
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            Build the <br/>
            <span className="title-gradient">Future</span> of Web.
          </h1>
          <p>
            Experience unparalleled performance with our next-generation architecture. 
            Designed for scale, built for speed, tailored for developers who demand perfection.
          </p>
          <div className="hero-actions">
            <button className="btn-primary">Start Building</button>
            <button className="btn-secondary">View Documentation</button>
          </div>
        </div>
        
        <div className="hero-visual">
          <img src={heroOrb} alt="Abstract Interface" className="hero-image" />
        </div>
      </section>

      <Counter />

      <section id="features" className="features-section">
        <h2 className="section-title">Why Choose <span className="title-gradient">NexusCore</span>?</h2>
        <div className="features-grid">
          <div className="feature-card glass-panel">
            <h3>⚡ Lightning Fast</h3>
            <p>Compile times under 10ms. Our engine is optimized for instant feedback, keeping developers in the state of flow.</p>
          </div>
          <div className="feature-card glass-panel">
            <h3>🛡️ Enterprise Security</h3>
            <p>Bank-grade encryption built into the core. Your data is protected by the most advanced security protocols available.</p>
          </div>
          <div className="feature-card glass-panel">
            <h3>🔮 Infinite Scalability</h3>
            <p>Deploy to the edge instantly. Global distribution ensures your application performs flawlessly anywhere on Earth.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
