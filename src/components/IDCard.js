import {
  Page,
  Text,
  Image,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    width: 242.65,
    height: 153,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    marginBottom: 5,
  },
  details: {
    fontSize: 12,
    textAlign: "center",
  },
});

export const IDCard = () => {
  <Document>
    <Page size={{ width: 242.65, height: 153 }} styles={styles.page}>
      <Image styles={styles.image} src={"http"} />
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.details}>Employee ID: 12345</Text>
      <Text style={styles.details}>Department: IT</Text>
    </Page>
  </Document>;
};
