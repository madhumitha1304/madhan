import { useState, useEffect } from 'react';
import './index.css';

const Form = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (isSubmitted) {
      timeoutId = setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 3000);
    }
    return () => clearTimeout(timeoutId);
  }, [isSubmitted]);

  // Load from local storage on first render
  useEffect(() => {
    const savedData = localStorage.getItem('contactFormData');
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (e) {
        console.error('Failed to parse storage');
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('contactFormData', JSON.stringify(formData));
    alert('Saved to local storage!');
  };

  const handleDelete = () => {
    localStorage.removeItem('contactFormData');
    setFormData({ name: '', email: '', message: '' });
    alert('Storage cleared!');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    localStorage.removeItem('contactFormData'); // Automatically clear when sent
  };

  return (
    <div className="form-container glass-panel animate-fade-in">
      <h2 className="section-title">Get in <span className="title-gradient">Touch</span></h2>

      {isSubmitted ? (
        <div className="success-message">
          <div className="success-icon">✓</div>
          <h3>Message Sent!</h3>
          <p>We'll get back to you as soon as possible.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="form-input"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              className="form-input form-textarea"
              placeholder="How can we help you?"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            ></textarea>
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="button" className="btn-secondary" onClick={handleSave} style={{ flex: 1 }}>Save</button>
            <button type="button" className="btn-secondary" onClick={handleDelete} style={{ flex: 1, borderColor: '#ff4444', color: '#ff4444' }}>Delete</button>
          </div>
          <button type="submit" className="btn-primary form-submit" style={{ marginTop: '0.5rem' }}>Send Message</button>
        </form>
      )}
    </div>
  );
};

export default Form;
