import React from 'react';
import { FiPlusCircle } from "react-icons/fi";

const FileUpload = ({ onChange }: any) => {
  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    const fileName = selectedFile ? selectedFile.name : 'No file selected';
    onChange(fileName, selectedFile); // Pass both fileName and selectedFile to the parent component
  };


  return (
    <div className="z-10 border-2 border-dashed border-foam p-8 bg-overlay rounded-md shadow-md w-full">
      <input type="file" id="fileInput" className="hidden" onChange={handleFileChange} />

      <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center justify-center">
        <span className="mt-2 block text-foam"><FiPlusCircle className="text-3xl" /></span>
        <span className="mt-2 block text-lg">Click to upload a file</span>
      </label>

      <div id="fileName" className="mt-4 text-center text-gray-600"></div>
    </div>
  );
};

export default FileUpload;

