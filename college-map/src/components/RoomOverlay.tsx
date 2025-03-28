import { RoomCoordinate } from '../data/roomCoordinates';

interface RoomOverlayProps {
  room: RoomCoordinate;
  onClick: (room: RoomCoordinate) => void;
  isHighlighted?: boolean;
}

const RoomOverlay = ({ room, onClick, isHighlighted }: RoomOverlayProps) => {
  return (
    <div
      className={`room-overlay ${isHighlighted ? 'highlighted' : ''}`}
      style={{
        left: `${room.x}%`,
        top: `${room.y}%`,
        width: '40px',
        height: '40px',
      }}
      onClick={() => onClick(room)}
      title={room.label}
    />
  );
};

export default RoomOverlay;