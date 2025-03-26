'use client';

import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import MyDocument from '@/components/MyDocument';
import Link from 'next/link';

export default function GeneratePDF() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your PDF  also is ready!</h1>
      <PDFDownloadLink 
        document={<MyDocument />} 
        fileName="document.pdf"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-block"
      >
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : 'Download PDF'
        }
      </PDFDownloadLink>
      <div className="mt-4">
        <Link href="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
