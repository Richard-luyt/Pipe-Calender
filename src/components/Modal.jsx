import React from 'react';

export default function Modal({ show, onClose, children }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-4 w-64">
        {children}
        <div className="text-right mt-2">
          <button
            className="text-sm text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            close tab
          </button>
        </div>
      </div>
    </div>
  );
}