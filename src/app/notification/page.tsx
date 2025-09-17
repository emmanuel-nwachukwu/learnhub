"use client";

import { useNotify } from "@/hooks/useNotify";

export default function DemoButton() {
  const onNotify = useNotify();

  return (
    <button
      onClick={() =>
        onNotify({
          type: "success",
          message: "Operation failed!",
          // color: "red",
        })
      }>
      Show Notification
    </button>
  );
}
