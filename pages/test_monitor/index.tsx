import { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';
import TestTimer from '@/components/TestMonitor/TestTimer';

const TestMonitor = () => {
  const [testData, setTestData] = useState<any[]>();
  const [startTime, setStartTime] = useState<Date>();
  useEffect(() => {
    const encryptedData = localStorage.getItem('originalTest');
    const startTimestampString = localStorage.getItem('startTimestamp');

    if (encryptedData && startTimestampString) {
      const bytes = CryptoJS.AES.decrypt(encryptedData, process.env.NEXT_PUBLIC_CRYPTO_SECRET);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      const startTimestamp = parseInt(startTimestampString, 10);
      const startTime = new Date(startTimestamp);

      if (startTime) {
        setStartTime(startTime);
      }
      if (decryptedData) {
        setTestData(decryptedData);
      }

      console.log('Decrypted Test Data:', decryptedData);
      console.log('Start Time:', startTime);
    }
  }, []);

  return (
    <>
      {/* Your TestMonitor JSX content */}
      {startTime &&
        <TestTimer startTime={startTime} duration={5} />
      }

    </>
  );
};

export default TestMonitor;

