import { useState } from 'react';
import './App.css';
import Navbar from './components/navbar';
import Home from './components/home';
import About from './components/about';
import Form from './components/form';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <>
      <div className="bg-mesh"></div>
      
      <div className="container">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main style={{ marginTop: '4rem', paddingBottom: '4rem' }}>
          {activeTab === 'home' && <Home />}
          {activeTab === 'about' && <About />}
          {activeTab === 'form' && <Form />}
        </main>
      </div>
    </>
  );
}

export default App;
