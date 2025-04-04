import { RoomCoordinate } from '../data/roomCoordinates';

interface RoomOverlayProps {
  room: RoomCoordinate;
  onClick: (room: RoomCoordinate, event: React.MouseEvent<HTMLDivElement>) => void;
  isHighlighted?: boolean;
  buildingName: string;
  floorNumber: number;
}

const RoomOverlay = ({ room, onClick, isHighlighted }: RoomOverlayProps) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClick(room, e);
  };

  return (
    <div
      className={`room-overlay ${isHighlighted ? 'highlighted' : ''}`}
      style={{
        left: `${room.x}%`,
        top: `${room.y}%`,
        width: '40px',
        height: '40px',
      }}
      onClick={handleClick}
      title={room.label}
    />
  );
};

export default RoomOverlay;