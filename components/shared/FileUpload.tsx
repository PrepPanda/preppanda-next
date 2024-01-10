import React from 'react';
import { FiPlusCircle } from "react-icons/fi";

const FileUpload = ({ onChange }: any) => {
    const handleFileChange = (event: any) => {
        const selectedFile = event.target.files[0];
        const fileName = selectedFile ? selectedFile.name : 'No file selected';
        onChange(fileName, selectedFile); // Pass both fileName and selectedFile to the parent component
    };


    return (
        <div className="border-2 border-dashed border-green-400 p-8 bg-white rounded-md shadow-md w-full">
            <input type="file" id="fileInput" className="hidden" onChange={handleFileChange} />

            <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center justify-center">
                <span className="mt-2 block text-sm text-gray-600"><FiPlusCircle className="text-xl" /></span>
                <span className="mt-2 block text-sm text-gray-600">Click to upload a file</span>
            </label>

            <div id="fileName" className="mt-4 text-center text-gray-600"></div>
        </div>
    );
};

export default FileUpload;

