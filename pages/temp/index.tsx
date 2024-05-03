
// pages/index.js

import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Adjust the URL as needed

const Index = () => {
  const webcamRef = useRef(null);
  const [faceCount, setFaceCount] = useState(0);

  useEffect(() => {
    // Set up a timer to capture frames periodically
    const timer = setInterval(() => {
      captureFrame();
    }, 1000); // Adjust the interval (in milliseconds) as needed

    // Clean up the timer when the component unmounts
    return () => clearInterval(timer);
  }, []);

  const captureFrame = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const imageData = imageSrc.split(',')[1]; // Extract base64 data from data URL
    const byteCharacters = atob(imageData); // Decode base64 to byte characters
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers); // Convert to Uint8Array (bytes)
    socket.emit('frame', byteArray); // Send bytes data to backend
  };

  useEffect(() => {
    // Listen for face count updates from the server
    socket.on('face_count', count => {
      setFaceCount(count);
    });

    // Clean up socket listener when the component unmounts
    return () => {
      socket.off('face_count');
    };
  }, []);

  return (
    <div>
      <h1>Face Detection App</h1>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <p>Number of Faces: {faceCount}</p>
    </div>
  );
};

export default Index;

