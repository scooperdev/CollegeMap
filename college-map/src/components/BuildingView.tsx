import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/BuildingView.css';
import whitneyFloor1 from '../assets/whitney-floor1.png';

// Map of building images
const buildingImages = {
  'whitney': {
    'floor1': whitneyFloor1
  }
};

// buildings
const buildingNames = {
  'whitney': 'Whitney Building'
};

// dynamic buildingview component
const BuildingView = () => {
  const { buildingId } = useParams();
  const navigate = useNavigate();
  const [isZoomed, setIsZoomed] = useState(false);

  if (!buildingId || !buildingImages[buildingId]) {
    // redirect to building select and flash error message
    navigate('/buildings', {
      state: { error: `Invalid building ID: ${buildingId || 'none'}` }
    });
    return null;
  }

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
      <h1>{buildingNames[buildingId]} - First Floor</h1>
      <button className="zoom-button" onClick={toggleZoom}>
        {isZoomed ? 'Zoom Out' : 'Zoom In'}
      </button>
      <div className={`floor-plan ${isZoomed ? 'zoomed' : ''}`}>
        <img 
          src={buildingImages[buildingId].floor1}
          alt={`${buildingNames[buildingId]} Floor 1`} 
        />
      </div>
    </div>
  );
};

export default BuildingView;