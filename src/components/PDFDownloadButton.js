'use client';

import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import MyDocument from './MyDocument';

const PDFDownloadButton = () => {
  return (
    <PDFDownloadLink 
      document={<MyDocument />} 
      fileName="document.pdf"
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-block"
    >
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'Download PDF'
      }
    </PDFDownloadLink>
  );
};

export default PDFDownloadButton;