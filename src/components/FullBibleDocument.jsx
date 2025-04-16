
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Link, Image, Svg, Path } from '@react-pdf/renderer';
import path from 'path';
import PropTypes from 'prop-types';

// Register fonts
Font.register({ family: 'Roboto', src: path.resolve(process.cwd(), 'public/fonts/Roboto.ttf') });
Font.register({ family: 'Itim', src: path.resolve(process.cwd(), 'public/fonts/Itim-Regular.ttf') });
Font.register({ family: 'Pirata One', src: path.resolve(process.cwd(), 'public/fonts/PirataOne-Regular.ttf') });
Font.register({ family: 'Roboto-Serif', src: path.resolve(process.cwd(), 'public/fonts/Roboto-Regular.ttf') });

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 20,
    paddingBottom: 40,
    position: 'relative'
  },
  title: {
    fontSize: 20,
    fontFamily: 'Itim',
    marginBottom: 20,
    textAlign: 'center',
  },
  link: {
    fontSize: 12,
    color: 'blue',
    textDecoration: 'underline',
    marginBottom: 6,
  },
  chapterTitle: {
    fontSize: 16,
    fontFamily: 'Roboto-Serif',
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  verse: {
    fontSize: 11,
    fontFamily: 'Roboto',
    marginBottom: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitleBox: {
    backgroundColor: 'gray',
    padding: 8,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
  },
  headerTitle: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Itim',
  },
  headerLine: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    width: '100%',
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    fontSize: 9,
  },
  brandName: {
    marginRight: 5,
  },
  socialIcon: {
    width: 8,
    height: 8,
    marginRight: 5,
  },
});

const FullBibleDocument = ({ books }) => {
  const tocEntries = books.flatMap((book) => {
    const chapters = new Set(book.verses.map(v => v.chapter));
    return [...chapters].sort((a, b) => a - b).map((chapter) => ({
      label: `${book.bookName} - Chapitre ${chapter}`,
      anchor: `${book.bookName}-${chapter}`,
    }));
  });

  let globalPageIndex = 2; // Start page count after TOC (which is page 1)

  const pages = books.flatMap(({ bookName, verses }) => {
    const chapters = Object.values(
      verses.reduce((acc, verse) => {
        if (!acc[verse.chapter]) acc[verse.chapter] = { chapter: verse.chapter, verses: [] };
        acc[verse.chapter].verses.push(verse);
        return acc;
      }, {})
    ).sort((a, b) => a.chapter - b.chapter);

    return chapters.map((chapter) => {
      const page = (
        <Page size="A4" style={styles.page} wrap key={`${bookName}-${chapter.chapter}`}>          
          {/* Header */}
          <View fixed style={styles.header}>
            <View style={styles.headerTitleBox}>
              <Text style={styles.headerTitle}>{bookName} {chapter.chapter}</Text>
            </View>
             <Svg width="24" height="24" viewBox="0 0 38 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M36.6429 18.8571H1.35714C0.997206 18.8571 0.652012 18.9399 0.397498 19.0873C0.142984 19.2346 0 19.4345 0 19.6429L0 21.2143C0 21.4227 0.142984 21.6225 0.397498 21.7699C0.652012 21.9172 0.997206 22 1.35714 22H36.6429C37.0028 22 37.348 21.9172 37.6025 21.7699C37.857 21.6225 38 21.4227 38 21.2143V19.6429C38 19.4345 37.857 19.2346 37.6025 19.0873C37.348 18.9399 37.0028 18.8571 36.6429 18.8571ZM36.6429 12.5714H1.35714C0.997206 12.5714 0.652012 12.6542 0.397498 12.8016C0.142984 12.9489 0 13.1488 0 13.3571L0 14.9286C0 15.137 0.142984 15.3368 0.397498 15.4842C0.652012 15.6315 0.997206 15.7143 1.35714 15.7143H36.6429C37.0028 15.7143 37.348 15.6315 37.6025 15.4842C37.857 15.3368 38 15.137 38 14.9286V13.3571C38 13.1488 37.857 12.9489 37.6025 12.8016C37.348 12.6542 37.0028 12.5714 36.6429 12.5714ZM36.6429 6.28571H1.35714C0.997206 6.28571 0.652012 6.36849 0.397498 6.51584C0.142984 6.66319 0 6.86304 0 7.07143L0 8.64286C0 8.85124 0.142984 9.05109 0.397498 9.19844C0.652012 9.34579 0.997206 9.42857 1.35714 9.42857H36.6429C37.0028 9.42857 37.348 9.34579 37.6025 9.19844C37.857 9.05109 38 8.85124 38 8.64286V7.07143C38 6.86304 37.857 6.66319 37.6025 6.51584C37.348 6.36849 37.0028 6.28571 36.6429 6.28571ZM36.6429 0L1.35714 0C0.997206 0 0.652012 0.0827803 0.397498 0.23013C0.142984 0.37748 0 0.57733 0 0.785714L0 2.35714C0 2.56553 0.142984 2.76538 0.397498 2.91273C0.652012 3.06008 0.997206 3.14286 1.35714 3.14286H36.6429C37.0028 3.14286 37.348 3.06008 37.6025 2.91273C37.857 2.76538 38 2.56553 38 2.35714V0.785714C38 0.57733 37.857 0.37748 37.6025 0.23013C37.348 0.0827803 37.0028 0 36.6429 0Z" fill="black"/>
                              </Svg>
          </View>
          <View style={styles.headerLine} />

          {/* Chapter title */}
          {/* <Text id={`${bookName}-${chapter.chapter}`} style={styles.chapterTitle}>
            {bookName} - Chapitre {chapter.chapter}
          </Text> */}

          {/* Verses */}
          {chapter.verses.map((verse) => (
            <Text style={styles.verse} key={`${bookName}-${chapter.chapter}-${verse.verse}`}>
              {verse.verse}. {verse.text}
            </Text>
          ))}

          {/* Footer */}
          <View fixed style={styles.footer}>
            <Text style={styles.brandName}>@meditationfacile</Text>
            <View style={{ flexDirection: 'row' }}>
              <Image src={path.resolve(process.cwd(), 'public/youtubeIcon.png')} style={styles.socialIcon} />
              <Image src={path.resolve(process.cwd(), 'public/xIcon.png')} style={styles.socialIcon} />
              <Image src={path.resolve(process.cwd(), 'public/metaIcon.png')} style={styles.socialIcon} />
              <Image src={path.resolve(process.cwd(), 'public/instagramIcon.png')} style={styles.socialIcon} />
            </View>
            <Text render={({ pageNumber }) => `Page ${pageNumber}`} />
          </View>
        </Page>
      );

      globalPageIndex++;
      return page;
    });
  });

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <Text style={styles.title}>Table des matières</Text>
        {tocEntries.map((entry, index) => (
          <Link key={index} src={`#${entry.anchor}`}>
            <Text style={styles.link}>{entry.label}</Text>
          </Link>
        ))}
        <View fixed style={styles.footer}>
          <Text style={styles.brandName}>@meditationfacile</Text>
          <View style={{ flexDirection: 'row' }}>
            <Image src={path.resolve(process.cwd(), 'public/youtubeIcon.png')} style={styles.socialIcon} />
            <Image src={path.resolve(process.cwd(), 'public/xIcon.png')} style={styles.socialIcon} />
            <Image src={path.resolve(process.cwd(), 'public/metaIcon.png')} style={styles.socialIcon} />
            <Image src={path.resolve(process.cwd(), 'public/instagramIcon.png')} style={styles.socialIcon} />
          </View>
          <Text render={({ pageNumber }) => `Page ${pageNumber}`} />
        </View>
      </Page>
      {pages}
    </Document>
  );
};
FullBibleDocument.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      bookName: PropTypes.string.isRequired,
      verses: PropTypes.arrayOf(
        PropTypes.shape({
          chapter: PropTypes.number.isRequired,
          verse: PropTypes.number.isRequired,
          text: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

// export default FullBibleDocument;
export default FullBibleDocument;
