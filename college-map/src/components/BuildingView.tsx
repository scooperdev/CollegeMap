import { useParams, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import '../styles/BuildingView.css';
import whitneyFloor1 from '../assets/whitney-floor1.png';
import whitneyFloor2 from '../assets/whitney-floor2.png';

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
  }
};

const BuildingView = () => {
  const { buildingId } = useParams();
  const navigate = useNavigate();
  const [isZoomed, setIsZoomed] = useState(false);
  const [currentFloor, setCurrentFloor] = useState(1);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

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
    e.preventDefault(); // Prevent default scroll
    const zoomSensitivity = 0.001;
    const delta = -e.deltaY * zoomSensitivity;
    
    if (isZoomed || e.ctrlKey) {
      const newScale = Math.min(Math.max(0.5, scale * (1 + delta)), 4);
      
      // Calculate cursor position relative to the image center
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Adjust position to maintain zoom point under cursor
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

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
    setScale(isZoomed ? 1 : 2);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="building-container">      
      <h1>{building.name} - {building.floors[currentFloor].name}</h1>
      
      <div className="floor-controls">
        {currentFloor < maxFloor && (
          <button 
            className="floor-button"
            onClick={() => setCurrentFloor(currentFloor + 1)}
          >
            Go Up to Floor {currentFloor + 1}
          </button>
        )}
        {currentFloor > 1 && (
          <button 
            className="floor-button"
            onClick={() => setCurrentFloor(currentFloor - 1)}
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
          style={{
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
            cursor: isDragging ? 'grabbing' : (isZoomed ? 'grab' : 'default')
          }}
        >
          <img 
            src={building.floors[currentFloor].image}
            alt={`${building.name} ${building.floors[currentFloor].name}`}
          />
        </div>
      </div>

      <button className="zoom-button" onClick={toggleZoom}>
        {isZoomed ? 'Reset View' : 'Zoom In'}
      </button>
    </div>
  );
};

export default BuildingView;