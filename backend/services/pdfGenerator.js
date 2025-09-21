// // backend/services/pdfGenerator.js
// const puppeteer = require('puppeteer');
// const fs = require('fs');
// const path = require('path');

// class PDFGenerator {
//   constructor() {
//     this.browser = null;
//   }

//   async initialize() {
//     if (!this.browser) {
//       this.browser = await puppeteer.launch({
//         headless: 'new',
//         args: [
//           '--no-sandbox',
//           '--disable-setuid-sandbox',
//           '--disable-dev-shm-usage',
//           '--disable-accelerated-2d-canvas',
//           '--disable-gpu'
//         ]
//       });
//     }
//     return this.browser;
//   }

//   async generatePDF(htmlContent, options = {}) {
//     try {
//       await this.initialize();
//       const page = await this.browser.newPage();

//       // Set viewport for consistent rendering
//       await page.setViewport({
//         width: 1200,
//         height: 1600,
//         deviceScaleFactor: 2
//       });

//       // Set HTML content
//       await page.setContent(htmlContent, {
//         waitUntil: ['domcontentloaded', 'networkidle0'],
//         timeout: 30000
//       });

//       // PDF generation options
//       const pdfOptions = {
//         format: 'A4',
//         printBackground: true,
//         margin: {
//           top: '20mm',
//           right: '15mm',
//           bottom: '20mm',
//           left: '15mm'
//         },
//         ...options
//       };

//       // Generate PDF buffer
//       const pdfBuffer = await page.pdf(pdfOptions);
      
//       await page.close();
//       return pdfBuffer;

//     } catch (error) {
//       console.error('PDF generation error:', error);
//       throw new Error(`PDF generation failed: ${error.message}`);
//     }
//   }

//   async generateAndSavePDF(htmlContent, outputPath, options = {}) {
//     try {
//       const pdfBuffer = await this.generatePDF(htmlContent, options);
      
//       // Ensure output directory exists
//       const outputDir = path.dirname(outputPath);
//       if (!fs.existsSync(outputDir)) {
//         fs.mkdirSync(outputDir, { recursive: true });
//       }

//       // Save PDF to file
//       fs.writeFileSync(outputPath, pdfBuffer);
      
//       console.log(`PDF saved successfully: ${outputPath}`);
//       return {
//         success: true,
//         path: outputPath,
//         size: pdfBuffer.length
//       };

//     } catch (error) {
//       console.error('PDF save error:', error);
//       throw error;
//     }
//   }

//   async close() {
//     if (this.browser) {
//       await this.browser.close();
//       this.browser = null;
//     }
//   }
// }

// // Singleton instance
// let pdfGeneratorInstance = null;

// const getPDFGenerator = () => {
//   if (!pdfGeneratorInstance) {
//     pdfGeneratorInstance = new PDFGenerator();
//   }
//   return pdfGeneratorInstance;
// };

// // Graceful shutdown
// process.on('SIGINT', async () => {
//   console.log('Shutting down PDF generator...');
//   if (pdfGeneratorInstance) {
//     await pdfGeneratorInstance.close();
//   }
//   process.exit(0);
// });

// process.on('SIGTERM', async () => {
//   console.log('Shutting down PDF generator...');
//   if (pdfGeneratorInstance) {
//     await pdfGeneratorInstance.close();
//   }
//   process.exit(0);
// });

// // module.exports = {
// //   PDFGenerator,
// //   getPDFGenerator
// // };

// module.exports ={
//     PDFGenerator,
//     getPDFGenerator
// }

// backend/services/pdfGenerator.js
const fs = require('fs');
const puppeteer = require('puppeteer');

class PDFGenerator {
  async generateAndSavePDF(htmlContent, outputPath) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Set content from HTML string
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // Optional: emulate print CSS
    await page.emulateMediaType('screen');

    // Generate PDF
    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' },
    });

    await browser.close();

    // Return file info
    const stats = fs.statSync(outputPath);
    return { size: stats.size };
  }
}

let pdfGeneratorInstance = null;

const getPDFGenerator = () => {
  if (!pdfGeneratorInstance) {
    pdfGeneratorInstance = new PDFGenerator();
  }
  return pdfGeneratorInstance;
};

module.exports = { getPDFGenerator };
