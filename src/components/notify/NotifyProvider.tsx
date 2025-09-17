// components/Notify/NotifyProvider.tsx
"use client";
import NotifyContext, { Notification } from "@/app/contexts/NotifyContext";
import { useState, useCallback, ReactNode } from "react";
import {
  HiCheck,
  HiOutlineExclamationTriangle,
  HiOutlineXMark,
} from "react-icons/hi2";

export const NotifyProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const onNotify = useCallback(
    ({ type, message, color = "green" }: Notification) => {
      setNotification({ type, message, color });

      setTimeout(() => {
        setNotification(null);
      }, 3000);
    },
    []
  );

  const baseStyles =
    "fixed top-4 right-4 z-50 px-4 py-2 rounded shadow-lg transition-all duration-300 ease-in-out flex items-center justify-center gap-2";

  return (
    <NotifyContext.Provider value={{ onNotify }}>
      {notification &&
        (notification.type === "success" ? (
          <div className={`${baseStyles} bg-green-200 !text-green-800`}>
            <HiCheck className="text-2xl" /> {notification.message}
          </div>
        ) : notification.type === "error" ? (
          <div className={`${baseStyles} bg-red-500`}>
            <HiOutlineXMark className="text-2xl" /> {notification.message}
          </div>
        ) : (
          <div className={`${baseStyles} bg-yellow-500`}>
            <HiOutlineExclamationTriangle className="text-2xl" />{" "}
            {notification.message}
          </div>
        ))}
      {children}
    </NotifyContext.Provider>
  );
};
