import React from "react";

export default function EmptyState({ title, description, icon, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center text-gray-600">
      {icon && <div className="mb-4 text-indigo-500">{icon}</div>}

      {title && <h2 className="text-xl font-semibold mb-2">{title}</h2>}

      {description && <p className="mb-4 text-sm text-gray-500">{description}</p>}

      {action && <div>{action}</div>}
    </div>
  );
}
