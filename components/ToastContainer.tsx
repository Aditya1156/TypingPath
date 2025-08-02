
import { useToast } from '../context/ToastContext';
import Toast from './Toast';
import type { ToastMessage } from '../types';

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-5 right-5 z-[9999] w-full max-w-xs space-y-3">
      {toasts.map((toast: ToastMessage) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;