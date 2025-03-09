'use client';

import React, { useState } from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import MyDocument from './MyDocument';

const PDFPreview = () => {
  const [viewerHeight, setViewerHeight] = useState(600);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col gap-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-700">Preview Your PDF</h2>
        <p className="text-gray-600">
          Review how your PDF will look before downloading. You can scroll within the preview to see all pages.
        </p>
        
        <div className="flex gap-4">
          <PDFDownloadLink 
            document={<MyDocument />} 
            fileName="document.pdf"
            className="inline-block"
          >
            {({ blob, url, loading, error }) => (
              <button className={`font-semibold py-2 px-6 rounded-md transition duration-300 ${
                loading 
                  ? "bg-yellow-500 text-white" 
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}>
                {loading ? 'Preparing Document...' : 'Download PDF'}
              </button>
            )}
          </PDFDownloadLink>
          
          <div className="flex items-center">
            <label htmlFor="viewer-height" className="mr-2 text-sm text-gray-600">Preview size:</label>
            <select 
              id="viewer-height" 
              value={viewerHeight} 
              onChange={(e) => setViewerHeight(Number(e.target.value))}
              className="border rounded p-1 text-sm"
            >
              <option value={400}>Small</option>
              <option value={600}>Medium</option>
              <option value={800}>Large</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="border rounded">
        <PDFViewer 
          width="100%" 
          height={viewerHeight} 
          className="border-0"
          showToolbar={false}
        >
          <MyDocument />
        </PDFViewer>
      </div>
    </div>
  );
};

export default PDFPreview;