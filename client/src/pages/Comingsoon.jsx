import React from 'react';

const ComingSoon = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-white">
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl font-semibold text-amber-600 mb-3">
          Page Coming Soon
        </h1>
        <p className="text-gray-600 text-base md:text-lg">
          This page is under construction. Check back shortly!
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
