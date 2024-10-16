import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete this notice?</p>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="bg-gray-300 text-gray-700 p-2 rounded mr-2">
            Cancel
          </button>
          <button onClick={onConfirm} className="bg-red-500 text-white p-2 rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
