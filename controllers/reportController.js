// controllers/reportController.js
const { sequelize } = require('../models');
const puppeteer = require('puppeteer');
const ejs = require('ejs');
const path = require('path');

exports.getReportData = async (req, res) => {
  try {
    const applicationStatus = await sequelize.query(
      'SELECT status, COUNT(*) AS count FROM MutationApplications GROUP BY status',
      { type: sequelize.QueryTypes.SELECT }
    );

    const claimStatus = await sequelize.query(
      'SELECT status, COUNT(*) AS count FROM Claims GROUP BY status',
      { type: sequelize.QueryTypes.SELECT }
    );

    const applicationsByMonth = await sequelize.query(
      `SELECT 
        MONTHNAME(createdAt) as month, 
        COUNT(*) as count 
      FROM MutationApplications 
      GROUP BY month 
      ORDER BY FIELD(month, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December')`,
      { type: sequelize.QueryTypes.SELECT }
    );

    res.json({
      applicationStatus,
      claimStatus,
      applicationsByMonth,
    });
  } catch (error) {
    console.error('Error fetching report data:', error);
    res.status(500).json({ error: 'Error fetching report data' });
  }
};

exports.generateReport = async (req, res) => {
  try {
    const applicationStatus = await sequelize.query(
      'SELECT status, COUNT(*) AS count FROM MutationApplications GROUP BY status',
      { type: sequelize.QueryTypes.SELECT }
    );

    const claimStatus = await sequelize.query(
      'SELECT status, COUNT(*) AS count FROM Claims GROUP BY status',
      { type: sequelize.QueryTypes.SELECT }
    );

    const applicationsByMonth = await sequelize.query(
      `SELECT 
        MONTHNAME(createdAt) as month, 
        COUNT(*) as count 
      FROM MutationApplications 
      GROUP BY month 
      ORDER BY FIELD(month, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December')`,
      { type: sequelize.QueryTypes.SELECT }
    );

    const data = {
      applicationStatus,
      claimStatus,
      applicationsByMonth,
    };

    const templatePath = path.join(__dirname, '../views/reportTemplate.ejs');
    const html = await ejs.renderFile(templatePath, data);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);
    const pdf = await page.pdf({ format: 'A4' });

    await browser.close();

    res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdf);
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ error: 'Error generating report' });
  }
};
