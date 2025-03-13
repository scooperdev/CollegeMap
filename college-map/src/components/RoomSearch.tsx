import { useState, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchRoom } from '../db/index.mts';
import '../styles/RoomSearch.css';

interface RoomSearchProps {
  compact?: boolean;
}

const RoomSearch = ({ compact = false }: RoomSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError('Please enter a room number or name');
      return;
    }

    try {
      const result = await searchRoom(searchTerm);
      if (result) {
        navigate(`/building/${result.building_id}`, {
          state: { highlightedRoom: result.id }
        });
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
    </div>
  );
};

export default RoomSearch;