import React from "react";

export default function Notification({ message, type }) {
  if (!message) return null;
  const base = "p-4 mb-4 text-sm rounded-lg text-center";
  const colors = {
    error: "bg-red-100 text-red-700",
    success: "bg-green-100 text-green-700",
  };
  return <div className={`${base} ${colors[type]}`}>{message}</div>;
}