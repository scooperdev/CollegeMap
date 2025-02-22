import { useParams, useNavigate } from 'react-router-dom';
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

  if (!buildingId || !buildingImages[buildingId]) {
    // redirect to building select and flash error message
    navigate('/buildings', {
      state: { error: `Invalid building ID: ${buildingId || 'none'}` }
    });
    return null;
  }

  return (
    <div className="building-container">
      <h1>{buildingNames[buildingId]} - First Floor</h1>
      <div className="floor-plan">
        <img 
          src={buildingImages[buildingId].floor1}
          alt={`${buildingNames[buildingId]} Floor 1`} 
        />
      </div>
    </div>
  );
};

export default BuildingView;