import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 10,
  },
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeaderCell: {
    backgroundColor: '#f0f0f0',
    padding: 5,
    fontSize: 12,
    fontWeight: 'bold',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    width: '33%',
  },
  tableCell: {
    padding: 5,
    fontSize: 12,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    width: '33%',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: 'grey',
  },
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Sample PDF Document</Text>
      
      <View style={styles.section}>
        <Text style={styles.subtitle}>Company Information</Text>
        <Text style={styles.text}>
          This is a sample PDF document generated using Next.js and react-pdf.
          You can customize this document with your own content, images, and styling.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.subtitle}>Sample Data</Text>
        
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeaderCell}>Name</Text>
            <Text style={styles.tableHeaderCell}>Department</Text>
            <Text style={styles.tableHeaderCell}>Position</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>John Doe</Text>
            <Text style={styles.tableCell}>Engineering</Text>
            <Text style={styles.tableCell}>Senior Developer</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Jane Smith</Text>
            <Text style={styles.tableCell}>Design</Text>
            <Text style={styles.tableCell}>UI/UX Designer</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Robert Johnson</Text>
            <Text style={styles.tableCell}>Marketing</Text>
            <Text style={styles.tableCell}>Marketing Manager</Text>
          </View>
        </View>
      </View>
      
      <Text style={styles.footer}>
        Generated on {new Date().toLocaleDateString()} • Page 1 of 1
      </Text>
    </Page>
  </Document>
);

export default MyDocument;