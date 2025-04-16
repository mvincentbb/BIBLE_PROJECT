import { NextResponse } from 'next/server';
import { renderToStream, Font } from '@react-pdf/renderer';
import React from 'react';
import BibleBookDocument from '@/components/BibleBookDocument';
import path from 'path';
import fs from 'fs';

// Correct way to register fonts for server-side rendering:
Font.register({
  family: 'Roboto',
  src: path.resolve(process.cwd(), 'public/fonts/Roboto.ttf'),
});
Font.register({
  family: 'Itim',
  src: path.resolve(process.cwd(), 'public/fonts/Itim-Regular.ttf'),
});
Font.register({
  family: 'Pirata One',
  src: path.resolve(process.cwd(), 'public/fonts/PirataOne-Regular.ttf'),
});
Font.register({
  family: 'Roboto-Serif',
  src: path.resolve(process.cwd(), 'public/fonts/Roboto-Regular.ttf'),
});

export async function GET(request) {
  const bookName = request.nextUrl.searchParams.get('bookName') || 'Esther';
  const bibleData = JSON.parse(
    fs.readFileSync(path.resolve(process.cwd(), 'src/bible/segond.json'))
  );
  const bookVerses = bibleData.verses.filter((v) => v.book_name === bookName);

  const stream = await renderToStream(
    <BibleBookDocument bookName={bookName} bookVerses={bookVerses} />
  );

  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }

  const pdfBuffer = Buffer.concat(chunks);

  return new NextResponse(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${bookName}.pdf"`,
    },
  });
}
