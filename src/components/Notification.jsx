import { useNotificationValue } from '../contexts/NotificationContext';
import { Alert } from 'react-bootstrap';

const Notification = () => {
  const { success, error } = useNotificationValue();

  if (!success && !error) return null;

  if (success) {
    return (
      <Alert variant="success" className="mb-3">
        {success}
      </Alert>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mb-3">
        {error}
      </Alert>
    );
  }
};

export default Notification;