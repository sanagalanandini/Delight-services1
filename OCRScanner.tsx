// src/components/OCRScanner.tsx
import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

const OCRScanner: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [scannedText, setScannedText] = useState<string>("");
  const [progress, setProgress] = useState<number | null>(null);

  // Handle file upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setScannedText("");
      setProgress(null);
    }
  };

  // Process OCR
  const processImage = () => {
    if (!image) return;

    // Initialize Tesseract.js OCR
    Tesseract.recognize(image, 'eng', {
      logger: (m) => {
        if (m.status === 'recognizing text') {
          setProgress(Math.round(m.progress * 100));
          console.log(`Progress: ${Math.round(m.progress * 100)}%`);
        }
      },
    })
      .then((result) => {
        setScannedText(result.data.text);
        console.log("OCR Result:", result.data);
      })
      .catch((error) => {
        console.error("OCR Error:", error);
      });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>OCR Scanner</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && (
        <button onClick={processImage} style={{ margin: '10px 0' }}>
          Scan Document
        </button>
      )}
      {progress !== null && (
        <div>Progress: {progress}%</div>
      )}
      {scannedText && (
        <div>
          <h3>Scanned Text:</h3>
          <p>{scannedText}</p>
        </div>
      )}
    </div>
  );
};

export default OCRScanner;
export {};