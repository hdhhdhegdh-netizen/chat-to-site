import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, Bell } from "lucide-react";

type NotificationType = "success" | "error" | "info" | "warning";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, "id">) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within NotificationProvider");
  }
  return context;
};

const getIcon = (type: NotificationType) => {
  switch (type) {
    case "success":
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case "error":
      return <AlertCircle className="w-5 h-5 text-destructive" />;
    case "warning":
      return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    case "info":
    default:
      return <Info className="w-5 h-5 text-primary" />;
  }
};

const getStyles = (type: NotificationType) => {
  switch (type) {
    case "success":
      return "border-green-500/30 bg-green-500/5";
    case "error":
      return "border-destructive/30 bg-destructive/5";
    case "warning":
      return "border-yellow-500/30 bg-yellow-500/5";
    case "info":
    default:
      return "border-primary/30 bg-primary/5";
  }
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((notification: Omit<Notification, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newNotification = { ...notification, id };
    
    setNotifications((prev) => [...prev, newNotification]);

    // Auto-remove after duration
    const duration = notification.duration ?? 5000;
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
      
      {/* Notification Container */}
      <div className="fixed top-4 left-4 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.9 }}
              className={`
                pointer-events-auto p-4 rounded-xl border backdrop-blur-sm
                shadow-lg ${getStyles(notification.type)}
              `}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm">
                    {notification.title}
                  </p>
                  {notification.message && (
                    <p className="text-muted-foreground text-xs mt-1">
                      {notification.message}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="flex-shrink-0 p-1 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};

// Bell icon component for showing notification count
interface NotificationBellProps {
  count?: number;
  onClick?: () => void;
}

export const NotificationBell = ({ count = 0, onClick }: NotificationBellProps) => {
  return (
    <button
      onClick={onClick}
      className="relative p-2 rounded-lg hover:bg-muted transition-colors"
    >
      <Bell className="w-5 h-5 text-muted-foreground" />
      {count > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center font-medium"
        >
          {count > 9 ? "9+" : count}
        </motion.span>
      )}
    </button>
  );
};

export default NotificationProvider;
