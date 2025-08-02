// import { NextResponse } from 'next/server';
// import { renderToStream, Font } from '@react-pdf/renderer';
// import React from 'react';
// import FullBibleDocument from '@/components/FullBibleDocument';
// import path from 'path';
// import fs from 'fs';

// // Register fonts again here (safe for SSR)
// Font.register({ family: 'Roboto', src: path.resolve(process.cwd(), 'public/fonts/Roboto.ttf') });
// Font.register({ family: 'Itim', src: path.resolve(process.cwd(), 'public/fonts/Itim-Regular.ttf') });
// Font.register({ family: 'Pirata One', src: path.resolve(process.cwd(), 'public/fonts/PirataOne-Regular.ttf') });
// Font.register({ family: 'Roboto-Serif', src: path.resolve(process.cwd(), 'public/fonts/Roboto-Regular.ttf') });

// export async function GET() {
//   const bibleData = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'src/bible/segond.json')));

//   const books = Object.entries(
//     bibleData.verses.reduce((acc, verse) => {
//       if (!acc[verse.book_name]) acc[verse.book_name] = [];
//       acc[verse.book_name].push(verse);
//       return acc;
//     }, {})
//   ).map(([bookName, verses]) => ({
//     bookName,
//     verses,
//   }));
  
//   const selectedBooks = ['Genèse', 'Exode']; // French Bible example

//   const books1 = Object.entries(
//     bibleData.verses.reduce((acc, verse) => {
//       if (selectedBooks.includes(verse.book_name)) {
//         if (!acc[verse.book_name]) acc[verse.book_name] = [];
//         acc[verse.book_name].push(verse);
//       }
//       return acc;
//     }, {})
//   ).map(([bookName, verses]) => ({
//     bookName,
//     verses,
//   }));
  
//   const stream = await renderToStream(<FullBibleDocument books={books} />);

//   const chunks = [];
//   for await (const chunk of stream) {
//     chunks.push(chunk);
//   }

//   const pdfBuffer = Buffer.concat(chunks);

//   return new NextResponse(pdfBuffer, {
//     headers: {
//       'Content-Type': 'application/pdf',
//       'Content-Disposition': `attachment; filename="Bible-Full.pdf"`,
//     },
//   });
// }


import { NextResponse } from 'next/server';
import { renderToBuffer, Font, renderToFile, renderToStream } from '@react-pdf/renderer';
import React from 'react';
import FullBibleDocument from '@/components/FullBibleDocument';
import path from 'path';
import fs from 'fs';

Font.register({ family: 'Roboto', src: path.resolve(process.cwd(), 'public/fonts/Roboto.ttf') });
Font.register({ family: 'Itim', src: path.resolve(process.cwd(), 'public/fonts/Itim-Regular.ttf') });
Font.register({ family: 'Pirata One', src: path.resolve(process.cwd(), 'public/fonts/PirataOne-Regular.ttf') });
Font.register({ family: 'Roboto-Serif', src: path.resolve(process.cwd(), 'public/fonts/Roboto-Regular.ttf') });

export async function GET() {
  const bibleData = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'src/bible/segond.json')));
   const selectedBooks = ['Ruth', 'Esther', 'Exode', 'Psaume']; // French Bible example

    const books2 = Object.entries(
      bibleData.verses.reduce((acc, verse) => {
        if (selectedBooks.includes(verse.book_name)) {
          if (!acc[verse.book_name]) acc[verse.book_name] = [];
          acc[verse.book_name].push(verse);
        }
        return acc;
      }, {})
    ).map(([bookName, verses]) => ({
      bookName,
      verses,
    }));
  const books = Object.entries(
    bibleData.verses.reduce((acc, verse) => {
      if (!acc[verse.book_name]) acc[verse.book_name] = [];
      acc[verse.book_name].push(verse);
      return acc;
    }, {})
  ).map(([bookName, verses]) => ({
    bookName,
    verses,
  }));

  // const pdfBuffer = await renderToBuffer(<FullBibleDocument books={books} />);
//   const pdfBuffer = await renderToStream(<FullBibleDocument books={books} />);
//   stream.pipe(res)
// //   const pdfBuffer = await renderToFile(<FullBibleDocument books={books} />, '/Users/vincent/Documents/bible_project/bible_samples/Bible-Full.pdf');

//   return new NextResponse(pdfBuffer, {
//     headers: {
//       'Content-Type': 'application/pdf',
//       'Content-Disposition': `attachment; filename=\"Bible-Full.pdf\"`,
//     },
//   });
// }

  const stream = await renderToStream(<FullBibleDocument books={books} />);

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="Bible-Full.pdf"');
  stream.pipe(res);
}