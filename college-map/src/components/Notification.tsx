// notification component for room search confirmation
interface NotificationProps {
  message: string;
  isVisible: boolean;
  onDismiss: () => void;
}

const Notification = ({ message, isVisible, onDismiss }: NotificationProps) => {
  if (!isVisible) return null;

  return ( // user can dismiss popup by clicking on it
    <div className="notification" onClick={onDismiss}> 
      {message}
    </div>
  );
};

export default Notification;