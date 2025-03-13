import { useNavigate } from 'react-router-dom';
import RoomSearch from './RoomSearch';
import '../styles/Header.css';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="site-header">
      <div className="header-left">
        <button onClick={() => navigate('/')} className="header-button">
          Home
        </button>
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