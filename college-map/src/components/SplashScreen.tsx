import { useNavigate } from 'react-router-dom';
import '../styles/SplashScreen.css';

const SplashScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="splash-container">
      <h1>Welcome to SCIM!</h1>
      <p>Welcome to Sheridan College Interactive Map!</p>
      <p>Find your way around Campus with this interactive room finder / building browser!</p>
      <button 
        className="enter-button"
        onClick={() => navigate('/buildings')}
      >
        Enter Room Finder
      </button>
      <span className="credits">by Steven Cooper</span>
    </div>
  );
};

export default SplashScreen;
