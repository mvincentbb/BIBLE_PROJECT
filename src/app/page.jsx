'use client';
import React, { useState } from 'react';

const HomePage = () => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const bookName = 'Esther'; // Example book name, you can change this as needed

  const handlePreview = async () => {
    setLoading(true);
    const res = await fetch(`/api/generate-pdf?bookName=${bookName}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>PDF Generation for {bookName}</h1>
      <button onClick={handlePreview}>
        {loading ? 'Generating PDF...' : `Generate ${bookName}`}
      </button>
      {pdfUrl && (
        <iframe
          src={pdfUrl}
          style={{ width: '100%', height: '600px', border: '1px solid #ccc', marginTop: '20px' }}
          title="PDF Preview"
        />
      )}
    </div>
  );
};

export default HomePage;
