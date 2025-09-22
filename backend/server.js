<<<<<<< HEAD

// const express = require('express');
// const cors = require('cors');
// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
// const path = require('path');
// const fs = require('fs');

// const authRoutes = require("./routes/auth")
// const reportRoutes = require("./routes/reports")

// const app = express();
// const PORT = process.env.PORT || 5000;



// app.use(cors({
//   origin: "*",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));


// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, 
//   max: 100, 
//   message: 'Too many requests from this IP, please try again later.'
// });
// app.use(limiter);

// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true }));




// const templatePath = path.join(__dirname, '../backend/templates/health-fitness.html');
// console.log('Exists?', fs.existsSync(templatePath));
// console.log('Stats:', fs.existsSync(templatePath) ? fs.statSync(templatePath) : 'No file');
// console.log('Path:', templatePath);


// const requiredDirs = [
//   path.join(__dirname, 'generated-reports'),
//   path.join(__dirname, 'data')
// ];

// requiredDirs.forEach(dir => {
//   if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir, { recursive: true });
//     console.log(`Created directory: ${dir}`);
//   }
// });


// app.use('/api/auth', authRoutes);
// app.use('/api/reports', reportRoutes);


// // Health check endpoint
// app.get('/api/health', (req, res) => {
//   res.json({ 
//     status: 'OK', 
//     timestamp: new Date().toISOString(),
//     service: 'Assessment Report Generation System'
//   });
// });

// // Serve static files from generated reports
// app.use('/api/reports/files', express.static(path.join(__dirname, 'generated-reports')));

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error('Error:', err);
  
//   // Don't leak error details in production
//   if (process.env.NODE_ENV === 'production') {
//     res.status(500).json({ 
//       error: 'Internal server error',
//       message: 'Something went wrong on our end'
//     });
//   } else {
//     res.status(500).json({ 
//       error: err.message,
//       stack: err.stack
//     });
//   }
// });


// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   console.log(`Health check: http://localhost:${PORT}/api/health`);
//   console.log(`Reports directory: ${path.join(__dirname, 'generated-reports')}`);
//   console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
// });

// module.exports = app;


// backend/server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');
=======
>>>>>>> d341b1cda0bea15d638250080515310b5fdfc6e7

// const express = require('express');
// const cors = require('cors');
// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
// const path = require('path');
// const fs = require('fs');

// const authRoutes = require("./routes/auth")
// const reportRoutes = require("./routes/reports")

<<<<<<< HEAD
// Security middleware
app.use(helmet());
// app.use(cors({
//   origin: process.env.NODE_ENV === 'production' 
//     ? ['https://assessment-management-system-nine.vercel.app/'] 
//     : ['https://assessment-management-system-nine.vercel.app/'],
//   credentials: true
// }));

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
=======
// const app = express();
// const PORT = process.env.PORT || 5000;
>>>>>>> d341b1cda0bea15d638250080515310b5fdfc6e7


// app.use(helmet());
// app.use(cors({
//   origin: process.env.NODE_ENV === 'production' 
//     ? ['assessment-management-system-nine.vercel.app'] 
//     : ['assessment-management-system-nine.vercel.app'],
//   credentials: true
// }));


// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, 
//   max: 100, 
//   message: 'Too many requests from this IP, please try again later.'
// });
// app.use(limiter);

// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true }));




// const templatePath = path.join(__dirname, '../backend/templates/health-fitness.html');
// console.log('Exists?', fs.existsSync(templatePath));
// console.log('Stats:', fs.existsSync(templatePath) ? fs.statSync(templatePath) : 'No file');
// console.log('Path:', templatePath);


// const requiredDirs = [
//   path.join(__dirname, 'generated-reports'),
//   path.join(__dirname, 'data')
// ];

// requiredDirs.forEach(dir => {
//   if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir, { recursive: true });
//     console.log(`Created directory: ${dir}`);
//   }
// });


// app.use('/api/auth', authRoutes);
// app.use('/api/reports', reportRoutes);


<<<<<<< HEAD


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Reports directory: ${path.join(__dirname, 'generated-reports')}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
=======
// app.get('/api/health', (req, res) => {
//   res.json({ 
//     status: 'OK', 
//     timestamp: new Date().toISOString(),
//     service: 'Assessment Report Generation System'
//   });
// });

>>>>>>> d341b1cda0bea15d638250080515310b5fdfc6e7

// app.use('/api/reports/files', express.static(path.join(__dirname, 'generated-reports')));


// app.use((err, req, res, next) => {
//   console.error('Error:', err);
  

//   if (process.env.NODE_ENV === 'production') {
//     res.status(500).json({ 
//       error: 'Internal server error',
//       message: 'Something went wrong on our end'
//     });
//   } else {
//     res.status(500).json({ 
//       error: err.message,
//       stack: err.stack
//     });
//   }
// });



// app.listen(PORT, () => {
//   console.log(` Server running on port ${PORT}`);
//   console.log(` Health check: http://localhost:${PORT}/api/health`);
//   console.log(` Reports directory: ${path.join(__dirname, 'generated-reports')}`);
//   console.log(`🛠️ Environment: ${process.env.NODE_ENV || 'development'}`);
// });

// module.exports = app;


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
