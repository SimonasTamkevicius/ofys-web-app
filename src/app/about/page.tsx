import React from "react";

const page = () => {
  return (
    <div>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-4xl font-bold">About OFYS</h1>
          <p className="text-lg text-gray-500">
            Optimal Framework For Your Success
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-lg text-gray-500">Coming Soon...</p>
        </div>
        {/* <footer className="text-sm text-gray-500">
          © 2025 OFYS. All rights reserved.
        </footer> */}
      </div>
    </div>
  );
};

export default page;
