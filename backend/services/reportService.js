// backend/services/reportService.js
const fs = require('fs');
const path = require('path');
const { assessmentData } = require('../data/data');
const { assessmentConfigurations, extractValue, classifyValue } = require('../config/assessmentConfig');
const { getPDFGenerator } = require('./pdfGenerator');

class ReportService {
  constructor() {
    this.templatesPath = path.join(__dirname, '../templates');
    this.reportsPath = path.join(__dirname, '../generated-reports');
  }

  // Get assessment data by session ID
  getAssessmentData(sessionId) {
    const data = assessmentData.find(item => item.session_id === sessionId);
    if (!data) {
      throw new Error(`No assessment data found for session ID: ${sessionId}`);
    }
    return data;
  }

  // Get configuration for assessment type
  getAssessmentConfig(assessmentId) {
    const config = assessmentConfigurations[assessmentId];
    if (!config) {
      throw new Error(`No configuration found for assessment ID: ${assessmentId}`);
    }
    return config;
  }

  // Process data according to configuration
  processAssessmentData(data, config) {
    const processedSections = config.sections.map(section => {
      const processedFields = section.fields.map(field => {
        const rawValue = extractValue(data, field.path);
        const classification = classifyValue(rawValue, field.classification);
        
        return {
          label: field.label,
          value: rawValue,
          unit: field.unit,
          classification,
          displayValue: rawValue ? `${rawValue} ${field.unit}` : 'N/A'
        };
      });

      return {
        id: section.id,
        title: section.title,
        fields: processedFields
      };
    });

    return {
      assessmentName: config.name,
      sections: processedSections,
      metadata: {
        sessionId: data.session_id,
        assessmentId: data.assessment_id,
        timestamp: data.timestamp,
        generatedAt: new Date().toISOString()
      }
    };
  }

//   // Load and render HTML template
//   renderTemplate(templateName, data) {
//     try {
//       const templatePath = path.join(this.templatesPath, `${templateName}.html`);
      
//       if (!fs.existsSync(templatePath)) {
//         throw new Error(`Template not found: ${templatePath}`);
//       }

//       let template = fs.readFileSync(templatePath, 'utf8');
//       console.log('--- Template HTML Preview ---');
//     console.log(template.substring(0, 500)); // show first 500 chars
//     console.log('--- End of Template Preview ---');
//       // Simple template rendering (replace {{variable}} with actual values)
//       template = template.replace(/\{\{assessmentName\}\}/g, data.assessmentName || '');
//       template = template.replace(/\{\{sessionId\}\}/g, data.metadata.sessionId || '');
//       template = template.replace(/\{\{generatedAt\}\}/g, new Date(data.metadata.generatedAt).toLocaleString());
      
//       // Render sections dynamically
//       let sectionsHtml = '';
//       data.sections.forEach(section => {
//         sectionsHtml += `
//           <div class="section">
//             <h2 class="section-title">${section.title}</h2>
//             <div class="fields-grid">
//         `;
        
//         section.fields.forEach(field => {
//           const classificationClass = field.classification ? field.classification.level : 'unknown';
//           const classificationColor = field.classification ? field.classification.color : '#6b7280';
          
//           sectionsHtml += `
//             <div class="field-card">
//               <div class="field-label">${field.label}</div>
//               <div class="field-value" style="color: ${classificationColor}">
//                 ${field.displayValue}
//               </div>
//               <div class="field-classification ${classificationClass}">
//                 ${field.classification ? field.classification.level : 'N/A'}
//               </div>
//             </div>
//           `;
//         });
        
//         sectionsHtml += `
//             </div>
//           </div>
//         `;
//       });
      
//       template = template.replace(/\{\{sections\}\}/g, sectionsHtml);
      
//       return template;
//     } catch (error) {
//       throw new Error(`Template rendering failed: ${error.message}`);
//     }
//   }

renderTemplate(templateName, data) {
  try {
    const templatePath = path.join(this.templatesPath, `${templateName}.html`);
    console.log('Looking for template at:', templatePath);

    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template not found: ${templatePath}`);
    }

    let template = fs.readFileSync(templatePath, 'utf8');
    console.log('--- Template HTML Preview ---');
    console.log(template.substring(0, 500)); // show first 500 chars
    console.log('--- End of Template Preview ---');

    // Simple template rendering (replace {{variable}} with actual values)
    template = template.replace(/\{\{assessmentName\}\}/g, data.assessmentName || '');
    template = template.replace(/\{\{sessionId\}\}/g, data.metadata.sessionId || '');
    template = template.replace(/\{\{generatedAt\}\}/g, new Date(data.metadata.generatedAt).toLocaleString());

    // Render sections dynamically
    let sectionsHtml = '';
    data.sections.forEach(section => {
      sectionsHtml += `
        <div class="section">
          <h2 class="section-title">${section.title}</h2>
          <div class="fields-grid">
      `;

      section.fields.forEach(field => {
        const classificationClass = field.classification ? field.classification.level : 'unknown';
        const classificationColor = field.classification ? field.classification.color : '#6b7280';

        sectionsHtml += `
          <div class="field-card">
            <div class="field-label">${field.label}</div>
            <div class="field-value" style="color: ${classificationColor}">
              ${field.displayValue}
            </div>
            <div class="field-classification ${classificationClass}">
              ${field.classification ? field.classification.level : 'N/A'}
            </div>
          </div>
        `;
      });

      sectionsHtml += `
          </div>
        </div>
      `;
    });

    template = template.replace(/\{\{sections\}\}/g, sectionsHtml);

    return template;
  } catch (error) {
    throw new Error(`Template rendering failed: ${error.message}`);
  }
}

  // Generate PDF report
  async generateReport(sessionId) {
    try {
      // Get assessment data
      const assessmentData = this.getAssessmentData(sessionId);
      
      // Get configuration
      const config = this.getAssessmentConfig(assessmentData.assessment_id);
      
      // Process data according to configuration
      const processedData = this.processAssessmentData(assessmentData, config);
      
      // Render HTML template
      const htmlContent = this.renderTemplate(config.template, processedData);
      console.log('--- HTML Content Preview ---');
console.log(htmlContent.slice(0, 1000)); // prints first 1000 chars
console.log('--- End of Preview ---');
      // Generate PDF filename
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `${assessmentData.assessment_id}_${sessionId}_${timestamp}.pdf`;
      const outputPath = path.join(this.reportsPath, filename);
      
      // Generate PDF
      const pdfGenerator = getPDFGenerator();
      const result = await pdfGenerator.generateAndSavePDF(htmlContent, outputPath);
      
      return {
        success: true,
        filename,
        path: outputPath,
        size: result.size,
        assessmentType: config.name,
        sessionId,
        generatedAt: new Date().toISOString()
      };
      
    } catch (error) {
      console.error('Report generation error:', error);
      throw error;
    }
    
  }

  // Get list of available sessions for testing
  getAvailableSessions() {
    return assessmentData.map(item => ({
      sessionId: item.session_id,
      assessmentId: item.assessment_id,
      assessmentName: assessmentConfigurations[item.assessment_id]?.name || 'Unknown',
      timestamp: item.timestamp
    }));
  }

  // Get report file info
  getReportInfo(filename) {
    const filePath = path.join(this.reportsPath, filename);
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`Report file not found: ${filename}`);
    }
    
    const stats = fs.statSync(filePath);
    
    return {
      filename,
      path: filePath,
      size: stats.size,
      createdAt: stats.birthtime,
      modifiedAt: stats.mtime
    };
  }

  // List all generated reports
  listGeneratedReports() {
    if (!fs.existsSync(this.reportsPath)) {
      return [];
    }
    
    const files = fs.readdirSync(this.reportsPath)
      .filter(file => file.endsWith('.pdf'))
      .map(filename => {
        const filePath = path.join(this.reportsPath, filename);
        const stats = fs.statSync(filePath);
        
        return {
          filename,
          size: stats.size,
          createdAt: stats.birthtime,
          modifiedAt: stats.mtime
        };
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    return files;
  }

  // Delete a report file
  deleteReport(filename) {
    const filePath = path.join(this.reportsPath, filename);
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`Report file not found: ${filename}`);
    }
    
    fs.unlinkSync(filePath);
    
    return {
      success: true,
      message: `Report deleted: ${filename}`
    };
  }
}

// Export singleton instance
let reportServiceInstance = null;

const getReportService = () => {
  if (!reportServiceInstance) {
    reportServiceInstance = new ReportService();
  }
  return reportServiceInstance;
};

// module.exports = {
//   ReportService,
//   getReportService
// };

module.exports ={
    ReportService,
    getReportService
}