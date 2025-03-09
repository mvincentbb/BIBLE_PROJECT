'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import PDFPreview from '@/components/PDFPreview';

// Dynamically import the PDF components to avoid SSR issues
const PDFDownloadButton = dynamic(() => 
  import('@/components/PDFDownloadButton').then(mod => mod.default), 
  { ssr: false }
);

export default function GeneratePDF() {
  const [isClient, setIsClient] = useState(false);
  const bibleText = `1.1 Au commencement, Dieu créa les cieux et la terre. ... (rest of Genesis 1 text)`; // Replace with your actual text
  const pageNumber = 1;
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your PDF is ready!</h1>
      
      {isClient ? (
        <PDFDownloadButton />
        ,<PDFPreview  />
      ) : (
        <button className="bg-gray-300 text-white font-bold py-2 px-4 rounded" disabled>
          Loading PDF...
        </button>
      )}
      
      <div className="mt-4">
        <Link href="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}