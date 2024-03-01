import React, { useState } from 'react';
import FileUpload from '@/components/shared/FileUpload';
import axios from 'axios';
import { useRouter } from 'next/router';
import ThemeButton from '@/components/shared/ThemeButton';
import { RxUpload } from "react-icons/rx";

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
                console.log('Uploading file:', selectedFile);
                const formData = new FormData();
                formData.append('file', selectedFile);
                const link = process.env.REGEX_API_URL
                const response = await axios.post(link + '/upload', formData);

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
        <div className="py-52 w-screen flex flex-col px-8 sm:px-80 items-center justify-center bg-base">
            <FileUpload onChange={handleFileChange} />
            <p className="text-center mt-20">Selected File: {selectedFileName}</p>
            <br className='my-5' />
            <ThemeButton
                handleClick={handleUploadClick}
            >
                <p>Upload</p>
                <RxUpload/>
            </ThemeButton>
        </div>
    );
}

export default CustomTest;

