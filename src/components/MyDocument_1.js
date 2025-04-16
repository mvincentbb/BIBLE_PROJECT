'use client';
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Svg, Path, Circle, Rect, Font } from '@react-pdf/renderer';
import documentConfig from '@/config/documentConfig.json';
import bibleData from '@/bible/segond.json';




// Register the fonts
Font.register({
  family: 'Itim',
  src: '/fonts/Itim-Regular.ttf', // Adjust the path if needed
});

Font.register({
  family: 'Pirata One',
  src: '/fonts/PirataOne-Regular.ttf', // Adjust the path if needed
});

Font.register({
  family: 'Roboto-Serif',
  src: '/fonts/Roboto-Regular.ttf', // Adjust the path if needed
});
Font.register({
  family: 'Roboto',
  src: '/fonts/Roboto.ttf', // Adjust the path if needed
});

const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#E4E4E4',
      padding: 20,
      paddingBottom: 40,
       // Add some space for the footer
    },
    text:{
      fontFamily: 'Roboto',
      fontSize: documentConfig.fontSize,
      color: documentConfig.textColor,
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
    //   borderRadius: 4,
      borderTopRightRadius: 4,
      borderTopLeftRadius: 4,
    },
    headerTitle: {
      color: 'white',
      fontSize: 16,
      fontFamily: 'Itim',
    },

    headerLine: {
        borderBottomWidth: 1, // Adjust as needed
        borderBottomColor: 'gray', // Adjust as needed
        width: '100%',
        marginBottom: 10, // Add some space below the line
      },
    hamburgerIcon: {
      width: 24,
      height: 24,
    },
    menuIcon: {  
        width: 24, // Adjust the size as needed
        height: 24,
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
     
      },
      dottedBackground: {
        backgroundColor: '#f0f0f0',
        width: '100%',
        height: '100%',
        
      },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: -20,
      // marginTop: 200,
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
  });


const MyDocument = () => {
 const verses = bibleData.verses;
 // Regrouper les versets par chapitre
 const chapters = verses.reduce((acc, verse) => {
  const key = `${verse.book_name}-${verse.chapter}`;
  if (!acc[key]) {
    acc[key] = {
      bookName: verse.book_name,
      chapter: verse.chapter,
      verses: [],
    };
  }
  acc[key].verses.push(verse);
  return acc;
}, {});
    return (
    <Document>
      {Object.values(chapters).map((chapter) => (
        
        // <Page size="A4" style={styles.page}>
        <Page size="A4" style={styles.page} key={`${chapter.bookName}-${chapter.chapter}`}>
        <View fixed >
        <View  style={styles.header}>
          <View style={styles.headerTitleBox}>
            <Text style={styles.headerTitle}>{chapter.bookName} {chapter.chapter}</Text>
          </View>
          <Svg width="24" height="24" viewBox="0 0 38 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M36.6429 18.8571H1.35714C0.997206 18.8571 0.652012 18.9399 0.397498 19.0873C0.142984 19.2346 0 19.4345 0 19.6429L0 21.2143C0 21.4227 0.142984 21.6225 0.397498 21.7699C0.652012 21.9172 0.997206 22 1.35714 22H36.6429C37.0028 22 37.348 21.9172 37.6025 21.7699C37.857 21.6225 38 21.4227 38 21.2143V19.6429C38 19.4345 37.857 19.2346 37.6025 19.0873C37.348 18.9399 37.0028 18.8571 36.6429 18.8571ZM36.6429 12.5714H1.35714C0.997206 12.5714 0.652012 12.6542 0.397498 12.8016C0.142984 12.9489 0 13.1488 0 13.3571L0 14.9286C0 15.137 0.142984 15.3368 0.397498 15.4842C0.652012 15.6315 0.997206 15.7143 1.35714 15.7143H36.6429C37.0028 15.7143 37.348 15.6315 37.6025 15.4842C37.857 15.3368 38 15.137 38 14.9286V13.3571C38 13.1488 37.857 12.9489 37.6025 12.8016C37.348 12.6542 37.0028 12.5714 36.6429 12.5714ZM36.6429 6.28571H1.35714C0.997206 6.28571 0.652012 6.36849 0.397498 6.51584C0.142984 6.66319 0 6.86304 0 7.07143L0 8.64286C0 8.85124 0.142984 9.05109 0.397498 9.19844C0.652012 9.34579 0.997206 9.42857 1.35714 9.42857H36.6429C37.0028 9.42857 37.348 9.34579 37.6025 9.19844C37.857 9.05109 38 8.85124 38 8.64286V7.07143C38 6.86304 37.857 6.66319 37.6025 6.51584C37.348 6.36849 37.0028 6.28571 36.6429 6.28571ZM36.6429 0L1.35714 0C0.997206 0 0.652012 0.0827803 0.397498 0.23013C0.142984 0.37748 0 0.57733 0 0.785714L0 2.35714C0 2.56553 0.142984 2.76538 0.397498 2.91273C0.652012 3.06008 0.997206 3.14286 1.35714 3.14286H36.6429C37.0028 3.14286 37.348 3.06008 37.6025 2.91273C37.857 2.76538 38 2.56553 38 2.35714V0.785714C38 0.57733 37.857 0.37748 37.6025 0.23013C37.348 0.0827803 37.0028 0 36.6429 0Z" fill="black"/>
        </Svg>
        
        </View>
        <View  style={styles.headerLine}> </View>
        </View>
        <View style={styles.content}>
          <View style={styles.leftColumn}>
            {/* <Text style={styles.text}>{bibleText}</Text> */}
            {chapter.verses.map((verse) => (
              <Text style={styles.text} key={`${verse.book}-${verse.chapter}-${verse.verse}`}>
                {verse.verse}. {verse.text}
              </Text>
            ))}
          </View>
          {/* <View style={styles.rightColumn}  backgroundImage= '/dotted-background.png'/> */}
            <View  fixed style={styles.rightColumn}>
          <Svg style={styles.dottedBackground} viewBox="-10 -10 160 0">
            {/* Adjust these values to control dot size and spacing */}
            {Array.from({ length: 40 }).map((_, rowIndex) => (
              <React.Fragment key={rowIndex}>
                {Array.from({ length: 8 }).map((_, colIndex) => (
                  <Circle
                    key={colIndex}
                    cx={colIndex * 20} // Horizontal spacing
                    cy={rowIndex * 20} // Vertical spacing
                    r={1} // Dot radius
                    fill="#49494A" // Dot color
                  />
                ))}
              </React.Fragment>
            ))}
          </Svg>
        </View>
        </View>
        <View fixed style={styles.footer}>
          <View style={styles.footerLeft}>
            <Text style={styles.brandName}>@meditationfacile</Text>
            <Image src="/youtubeIcon.png" style={styles.socialIcon} alt="YouTube" />
            <Image src="/xIcon.png" style={styles.socialIcon} alt="X" />
            <Image src="/metaIcon.png" style={styles.socialIcon} alt="Facebook" />
            <Image src="/instagramIcon.png" style={styles.socialIcon} alt="Instagram" />
          </View>
          {/* <Text style={styles.footerRight}>{pageNumber}</Text> */}
          <Text style={styles.footerRight}
          render={({ pageNumber, totalPages }) =>
            ` ${pageNumber}`
          }
        />
        </View>
        <View fixed style={styles.verticalTextContainer}>
            <Text style={styles.verticalText}>Genèse</Text>
        </View>
      </Page>
      ))}

    
   
    </Document>
);
};
export default MyDocument;
// export  default MyDocumentchuck ;