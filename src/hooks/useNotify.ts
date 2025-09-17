// hooks/useNotify.ts
"use client";

import { useContext } from "react";
import NotifyContext from "@/app/contexts/NotifyContext";

export const useNotify = () => {
  const context = useContext(NotifyContext);
  if (!context) {
    throw new Error("useNotify must be used within a NotifyProvider");
  }
  return context.onNotify;
};
