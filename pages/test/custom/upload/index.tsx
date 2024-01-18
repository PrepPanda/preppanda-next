import React, { useState } from 'react';
import FileUpload from '@/components/shared/FileUpload';
import axios from 'axios';
import { useRouter } from 'next/router';

const CustomTest = () => {
    const router = useRouter();
    const [selectedFileName, setSelectedFileName] = useState<string>('No file selected');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const handleFileChange = (fileName: string, file: File | null) => {
        setSelectedFileName(fileName);
        setSelectedFile(file);
    }

    const handleUploadClick = async () => {
        if (selectedFile) {
            try {
                const formData = new FormData();
                formData.append('file', selectedFile);
                const response = await axios.post('http://127.0.0.1:5001/upload', formData);

                console.log('Upload successful:', response.data);
                localStorage.setItem('uploadedData', JSON.stringify(response.data));
                router.push('/test/custom/upload/verify');
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        } else {
            console.warn('No file selected for upload.');
        }
    }
    return (
        <div className="my-44 w-screen flex flex-col px-8 sm:px-80 items-center justify-center">
            <FileUpload onChange={handleFileChange} />
            <p className="text-center mt-20">Selected File: {selectedFileName}</p>
            <button
                className="mt-4 z-20 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full cursor-pointer"
                onClick={handleUploadClick}
            >
                Upload File
            </button>
        </div>
    );
}

export default CustomTest;

