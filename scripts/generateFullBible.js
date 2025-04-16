const fs = require('fs');
const path = require('path');
const React = require('react');
const FullBibleDocument = require('../src/components/FullBibleDocument.jsx').default;

// Register fonts dynamically
(async () => {
  const { renderToFile, Font } = await import('@react-pdf/renderer');

  Font.register({ family: 'Roboto', src: path.resolve('./public/fonts/Roboto.ttf') });
  Font.register({ family: 'Itim', src: path.resolve('./public/fonts/Itim-Regular.ttf') });
  Font.register({ family: 'Pirata One', src: path.resolve('./public/fonts/PirataOne-Regular.ttf') });
  Font.register({ family: 'Roboto-Serif', src: path.resolve('./public/fonts/Roboto-Regular.ttf') });

  // Load Bible data
  const bibleData = JSON.parse(fs.readFileSync(path.resolve('./src/bible/segond.json')));

  // Group verses by book
  const books = Object.entries(
    bibleData.verses.reduce((acc, verse) => {
      if (!acc[verse.book_name]) acc[verse.book_name] = [];
      acc[verse.book_name].push(verse);
      return acc;
    }, {})
  ).map(([bookName, verses]) => ({ bookName, verses }));

  // Generate single full Bible PDF
  const outputPath = path.resolve('./generated-pdfs/Bible-Full.pdf');
  await renderToFile(React.createElement(FullBibleDocument, { books }), outputPath);
  console.log('✅ Bible-Full.pdf has been generated!');
})();
