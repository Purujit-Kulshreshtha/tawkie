/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';

function AudioControls() {
  const [isRecording, setRecording] = useState(false);

  const startRecording = () => {
    setRecording(true);
    // Additional logic if needed when recording starts
  };

  const stopRecording = () => {
    setRecording(false);
    // Additional logic if needed when recording stops
  };

  const bg = isRecording ? 'bg-white' : 'bg-red-300';

  return (
    <div className="flex flex-col justify-center items-center m-4">
      <div
        onMouseDown={startRecording}
        onMouseUp={stopRecording}
        className={`${bg} p-4 rounded-full w-[150px] h-[150px] flex justify-center items-center shadow-md shadow-gray-700`}
      >
        R
      </div>
    </div>
  );
}

export default AudioControls;
