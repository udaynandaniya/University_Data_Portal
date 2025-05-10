const fs = require("fs");
const pdf = require("pdf-parse");

const pdfPath = "../data/Enrolled.pdf"; // relative to this script

const extractData = async () => {
  try {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer);
    
    // Log the full text extracted from the PDF
    console.log("Extracted Text:", data.text);

    const lines = data.text.split("\n");

    // Adjusted parsing logic according to your PDF format
    const result = [];

    for (const line of lines) {
      // Adjusted regex pattern
      const match = line.match(/^(\d+)\s+(\d+)([A-Za-z\s]+)(\d{10})$/);

      if (match) {
        const [, enrollment, name, whatsapp] = match;
        console.log("Match found:", enrollment, name, whatsapp); // Check if it's matching
        result.push({ enrollment, name, whatsapp, email: `${enrollment}@adaniuni.ac.in` });
      }
    }

    // Check if any data was captured
    if (result.length > 0) {
      console.log("Extracted Data:", result);
      const outputPath = "../helpers/enrollmentData.json";
      console.log("Writing to:", outputPath);
      fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
      console.log("✅ Data extracted and saved to enrollmentData.json");
    } else {
      console.log("❌ No data extracted. Please check the regex pattern and PDF structure.");
    }

  } catch (err) {
    console.error("❌ Error:", err);
  }
};

extractData();
