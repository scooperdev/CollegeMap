// search component for room finder search logic
import { useState, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchRoom } from '../db/index.mts';
import Notification from './Notification';
import '../styles/RoomSearch.css';
import '../styles/Notification.css';

interface RoomSearchProps {
  compact?: boolean;
}

interface RoomMatch {
  id: string;
  building_id: string;
  room_number: string;
  building_name: string;
}

const RoomSearch = ({ compact = false }: RoomSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [matches, setMatches] = useState<RoomMatch[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [notification, setNotification] = useState({ message: '', show: false });
  const navigate = useNavigate();

  const handleRoomSelect = (match: RoomMatch) => {
    navigate(`/building/${match.building_id}`, {
      state: { highlightedRoom: match.id }
    });
    setShowPopup(false);
    setMatches([]);
    setSearchTerm('');
    
    // pop up notification for confirmation of room search being in a building
    setNotification({
      message: `Room ${match.room_number} is in ${match.building_name}!`,
      show: true
    });
    
    // hide popup after 10 seconds
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 10000);
  };

  const handleDismissNotification = () => {
    setNotification(prev => ({ ...prev, show: false }));
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError('Please enter a room number or name');
      return;
    }

    try {
      const results = await searchRoom(searchTerm);
      if (results.length > 1) {
        setMatches(results);
        setShowPopup(true);
        setError('');
      } else if (results.length === 1) {
        handleRoomSelect(results[0]);
      } else {
        setError('Room not found');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Error searching for room');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`room-search ${compact ? 'compact' : ''}`}>
      <Notification 
        message={notification.message}
        isVisible={notification.show}
        onDismiss={handleDismissNotification}
      />
      <div className="search-input-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter room name / no. (e.g. 101)"
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          🔍
        </button>
      </div>
      {error && <div className="search-error">{error}</div>}
      
      {showPopup && matches.length > 0 && ( // highlight room if found in search
        <div className="room-matches-popup">
          <h3>Multiple matches found:</h3>
          <div className="room-matches-list">
            {matches.map((match) => (
              <button
                key={match.id}
                className="room-match-button"
                onClick={() => handleRoomSelect(match)}
              >
                Room {match.room_number} in {match.building_name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomSearch;