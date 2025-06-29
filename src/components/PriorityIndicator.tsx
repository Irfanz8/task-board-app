"use client";
export default function PriorityIndicator({
  priority,
  className = "",
}: {
  priority: "High" | "Medium" | "Low";
  className?: string;
}) {
  if (priority === "High")
    return (
      <span className={`text-red-500 ${className}`}>
        <svg width="18" height="18" viewBox="0 0 20 20" className="inline" fill="none">
          <path d="M5 13L10 7L15 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </span>
    );
  if (priority === "Medium")
    return (
      <span className={`text-yellow-500 ${className}`}>
        <svg width="18" height="18" viewBox="0 0 20 20" className="inline" fill="none">
          <path d="M5 10H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </span>
    );
  return (
    <span className={`text-blue-500 ${className}`}>
      <svg width="18" height="18" viewBox="0 0 20 20" className="inline" fill="none">
        <path d="M5 7L10 13L15 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </span>
  );
}