import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/BuildingView.css';
import whitneyFloor1 from '../assets/whitney-floor1.png';
import whitneyFloor2 from '../assets/whitney-floor2.png';

const buildingData = {
  'whitneyfloor1': {  // Changed from 'whitney' to 'whitneyfloor1'
    name: 'Whitney Building',
    floors: {
      1: {
        image: whitneyFloor1,
        name: 'First Floor'
      },
      2: {
        image: whitneyFloor2,
        name: 'Second Floor'
      }
    }
  }
};

const BuildingView = () => {
  const { buildingId } = useParams();
  const navigate = useNavigate();
  const [isZoomed, setIsZoomed] = useState(false);
  const [currentFloor, setCurrentFloor] = useState(1);

  if (!buildingId || !buildingData[buildingId]) {
    navigate('/buildings', {
      state: { error: `Invalid building ID: ${buildingId || 'none'}` }
    });
    return null;
  }

  const building = buildingData[buildingId];
  const maxFloor = Math.max(...Object.keys(building.floors).map(Number));

  const changeFloor = (newFloor: number) => {
    if (newFloor >= 1 && newFloor <= maxFloor) {
      setCurrentFloor(newFloor);
    }
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="building-container">
      <button 
        className="back-button"
        onClick={() => navigate('/buildings')}
      >
        Back to Buildings
      </button>
      
      <h1>{building.name} - {building.floors[currentFloor].name}</h1>
      
      <div className="floor-controls">
        {currentFloor < maxFloor && (
          <button 
            className="floor-button"
            onClick={() => changeFloor(currentFloor + 1)}
          >
            Go Up to Floor {currentFloor + 1}
          </button>
        )}
        {currentFloor > 1 && (
          <button 
            className="floor-button"
            onClick={() => changeFloor(currentFloor - 1)}
          >
            Go Down to Floor {currentFloor - 1}
          </button>
        )}
      </div>

      <button className="zoom-button" onClick={toggleZoom}>
        {isZoomed ? 'Zoom Out' : 'Zoom In'}
      </button>
      
      <div className={`floor-plan ${isZoomed ? 'zoomed' : ''}`}>
        <img 
          src={building.floors[currentFloor].image}
          alt={`${building.name} ${building.floors[currentFloor].name}`} 
        />
      </div>
    </div>
  );
};

export default BuildingView;