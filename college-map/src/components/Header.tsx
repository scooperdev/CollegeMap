import { useNavigate } from 'react-router-dom';
import RoomSearch from './RoomSearch';
import '../styles/Header.css';
import logo from '../assets/Sheridan_College_Logo-Blue.png';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="site-header">
      <div className="header-left">
        <img 
          src={logo} 
          alt="Sheridan College Logo" 
          className="header-logo" 
          onClick={() => navigate('/')}
        />
        <button onClick={() => navigate('/buildings')} className="header-button">
          Buildings
        </button>
      </div>
      <div className="header-center">
        <RoomSearch compact={true} />
      </div>
    </header>
  );
};

export default Header;