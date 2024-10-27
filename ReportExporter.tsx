// src/components/ReportExporter.tsx
import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph } from 'docx';

const ReportExporter: React.FC = () => {
  const [reportText, setReportText] = useState<string>("");

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReportText(e.target.value);
  };

  // Export to PDF
  const exportToPDF = () => {
    const pdf = new jsPDF();
    pdf.text(reportText, 10, 10);
    pdf.save("report.pdf");
  };

  // Export to Word
  const exportToWord = async () => {
    const doc = new Document({

      sections: [
        {
          properties: {},
          children: [new Paragraph(reportText)],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "report.docx");
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Report Exporter</h2>
      <textarea
        value={reportText}
        onChange={handleTextChange}
        rows={10}
        style={{ width: '100%', marginBottom: '10px', fontSize: '16px' }}
        placeholder="Enter your report text here..."
      />
      <div>
        <button onClick={exportToPDF} style={{ marginRight: '10px' }}>
          Export to PDF
        </button>
        <button onClick={exportToWord}>
          Export to Word
        </button>
      </div>
    </div>
  );
};

export default ReportExporter;
export {};