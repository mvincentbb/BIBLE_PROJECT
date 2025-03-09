'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Dynamically import the PDF components to avoid SSR issues
const PDFPreview = dynamic(() => 
  import('@/components/PDFPreview').then(mod => mod.default), 
  { ssr: false }
);

export default function GeneratePDF() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">PDF Preview & Download</h1>
      
      {isClient ? (
        <PDFPreview />
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600 mb-4">Loading PDF preview...</p>
          <div className="w-full h-96 bg-gray-200 animate-pulse rounded"></div>
        </div>
      )}
      
      <div className="mt-6">
        <Link href="/" className="text-blue-600 hover:text-blue-800 hover:underline transition duration-300">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}