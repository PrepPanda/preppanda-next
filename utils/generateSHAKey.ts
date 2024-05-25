import CryptoJS from 'crypto-js';

export default function generateSHAKey(name: string) {
    const timestamp = new Date().getTime().toString();
    const randomString = Math.random().toString(36).substring(2, 8); 
    const data = name + timestamp + randomString; 
    const hash = CryptoJS.SHA256(data);
    const shaKey = hash.toString(CryptoJS.enc.Hex).substring(0, 6);
    return shaKey;
}