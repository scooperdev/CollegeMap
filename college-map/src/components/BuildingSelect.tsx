import { useNavigate, useLocation } from 'react-router-dom';
import whitneyImage from '../assets/Sheridan-college-scaled-ChKQUY-864x380.jpeg';
import marsagImage from '../assets/marsag-thumbnail.jpg';
import '../styles/BuildingSelect.css';

const buildings = [
  {
    id: 'whitneyfloor1', 
    name: 'Whitney Building',
    description: 'Main academic center',
    image: whitneyImage,
    floors: [
      {
        number: 1,
        name: 'First Floor',
        image: 'whitney-floor1.png'
      }
    ]
  },
  {
    id: 'marsagfloor1',
    name: 'Mars Agriculture Building',
    description: 'Agriculture and technical programs',
    image: marsagImage,
    floors: [
      {
        number: 1,
        name: 'First Floor',
        image: 'marsag-floor1.png'
      },
      {
        number: 2,
        name: 'Second Floor',
        image: 'marsag-floor2.png'
      }
    ]
  }
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
            <img 
              src={building.image} 
              alt={building.name}
              className="building-image"
            />
            <div className="building-info">
              <h2>{building.name}</h2>
              <p>{building.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuildingSelect;