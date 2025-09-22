
const express = require('express');
const path = require('path');
const router = express.Router();

const { authenticateToken } = require('../middleware/auth');
const { validateSessionId, validateReportRequest } = require('../middleware/validation');
const { getReportService } = require('../services/reportService');


router.get('/sessions', authenticateToken, (req, res) => {
  try {
    const reportService = getReportService();
    const sessions = reportService.getAvailableSessions();
    
    res.json({
      message: 'Available sessions retrieved successfully',
      sessions,
      count: sessions.length
    });
  } catch (error) {
    console.error('Get sessions error:', error);
    res.status(500).json({
      error: 'Failed to retrieve sessions',
      message: error.message
    });
  }
});


router.post('/generate', authenticateToken, validateReportRequest, async (req, res) => {
  try {
    const { session_id } = req.body;
    const reportService = getReportService();
    
    console.log(`Generating report for session: ${session_id}`);
    
    const result = await reportService.generateReport(session_id);
    
    res.json({
      message: 'Report generated successfully',
      report: result
    });
    
  } catch (error) {
    console.error('Report generation error:', error);
    
    if (error.message.includes('No assessment data found') || 
        error.message.includes('No configuration found')) {
      res.status(404).json({
        error: 'Data not found',
        message: error.message
      });
    } else {
      res.status(500).json({
        error: 'Report generation failed',
        message: error.message
      });
    }
  }
});


router.get('/generate/:sessionId', authenticateToken, validateSessionId, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const reportService = getReportService();
    
    console.log(`Generating report for session: ${sessionId}`);
    
    const result = await reportService.generateReport(sessionId);
    
    res.json({
      message: 'Report generated successfully',
      report: result
    });
    
  } catch (error) {
    console.error('Report generation error:', error);
    
    if (error.message.includes('No assessment data found') || 
        error.message.includes('No configuration found')) {
      res.status(404).json({
        error: 'Data not found',
        message: error.message
      });
    } else {
      res.status(500).json({
        error: 'Report generation failed',
        message: error.message
      });
    }
  }
});


router.get('/list', authenticateToken, (req, res) => {
  try {
    const reportService = getReportService();
    const reports = reportService.listGeneratedReports();
    
    res.json({
      message: 'Generated reports retrieved successfully',
      reports,
      count: reports.length
    });
  } catch (error) {
    console.error('List reports error:', error);
    res.status(500).json({
      error: 'Failed to retrieve reports',
      message: error.message
    });
  }
});

router.get('/download/:filename', authenticateToken, (req, res) => {
  try {
    const { filename } = req.params;
    const reportService = getReportService();
    
  
    if (!filename.match(/^[\w\-_\.]+\.pdf$/)) {
      return res.status(400).json({
        error: 'Invalid filename',
        message: 'Filename contains invalid characters'
      });
    }
    
    const reportInfo = reportService.getReportInfo(filename);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', reportInfo.size);
    
    res.sendFile(reportInfo.path);
    
  } catch (error) {
    console.error('Download report error:', error);
    
    if (error.message.includes('not found')) {
      res.status(404).json({
        error: 'Report not found',
        message: error.message
      });
    } else {
      res.status(500).json({
        error: 'Failed to download report',
        message: error.message
      });
    }
  }
});


router.delete('/:filename', authenticateToken, (req, res) => {
  try {
    const { filename } = req.params;
    const reportService = getReportService();
    
    
    if (!filename.match(/^[\w\-_\.]+\.pdf$/)) {
      return res.status(400).json({
        error: 'Invalid filename',
        message: 'Filename contains invalid characters'
      });
    }
    
    const result = reportService.deleteReport(filename);
    
    res.json({
      message: result.message,
      success: result.success
    });
    
  } catch (error) {
    console.error('Delete report error:', error);
    
    if (error.message.includes('not found')) {
      res.status(404).json({
        error: 'Report not found',
        message: error.message
      });
    } else {
      res.status(500).json({
        error: 'Failed to delete report',
        message: error.message
      });
    }
  }
});


router.get('/config/:assessmentId', authenticateToken, (req, res) => {
  try {
    const { assessmentId } = req.params;
    const reportService = getReportService();
    
    const config = reportService.getAssessmentConfig(assessmentId);
    
    res.json({
      message: 'Assessment configuration retrieved successfully',
      assessmentId,
      config
    });
    
  } catch (error) {
    console.error('Get config error:', error);
    
    if (error.message.includes('No configuration found')) {
      res.status(404).json({
        error: 'Configuration not found',
        message: error.message
      });
    } else {
      res.status(500).json({
        error: 'Failed to retrieve configuration',
        message: error.message
      });
    }
  }
});

 module.exports = router;