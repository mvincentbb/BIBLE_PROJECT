'use client';

import React, { useState } from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import MyDocument from './MyDocument';

const PDFPreview = () => {
  const [viewerHeight, setViewerHeight] = useState(600);
  const bibleText = `1.1 Au commencement, Dieu créa les cieux et la terre.
1.2 La terre était informe et vide: il y avait des ténèbres à la surface de  l'abîme, et l'esprit de Dieu se mouvait au-dessus des eaux.
1.3 Dieu dit: Que la lumière soit! Et la lumière fut.
1.4 Dieu vit que la lumière était bonne; et Dieu sépara la lumière d'avec les ténèbres.
1.5 Dieu appela la lumière jour, et il appela les ténèbres nuit. Ainsi, il y eut un soir, et il y eut un matin: ce fut le premier jour.
1.6 Dieu dit: Qu'il y ait une étendue entre les eaux, et qu'elle sépare les eaux d'avec les eaux.
1.7 Et Dieu fit l'étendue, et il sépara les eaux qui sont au-dessous de  l'étendue d'avec les eaux qui sont au-dessus de l'étendue. Et cela fut  ainsi.
1.8 Dieu appela l'étendue ciel. Ainsi, il y eut un soir, et il y eut un matin: ce fut le second jour.
1.9 Dieu dit: Que les eaux qui sont au-dessous du ciel se rassemblent en un seul lieu, et que le sec paraisse. Et cela fut ainsi.
1.10 Dieu appela le sec terre, et il appela l'amas des eaux mers. Dieu vit que cela était bon.
 1.1 Au commencement, Dieu créa les cieux et la terre.
1.2 La terre était informe et vide: il y avait des ténèbres à la surface de  l'abîme, et l'esprit de Dieu se mouvait au-dessus des eaux.
1.3 Dieu dit: Que la lumière soit! Et la lumière fut.
1.4 Dieu vit que la lumière était bonne; et Dieu sépara la lumière d'avec les ténèbres.
1.5 Dieu appela la lumière jour, et il appela les ténèbres nuit. Ainsi, il y eut un soir, et il y eut un matin: ce fut le premier jour.
1.6 Dieu dit: Qu'il y ait une étendue entre les eaux, et qu'elle sépare les eaux d'avec les eaux.
1.7 Et Dieu fit l'étendue, et il sépara les eaux qui sont au-dessous de  l'étendue d'avec les eaux qui sont au-dessus de l'étendue. Et cela fut  ainsi.
1.8 Dieu appela l'étendue ciel. Ainsi, il y eut un soir, et il y eut un matin: ce fut le second jour.
1.9 Dieu dit: Que les eaux qui sont au-dessous du ciel se rassemblent en un seul lieu, et que le sec paraisse. Et cela fut ainsi.
1.10 Dieu appela le sec terre, et il appela l'amas des eaux mers. Dieu vit que cela était bon.
 `;
  const pageNumber = 1;
  const bookAbbreviation = "Ge"; // Change this for other books

  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col gap-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-700">Preview Your PDF</h2>
        <p className="text-gray-600">
          Review how your PDF will look before downloading. You can scroll within the preview to see all pages.
        </p>
        
        <div className="flex gap-4">
          <PDFDownloadLink 
            document={<MyDocument  bibleText={bibleText} pageNumber={pageNumber} bookAbbreviation={bookAbbreviation} />} 
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
          <MyDocument
            bibleText={bibleText}
            pageNumber={pageNumber}
            bookAbbreviation={bookAbbreviation}
          />
        </PDFViewer>
      </div>
    </div>
  );
};


// 'use client';
// import React, { useState } from 'react';
// import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
// import MyDocument from './MyDocument';

const PDFPreview2 = () => {
  const [viewerHeight, setViewerHeight] = useState(600);
  const bibleText = `1.1 Au commencement, Dieu créa les cieux et la terre. ... (rest of Genesis 1 text) ... (long text)`;
  const bookAbbreviation = "Ge";

  // Function to split text into pages (adjust logic as needed)
  const splitTextIntoPages = (text) => {
    const chunkSize = 900; // Adjust as needed
    const chunks = [];
    for (let i = 0; i < text.length; i += chunkSize) {
      chunks.push(text.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const bibleTextChunks = splitTextIntoPages(bibleText);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* ... */}
      <div className="border rounded">
        <PDFViewer
          width="100%"
          height={viewerHeight}
          className="border-0"
          showToolbar={false}
        >
          <MyDocument bibleTextChunks={bibleTextChunks} bookAbbreviation={bookAbbreviation} />
        </PDFViewer>
      </div>
    </div>
  );
};

export default PDFPreview;


