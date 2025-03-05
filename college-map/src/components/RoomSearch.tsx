import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchRoom } from '../db/index.mts';
import '../styles/RoomSearch.css';

const RoomSearch = () => {
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

  return (
    <div className="room-search">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter room name / no. (e.g. 101)"
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Find Room
      </button>
      {error && <div className="search-error">{error}</div>}
    </div>
  );
};

export default RoomSearch;