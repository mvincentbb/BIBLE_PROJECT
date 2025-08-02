import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Link,
  Image,
  Svg,
  Path,
  Circle,
} from '@react-pdf/renderer';
import path from 'path';
import PropTypes from 'prop-types';
import documentConfig from '@/config/documentConfig.json';

// Register fonts
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

// number of columns for the main book grid
const NUM_BOOK_COLS = 3;
// helper to strip pilcrows
const clean = (s) => s.replace(/\u00B6/g, '');

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: documentConfig.backgroundColor,
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Itim',
    marginBottom: 20,
    textAlign: 'center',
  },

  // Invisible anchor for link targets
  invisibleAnchor: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    overflow: 'hidden',
  },

  // Book grid on page 1
  bookGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  bookColumn: {
    width: `${100 / NUM_BOOK_COLS - 2}%`, // leave a little gutter
  },
  bookBox: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 4,
    backgroundColor: '#ddd',
    paddingVertical: 6,
    marginBottom: 4,
    textAlign: 'center',
    fontSize: 10,
    fontFamily: 'Roboto',
  },

  // Chapter grid per book
  chapterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  chapterBox: {
    width: 30,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 4,
    backgroundColor: '#ddd',
    paddingVertical: 8,
    margin: '1%',
    textAlign: 'center',
    fontSize: 10,
    fontFamily: 'Roboto',
  },

  // Verse text pages
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  content: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  leftColumn: {
    flex: 2,
    padding: 10,
  },
  rightColumn: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  dottedBackground: {
    backgroundColor: '#f0f0f0',
    width: '100%',
    height: '100%',
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: documentConfig.fontSize,
    lineHeight: 1.35,
    color: documentConfig.textColor,
    marginBottom: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 9,
  },
  footerRight: {
    fontSize: 9,
  },
  verticalTextContainer: {
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%) rotate(-90deg)',
    transformOrigin: 'left top',
  },
  verticalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  brandName: { marginRight: 5 },
  socialIcon: {
    width: 8,
    height: 8,
    marginRight: 5,
  },
});

const FullBibleDocument = ({ books }) => {
  // break books into 3 columns
  const booksPerCol = Math.ceil(books.length / NUM_BOOK_COLS);
  const bookCols = Array.from({ length: NUM_BOOK_COLS }, (_, i) =>
    books.slice(i * booksPerCol, (i + 1) * booksPerCol)
  );

  // 1) Books index page

  const bookIndexPage = (
    <Page size="A4" style={styles.page} wrap key="books-index">
      <View id="books-index" style={styles.invisibleAnchor} />
      <Text style={styles.title}>Table des livres</Text>

      <View style={styles.bookGrid}>
        {bookCols.map((col, ci) => (
          <View style={styles.bookColumn} key={ci}>
            {col.map((book) => (
              <Link
                key={book.bookName}
                src={`#chapters-${book.bookName}`}
              >
                <Text style={styles.bookBox}>{book.bookName}</Text>
              </Link>
            ))}
          </View>
        ))}
      </View>
    </Page>
  );

  // 2) One chapter-index page per Book
  const chapterIndexPages = books.map((book) => {
    // how many chapters?
    const maxChap = Math.max(...book.verses.map((v) => v.chapter));
    return (
      <Page size="A4" style={styles.page} wrap key={`chapters-index-${book.bookName}`}>
        {/* invisible anchor for this book */}
        <View id={`chapters-${book.bookName}`} style={styles.invisibleAnchor} />

        <Text style={styles.title}>Chapitres de {book.bookName}</Text>
        <View style={styles.chapterGrid}>
          {Array.from({ length: maxChap }, (_, i) => i + 1).map((chap) => (
            <Link
              key={chap}
              src={`#${book.bookName}-${chap}`}
            >
              <Text style={styles.chapterBox}>{chap}</Text>
            </Link>
          ))}
        </View>
      </Page>
    );
  });

  // 3) All the actual chapter pages
  const chapterPages = books.flatMap(({ bookName, verses }) => {
    // group verses by chapter
    const chapters = Object.values(
      verses.reduce((acc, v) => {
        acc[v.chapter] = acc[v.chapter] || { chapter: v.chapter, verses: [] };
        acc[v.chapter].verses.push(v);
        return acc;
      }, {})
    ).sort((a, b) => a.chapter - b.chapter);

    return chapters.map((chap) => (
      <Page
        key={`${bookName}-${chap.chapter}`}
        size="A4"
        style={styles.page}
        wrap
      >
        {/* invisible anchor for this chapter */}
        <View
          id={`${bookName}-${chap.chapter}`}
          style={styles.invisibleAnchor}
        />

        {/* Header */}
        <View fixed style={styles.header}>
          <View style={styles.headerTitleBox}>
            <Text style={styles.headerTitle}>
              {bookName} {chap.chapter}
            </Text>
          </View>
          <Link src="#books-index">

          <Svg
            width="24"
            height="24"
            viewBox="0 0 38 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
          <Path d="M36.6429 18.8571H1.35714C0.997206 18.8571 0.652012 18.9399 0.397498 19.0873C0.142984 19.2346 0 19.4345 0 19.6429L0 21.2143C0 21.4227 0.142984 21.6225 0.397498 21.7699C0.652012 21.9172 0.997206 22 1.35714 22H36.6429C37.0028 22 37.348 21.9172 37.6025 21.7699C37.857 21.6225 38 21.4227 38 21.2143V19.6429C38 19.4345 37.857 19.2346 37.6025 19.0873C37.348 18.9399 37.0028 18.8571 36.6429 18.8571ZM36.6429 12.5714H1.35714C0.997206 12.5714 0.652012 12.6542 0.397498 12.8016C0.142984 12.9489 0 13.1488 0 13.3571L0 14.9286C0 15.137 0.142984 15.3368 0.397498 15.4842C0.652012 15.6315 0.997206 15.7143 1.35714 15.7143H36.6429C37.0028 15.7143 37.348 15.6315 37.6025 15.4842C37.857 15.3368 38 15.137 38 14.9286V13.3571C38 13.1488 37.857 12.9489 37.6025 12.8016C37.348 12.6542 37.0028 12.5714 36.6429 12.5714ZM36.6429 6.28571H1.35714C0.997206 6.28571 0.652012 6.36849 0.397498 6.51584C0.142984 6.66319 0 6.86304 0 7.07143L0 8.64286C0 8.85124 0.142984 9.05109 0.397498 9.19844C0.652012 9.34579 0.997206 9.42857 1.35714 9.42857H36.6429C37.0028 9.42857 37.348 9.34579 37.6025 9.19844C37.857 9.05109 38 8.85124 38 8.64286V7.07143C38 6.86304 37.857 6.66319 37.6025 6.51584C37.348 6.36849 37.0028 6.28571 36.6429 6.28571ZM36.6429 0L1.35714 0C0.997206 0 0.652012 0.0827803 0.397498 0.23013C0.142984 0.37748 0 0.57733 0 0.785714L0 2.35714C0 2.56553 0.142984 2.76538 0.397498 2.91273C0.652012 3.06008 0.997206 3.14286 1.35714 3.14286H36.6429C37.0028 3.14286 37.348 3.06008 37.6025 2.91273C37.857 2.76538 38 2.56553 38 2.35714V0.785714C38 0.57733 37.857 0.37748 37.6025 0.23013C37.348 0.0827803 37.0028 0 36.6429 0Z" fill="black"/>
            
          </Svg>
          </Link>
        </View>
        <View fixed style={styles.headerLine} />

        {/* Verses */}
        <View style={styles.content}>
          <View style={styles.leftColumn}>
            {chap.verses.map((verse) => (
              <Text
                key={`${bookName}-${chap.chapter}-${verse.verse}`}
                style={styles.text}
              >
                {verse.verse}. {clean(verse.text)}
              </Text>
            ))}
          </View>
          <View fixed style={styles.rightColumn}>
            <Svg style={styles.dottedBackground} viewBox="-10 -10 160 0">
              {Array.from({ length: 40 }).map((_, row) =>
                Array.from({ length: 8 }).map((_, col) => (
                  <Circle
                    key={`${row}-${col}`}
                    cx={col * 20}
                    cy={row * 20}
                    r={1}
                    fill="#49494A"
                  />
                ))
              )}
            </Svg>
          </View>
        </View>

        {/* Footer */}
        <View fixed style={styles.footer}>
          <View style={styles.footerLeft}>
            <Link src="https://parolemeditation.com/">
            <Text style={styles.brandName}>@parolemeditation</Text>
            </Link>
            <View style={{ flexDirection: 'row' }}>
              <Link src="https://www.youtube.com/@parolemeditation">
              <Image
                src={path.resolve(
                  process.cwd(),
                  'public/youtubeIcon.png'
                )}
                style={styles.socialIcon}
              />
              </Link>
              <Link src="https://www.tiktok.com/@parolemeditation">
              <Image
                src={path.resolve(
                  process.cwd(),
                  'public/tiktokIcon.png'
                )}
                style={styles.socialIcon}
              />
              </Link>
              <Link src="https://www.instagram.com/parolemeditation/">
              <Image
                src={path.resolve(
                  process.cwd(),
                  'public/instagramIcon.png'
                )}
                style={styles.socialIcon}
              />
              </Link>
              <Link src="https://ca.pinterest.com/parolemeditation/">
              <Image
                src={path.resolve(
                  process.cwd(),
                  'public/pinterestIcon.png'
                )}
                style={styles.socialIcon}
              />
              </Link>
            </View>
          </View>
          <Text
            style={styles.footerRight}
            render={({ pageNumber }) => `${pageNumber}`}
          />
        </View>

        {/* Vertical Book name */}
        <View fixed style={styles.verticalTextContainer}>
          <Text style={styles.verticalText}>{bookName}</Text>
        </View>
      </Page>
    ));
  });

  return (
    <Document>
      {bookIndexPage}
      {chapterIndexPages}
      {chapterPages}
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

export default FullBibleDocument;
