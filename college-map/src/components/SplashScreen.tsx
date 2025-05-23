// splash "home" screen
import { useNavigate } from 'react-router-dom';
import RoomSearch from './RoomSearch';
import '../styles/SplashScreen.css';
import logo from '../assets/Sheridan_College_Logo-Blue.png';

const SplashScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="splash-container">
      <img 
        src={logo} 
        alt="Sheridan College Logo" 
        className="splash-logo"
      />
      <h1>Welcome to SCIM!</h1>
      <p>Welcome to Sheridan College Interactive Map!</p>
      <p>Find your way around Campus with this interactive room finder / building browser!</p>
      
      <RoomSearch />

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
