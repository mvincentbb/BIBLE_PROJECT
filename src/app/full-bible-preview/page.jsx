'use client';
import React, { useState } from 'react';

const FullBiblePreviewPage = () => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePreview = async () => {
    setLoading(true);

    try {
      const res = await fetch('/api/generate-full-bible-pdf');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (error) {
      console.error('Failed to generate full Bible PDF:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>📖 Full Bible PDF Generator</h1>
      <p>This will generate all books of the Bible into one file.</p>
      
      <button
        onClick={handlePreview}
        style={{
          padding: '10px 20px',
          backgroundColor: '#1f2937',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          marginTop: '10px',
        }}
      >
        {loading ? 'Generating PDF...' : 'Generate Full Bible PDF'}
      </button>

      {pdfUrl && (
        <iframe
          src={pdfUrl}
          style={{
            width: '100%',
            height: '600px',
            border: '1px solid #ccc',
            marginTop: '20px',
          }}
          title="Full Bible PDF Preview"
        />
      )}
    </div>
  );
};

export default FullBiblePreviewPage;
