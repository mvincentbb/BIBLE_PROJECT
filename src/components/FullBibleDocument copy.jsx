import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Svg, Path, Circle, Image } from '@react-pdf/renderer';
import documentConfig from '@/config/documentConfig.json';
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
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: documentConfig.fontSize,
    color: documentConfig.textColor,
    lineHeight: 1.5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 1,
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
  bookTitle: {
    fontSize: 18,
    fontFamily: 'Roboto-Serif',
    marginBottom: 15,
    textAlign: 'center',
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: -20,
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 9,
  },
  footerRight: {
    fontSize: 9,
  },
  socialIcon: {
    width: 8,
    height: 8,
    marginRight: 5,
  },
  brandName: {
    marginRight: 5,
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
  backgroundPattern: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: 'radial-gradient(#49494A 0.6px, transparent 1px)',
  backgroundSize: '20px 20px',
  zIndex: -1,
},
dottedLineContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    zIndex: -1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    // justifyContent: 'space-evenly'
  },
  
  dottedLine: {
    borderBottom: '1px dotted #49494A',
    width: '100%',
    height: 1,
    // width: '100%',
    // backgroundImage: 'repeating-linear-gradient(to right, #49494A 0px, #49494A 1px, transparent 1px, transparent 10px)',
 
  },

});

const FullBibleDocument = ({ books }) => (
  <Document>
    {books.map(({ bookName, verses }, index) => (
      <Page key={`${bookName}-${index}`} size="A4" style={styles.page} wrap>
        <View fixed>
          <View style={styles.header}>
                            <View style={styles.headerTitleBox}>
                              <Text style={styles.headerTitle}>{bookName}</Text>
                            </View>
                            <Svg width="24" height="24" viewBox="0 0 38 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <Path d="M36.6429 18.8571H1.35714C0.997206 18.8571 0.652012 18.9399 0.397498 19.0873C0.142984 19.2346 0 19.4345 0 19.6429L0 21.2143C0 21.4227 0.142984 21.6225 0.397498 21.7699C0.652012 21.9172 0.997206 22 1.35714 22H36.6429C37.0028 22 37.348 21.9172 37.6025 21.7699C37.857 21.6225 38 21.4227 38 21.2143V19.6429C38 19.4345 37.857 19.2346 37.6025 19.0873C37.348 18.9399 37.0028 18.8571 36.6429 18.8571ZM36.6429 12.5714H1.35714C0.997206 12.5714 0.652012 12.6542 0.397498 12.8016C0.142984 12.9489 0 13.1488 0 13.3571L0 14.9286C0 15.137 0.142984 15.3368 0.397498 15.4842C0.652012 15.6315 0.997206 15.7143 1.35714 15.7143H36.6429C37.0028 15.7143 37.348 15.6315 37.6025 15.4842C37.857 15.3368 38 15.137 38 14.9286V13.3571C38 13.1488 37.857 12.9489 37.6025 12.8016C37.348 12.6542 37.0028 12.5714 36.6429 12.5714ZM36.6429 6.28571H1.35714C0.997206 6.28571 0.652012 6.36849 0.397498 6.51584C0.142984 6.66319 0 6.86304 0 7.07143L0 8.64286C0 8.85124 0.142984 9.05109 0.397498 9.19844C0.652012 9.34579 0.997206 9.42857 1.35714 9.42857H36.6429C37.0028 9.42857 37.348 9.34579 37.6025 9.19844C37.857 9.05109 38 8.85124 38 8.64286V7.07143C38 6.86304 37.857 6.66319 37.6025 6.51584C37.348 6.36849 37.0028 6.28571 36.6429 6.28571ZM36.6429 0L1.35714 0C0.997206 0 0.652012 0.0827803 0.397498 0.23013C0.142984 0.37748 0 0.57733 0 0.785714L0 2.35714C0 2.56553 0.142984 2.76538 0.397498 2.91273C0.652012 3.06008 0.997206 3.14286 1.35714 3.14286H36.6429C37.0028 3.14286 37.348 3.06008 37.6025 2.91273C37.857 2.76538 38 2.56553 38 2.35714V0.785714C38 0.57733 37.857 0.37748 37.6025 0.23013C37.348 0.0827803 37.0028 0 36.6429 0Z" fill="black"/>
                            </Svg>
                          </View>
          <View style={styles.headerLine} />
        </View>

        <View style={styles.content}>
          <View style={styles.leftColumn}>
            {/* <Text style={styles.bookTitle}>{bookName}</Text> */}
            {Object.values(
              verses.reduce((chapters, verse) => {
                const chapterKey = verse.chapter;
                if (!chapters[chapterKey]) {
                  chapters[chapterKey] = { chapter: chapterKey, verses: [] };
                }
                chapters[chapterKey].verses.push(verse);
                return chapters;
              }, {})
            ).sort((a, b) => a.chapter - b.chapter).map((chapterData) => (
              <View key={`${bookName}-${chapterData.chapter}`} style={styles.chapter}>
                <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Chapitre {chapterData.chapter}</Text>
                {chapterData.verses.map((verse) => (
                  <Text style={styles.text} key={`${verse.book}-${chapterData.chapter}-${verse.verse}`}>
                    {verse.verse}. {verse.text}
                  </Text>
                ))}
              </View>
            ))}
          </View>
          <View fixed style={styles.rightColumn}>
            {/* <Svg style={styles.dottedBackground} viewBox="-10 -10 160 0">
              {Array.from({ length: 40 }).map((_, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  {Array.from({ length: 8 }).map((_, colIndex) => (
                    <Circle key={colIndex} cx={colIndex * 20} cy={rowIndex * 20} r={1} fill="#49494A" />
                  ))}
                </React.Fragment>
              ))}
            </Svg> */}
             <View style={styles.dottedLineContainer} >
                                    {Array.from({ length: 40 }).map((_, index) => (
                                     <View key={index} style={styles.dottedLine} />
                                             ))}
                                </View>
          </View>
        </View>

        <View fixed style={styles.footer}>
          <View style={styles.footerLeft}>
            <Text style={styles.brandName}>@meditationfacile</Text>
            <Image src={path.resolve(process.cwd(), 'public/youtubeIcon.png')} style={styles.socialIcon} />
            <Image src={path.resolve(process.cwd(), 'public/xIcon.png')} style={styles.socialIcon} />
            <Image src={path.resolve(process.cwd(), 'public/metaIcon.png')} style={styles.socialIcon} />
            <Image src={path.resolve(process.cwd(), 'public/instagramIcon.png')} style={styles.socialIcon} />
          </View>
          <Text style={styles.footerRight} render={({ pageNumber }) => `${pageNumber}`} />
        </View>

        <View fixed style={styles.verticalTextContainer}>
          <Text style={styles.verticalText}>{bookName}</Text>
        </View>
      </Page>
    ))}
  </Document>
);
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
// export default FullBibleDocument;
