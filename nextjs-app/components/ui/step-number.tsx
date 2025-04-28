import React from "react";

interface ProcessStepProps {
  number: number;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ number }) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`flex items-center justify-center w-16 h-16 rounded-full text-2xl font-bold 
        bg-gray-200 text-gray-700`}
      >
        {number}
      </div>
    </div>
  );
};

export default ProcessStep;
