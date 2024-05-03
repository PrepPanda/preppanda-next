
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const { image } = req.body;

    // Debugging: Log the image data received from the request
    console.log('Received image data:', image);

    const response = await axios.post('http://localhost:5000/detect_faces', { image });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error calling Flask API:', error);

    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }

    res.status(500).json({ error: 'Internal Server Error' });
  }
}

