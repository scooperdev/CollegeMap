import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import '../styles/BuildingView.css';
import whitneyFloor1 from '../assets/whitney-floor1.png';
import whitneyFloor2 from '../assets/whitney-floor2.png';
import RoomOverlay from './RoomOverlay';
import { whitney1Coordinates, whitney2Coordinates } from '../data/roomCoordinates';

const buildingData = {
  'whitneyfloor1': {
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
  },
  'whitneyfloor2': {
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
  const location = useLocation();
  const navigate = useNavigate();
  const [highlightedRoomId, setHighlightedRoomId] = useState<string | null>(
    location.state?.highlightedRoom || null
  );
  const [isZoomed, setIsZoomed] = useState(false);
  const [currentFloor, setCurrentFloor] = useState(() => {
    if (buildingId === 'whitneyfloor2') return 2;
    return 1;
  });
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [devMode, setDevMode] = useState(false);

  if (!buildingId || !buildingData[buildingId]) {
    navigate('/buildings');
    return null;
  }

  const building = buildingData[buildingId];
  const maxFloor = Math.max(...Object.keys(building.floors).map(Number));

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isZoomed) {
      setIsDragging(true);
      setStartPos({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    e.preventDefault(); 
    if (isDragging && isZoomed) {
      setPosition({
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomSensitivity = 0.001;
    const delta = -e.deltaY * zoomSensitivity;
    
    if (isZoomed || e.ctrlKey) {
      const newScale = Math.min(Math.max(0.5, scale * (1 + delta)), 4);
      
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const scaleChange = newScale - scale;
        setPosition({
          x: position.x - (mouseX - rect.width / 2) * (scaleChange / scale),
          y: position.y - (mouseY - rect.height / 2) * (scaleChange / scale)
        });
      }
      
      setScale(newScale);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const preventDefaultScroll = (e: WheelEvent) => {
        if (isZoomed || e.ctrlKey) {
          e.preventDefault();
        }
      };
      container.addEventListener('wheel', preventDefaultScroll, { passive: false });
      return () => {
        container.removeEventListener('wheel', preventDefaultScroll);
      };
    }
  }, [isZoomed]);

  const handleFloorChange = (newFloor: number) => {
    setCurrentFloor(newFloor);
    const newBuildingId = newFloor === 2 ? 'whitneyfloor2' : 'whitneyfloor1';
    navigate(`/building/${newBuildingId}`);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
    setScale(isZoomed ? 1 : 2);
    setPosition({ x: 0, y: 0 });
  };

  const handleRoomClick = (room: RoomCoordinate) => {
    setHighlightedRoomId(room.id);
    console.log(`Clicked room: ${room.label}`);
  };

  const handleDevClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!devMode) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate percentages
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    
    console.log(`Clicked at: x: ${Math.round(percentX)}%, y: ${Math.round(percentY)}%`);
  };

  const getCoordinatesForCurrentFloor = () => {
    return currentFloor === 2 ? whitney2Coordinates : whitney1Coordinates;
  };

  return (
    <div className="building-container">      
      <h1>{building.name} - {building.floors[currentFloor].name}</h1>
      
      <div className="floor-controls">
        {currentFloor < maxFloor && (
          <button 
            className="floor-button"
            onClick={() => handleFloorChange(currentFloor + 1)}
          >
            Go Up to Floor {currentFloor + 1}
          </button>
        )}
        {currentFloor > 1 && (
          <button 
            className="floor-button"
            onClick={() => handleFloorChange(currentFloor - 1)}
          >
            Go Down to Floor {currentFloor - 1}
          </button>
        )}
      </div>

      <div 
        ref={containerRef}
        className={`floor-plan ${isZoomed ? 'zoomed' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <div 
          className="floor-plan-content"
          onClick={handleDevClick}
          style={{
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
            cursor: isDragging ? 'grabbing' : (isZoomed ? 'grab' : 'default'),
            position: 'relative'
          }}
        >
          <img 
            src={building.floors[currentFloor].image}
            alt={`${building.name} ${building.floors[currentFloor].name}`}
          />
          
          {getCoordinatesForCurrentFloor().map((room) => (
            <RoomOverlay
              key={room.id}
              room={room}
              onClick={handleRoomClick}
              isHighlighted={room.id === highlightedRoomId}
            />
          ))}
        </div>
      </div>

      <button className="zoom-button" onClick={toggleZoom}>
        {isZoomed ? 'Reset View' : 'Zoom In'}
      </button>
      <button className="dev-button" onClick={() => setDevMode(!devMode)}>
        {devMode ? 'Dev Mode: ON' : 'Dev Mode: OFF'}
      </button>
    </div>
  );
};

export default BuildingView;