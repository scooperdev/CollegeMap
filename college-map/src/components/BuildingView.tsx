// building view component, displays the floor plan of a building and allows user to zoom in and out,
// drag the view, and click on rooms to see more information about them; the core of the app.
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import '../styles/BuildingView.css';
import whitneyFloor1 from '../assets/whitney-floor1.png';
import whitneyFloor2 from '../assets/whitney-floor2.png';
import marsagFloor1 from '../assets/marsag-floor1.png';
import marsagFloor2 from '../assets/marsag-floor2.png';
import RoomOverlay from './RoomOverlay';
import { whitney1Coordinates, whitney2Coordinates, marsag1Coordinates, marsag2Coordinates } from '../data/roomCoordinates';

interface InfoBoxPosition {
  x: number;
  y: number;
}

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
  },
  'marsagfloor1': {
    name: 'Mars Agriculture Building',
    floors: {
      1: {
        image: marsagFloor1,
        name: 'First Floor'
      },
      2: {
        image: marsagFloor2,
        name: 'Second Floor'
      }
    }
  },
  'marsagfloor2': {
    name: 'Mars Agriculture Building',
    floors: {
      1: {
        image: marsagFloor1,
        name: 'First Floor'
      },
      2: {
        image: marsagFloor2,
        name: 'Second Floor'
      }
    }
  }
};

// set parameters for scaling, position, building data and zoom/drag functionality
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
  const [showInfoBox, setShowInfoBox] = useState(false);
  const [infoBoxPosition, setInfoBoxPosition] = useState<InfoBoxPosition>({ x: 0, y: 0 });
  const [selectedRoom, setSelectedRoom] = useState<RoomCoordinate | null>(null);

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

  useEffect(() => { // change default scroll for zoom behavior
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

  // floor switching functionality
  const handleFloorChange = (newFloor: number) => {
    setCurrentFloor(newFloor);
    const buildingBase = buildingId?.includes('marsag') ? 'marsag' : 'whitney';
    const newBuildingId = `${buildingBase}floor${newFloor}`;
    navigate(`/building/${newBuildingId}`);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
    setScale(isZoomed ? 1 : 2);
    setPosition({ x: 0, y: 0 });
  };

  // logic for info boxes when clicking rooms
  const handleRoomClick = (room: RoomCoordinate, event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setHighlightedRoomId(room.id);
    setSelectedRoom(room);
    setShowInfoBox(true);
    
    const scrollX = window.scrollX || document.documentElement.scrollLeft;
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    
    setInfoBoxPosition({
      x: event.clientX + scrollX + 40,
      y: event.clientY + scrollY - 60
    });
  };

  // clicking logic for clicking on floor plan elements
  const handleDevClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!devMode) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    
    console.log(`Clicked at: x: ${Math.round(percentX)}%, y: ${Math.round(percentY)}%`);
    console.log(`Building: ${buildingId}, Floor: ${currentFloor}`);
  };

  const getCoordinatesForCurrentFloor = () => {
    if (buildingId?.includes('marsag')) {
      return currentFloor === 1 ? marsag1Coordinates : marsag2Coordinates;
    }

    return currentFloor === 2 ? whitney2Coordinates : whitney1Coordinates;
  };

  const handleClickOutside = () => {
    const overlays = document.querySelectorAll('.room-overlay');
    overlays.forEach(overlay => {
      if (overlay instanceof HTMLElement) {
        overlay.click();
      }
    });
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowInfoBox(false);
      setHighlightedRoomId(null);
    }
  };

  // position info box when room is highlighted via search
  useEffect(() => {
    if (highlightedRoomId && !showInfoBox) {
      const room = getCoordinatesForCurrentFloor().find(r => r.id === highlightedRoomId);
      if (room) {
        setSelectedRoom(room);
        setShowInfoBox(true);
        
        const container = containerRef.current;
        if (container) {
          const rect = container.getBoundingClientRect();
          
          const roomX = (rect.width * room.x / 100);
          const roomY = (rect.height * room.y / 100);
          
          const offsetX = 30; // info box offset
          const offsetY = -45;  
          
          setInfoBoxPosition({
            x: roomX + rect.left + offsetX,
            y: roomY + rect.top + offsetY
          });
        }
      }
    }
  }, [highlightedRoomId, showInfoBox]);

  // setup classes for use in logic of building view
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
        className={`floor-plan ${isZoomed ? 'zoomed' : ''} ${devMode ? 'dev-mode' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onClick={devMode ? handleDevClick : undefined}
      >
        <div 
          className="floor-plan-content"
          onClick={handleBackgroundClick}
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
              buildingName={building.name}
              floorNumber={currentFloor}
              data-room-id={room.id}
            />
          ))}
        </div>
      </div>

      {showInfoBox && selectedRoom && (
        <div 
          className="room-info-box"
          style={{
            position: 'fixed',
            left: `${infoBoxPosition.x}px`,
            top: `${infoBoxPosition.y}px`
          }}
        >
          <h3>{selectedRoom.label}</h3>
          <p>{building.name}</p>
          <p>Floor {currentFloor}</p>
        </div>
      )}

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