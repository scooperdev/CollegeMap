import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/BuildingSelect.css';

const buildings = [
  {
    id: 'whitney',
    name: 'Whitney Building',
    description: 'Main academic center',
    floors: [
      {
        number: 1,
        name: 'First Floor',
        image: 'whitney-floor1.png'
      }
      // Add more floors here later
    ]
  }
  // Add more buildings here later=
];

const BuildingSelect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const error = location.state?.error;

  return (
    <div className="building-select-container">
      <h1>Select a Building</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="buildings-grid">
        {buildings.map((building) => (
          <div 
            key={building.id}
            className="building-card"
            onClick={() => navigate(`/building/${building.id}`)}
          >
            <h2>{building.name}</h2>
            <p>{building.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuildingSelect;