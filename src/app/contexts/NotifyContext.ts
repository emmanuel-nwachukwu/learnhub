"use client";

import { createContext } from "react";
type NotifyColor = "green" | "red" | "yellow";
type NotifyType = "success" | "error" | "warning";

export interface Notification {
  type: NotifyType;
  message: string;
  color?: NotifyColor;
}

interface NotifyContextType {
  onNotify: ({ type, message, color }: Notification) => void;
}

const NotifyContext = createContext<NotifyContextType | undefined>(undefined);

export default NotifyContext;
