import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import Barcode from 'react-barcode'; // Ensure this import is correct
import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, ImageRun, FileChild } from 'docx';

const CodeGenerator: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [pdfGenerated, setPdfGenerated] = useState<boolean>(false);
  const [wordGenerated, setWordGenerated] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const generatePDF = () => {
    const qrCodeElement = document.getElementById('qrCode') as HTMLCanvasElement;
    const barCodeElement = document.getElementById('barCode') as HTMLCanvasElement;

    if (qrCodeElement) {
      const qrCodeImage = qrCodeElement.toDataURL();
      const pdf = new jsPDF();
      if (qrCodeImage) {
        pdf.addImage(qrCodeImage, 'PNG', 10, 20, 180, 160);
      }
      if (barCodeElement) {
        const barCodeImage = barCodeElement.toDataURL();
        pdf.addImage(barCodeImage, 'PNG', 10, 210, 180, 40);
      }
      pdf.save('codes.pdf');
      setPdfGenerated(true);
    }
  };

  const convertBlobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const generateWord = async () => {
    const qrCodeElement = document.getElementById('qrCode') as HTMLCanvasElement;
    const barCodeElement = document.getElementById('barCode') as HTMLCanvasElement;

    if (qrCodeElement) {
      const qrCodeImage = qrCodeElement.toDataURL();
      const barCodeImage = barCodeElement ? barCodeElement.toDataURL() : null;

      const qrImageBlob = await fetch(qrCodeImage).then(res => res.blob());
      const barImageBlob = barCodeImage ? await fetch(barCodeImage).then(res => res.blob()) : null;

      const qrImageBase64 = await convertBlobToBase64(qrImageBlob);
      const barImageBase64 = barImageBlob ? await convertBlobToBase64(barImageBlob) : null;

      // Create image runs
      const qrImageRun = new ImageRun({
        data: qrImageBase64,
        transformation: {
          width: 500,
          height: 500,
        },
        // Correctly specify type
        type: 'png', // Ensure this matches the expected format
      });

      const barImageRun = barImageBase64 ? new ImageRun({
        data: barImageBase64,
        transformation: {
          width: 200,
          height: 50,
        },
        type: 'png', // Ensure this matches the expected format
      }) : null;

      // Create an array of section children, filtering out nulls
      const sectionChildren = [
        new Paragraph({
          text: 'QR Code:',
          heading: 'Heading1',
        }),
        qrImageRun,
        barImageRun ? new Paragraph({
          text: 'Barcode:',
          heading: 'Heading1',
        }) : null,
        barImageRun,
      ].filter((child): child is Paragraph=> child !== null); // Filter out nulls



      // // Create the document with a section
       const doc = new Document({
         sections: [{
           children: sectionChildren, // Pass the section children directly
         }],
       });

      const blob = await Packer.toBlob(doc);
      const file = new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const url = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'codes.docx';
      link.click();
      setWordGenerated(true); // Move this line here to ensure it's only set after generating the document
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>QR Code and Barcode Generator</h2>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter text for QR/Barcode"
        style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
      />
      <h3>QR Code</h3>
      <QRCode id="qrCode" value={inputValue} size={256} />
      <h3>Barcode</h3>
      <Barcode value={inputValue} /> {/* Removed id from Barcode */}

      <div style={{ marginTop: '20px' }}>
        <button onClick={generatePDF}>Download PDF</button>
        <button onClick={generateWord}>Download Word Document</button>
      </div>

      {pdfGenerated && <p>PDF has been generated!</p>}
      {wordGenerated && <p>Word Document has been generated!</p>}
    </div>
  );
};

export default CodeGenerator;
export {};