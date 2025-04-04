interface RoomInfoBoxProps {
  roomLabel: string;
  buildingName: string;
  floorNumber: number;
  position: {
    x: number;
    y: number;
  };
}

const RoomInfoBox = ({ roomLabel, buildingName, floorNumber, position }: RoomInfoBoxProps) => {
  return (
    <div 
      className="room-info-box"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
    >
      <h3>{roomLabel}</h3>
      <p>{buildingName}</p>
      <p>Floor {floorNumber}</p>
    </div>
  );
};

export default RoomInfoBox;