import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  issue: any | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, issue }) => {
  if (!isOpen || !issue) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-lg w-3/4 max-w-2xl">
        <button onClick={onClose} className="text-right text-gray-600 font-bold">
          X
        </button>
        <h3 className="text-2xl font-bold mb-4">{issue.title}</h3>
        <p className="mb-4">{issue.body}</p>
        <p className="text-sm text-gray-500">Last updated: {new Date(issue.updated_at).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default Modal;