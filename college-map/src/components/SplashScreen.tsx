import { useNavigate } from 'react-router-dom';
import '../styles/SplashScreen.css';

const SplashScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="splash-container">
      <h1>Welcome to Sheridan College Interactive Map</h1>
      <p>Find your way around campus with our interactive room finder</p>
      <button 
        className="enter-button"
        onClick={() => navigate('/buildings')}
      >
        Enter Room Finder
      </button>
    </div>
  );
};

export default SplashScreen;
