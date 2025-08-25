import { useApp } from '../context/AppContext';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const Notification = () => {
  const { notifications } = useApp();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {notifications.map(({ id, message, type }) => (
        <div
          key={id}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg glass-effect animate-slide-up ${
            type === 'success' ? 'text-green-600 dark:text-green-400' :
            type === 'error' ? 'text-red-600 dark:text-red-400' :
            'text-blue-600 dark:text-blue-400'
          }`}
        >
          {type === 'success' ? (
            <CheckCircle size={18} />
          ) : type === 'error' ? (
            <XCircle size={18} />
          ) : (
            <AlertCircle size={18} />
          )}
          <p className="text-sm font-medium">{message}</p>
        </div>
      ))}
    </div>
  );
};

export default Notification; 
//update