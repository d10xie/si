import React from "react";

export function Card({ children, className, ...props }) {
  return (
    <div className={`card ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children, ...props }) {
  return (
    <div className="card-content" {...props}>
      {children}
    </div>
  );
}
