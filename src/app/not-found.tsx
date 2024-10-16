import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-6xl font-bold text-blue-700 md:text-8xl">404</h1>
        <p className="mt-4 text-2xl font-semibold text-gray-800 md:text-3xl">Oops! Not Found</p>
        <p className="mt-2 text-sm text-gray-600 md:text-base">
          Sorry, the page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
