const Meter = require('../models/Meter');
const Application = require('../models/MutationApplication');
const User = require('../models/User');
const Claim = require('../models/Claim'); // Make sure you have this model defined and imported
const { sequelize } = require('../models'); // Import sequelize instance

exports.addMeter = async (req, res) => {
  const { meterNumber, ownerName, latitude, longitude } = req.body;

  try {
    const newMeter = await Meter.create({
      meterNumber,
      ownerName,
      latitude,
      longitude
    });

    res.json({ meter: newMeter });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.viewAndManageApplications = async (req, res) => {
  try {
    const applications = await Application.findAll({ include: [User, Meter] });
    res.json({ applications });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.updateApplicationStatus = async (req, res) => {
  const { applicationId, status } = req.body;

  try {
    const application = await Application.findByPk(applicationId);
    if (!application) return res.status(400).send('Application not found');

    application.status = status;
    await application.save();

    res.json({ application });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.respondToClaim = async (req, res) => {
  const { claimId, response } = req.body;

  try {
    const claim = await Claim.findByPk(claimId);
    if (!claim) return res.status(400).send('Claim not found');

    claim.response = response;
    await claim.save();

    res.json({ claim });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.viewMetersOnMap = async (req, res) => {
  try {
    const meters = await Meter.findAll();
    res.json({ meters });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.generateReports = async (req, res) => {
  try {
    const report = await Application.findAll({
      attributes: ['status', [sequelize.fn('count', sequelize.col('status')), 'count']],
      group: ['status']
    });

    res.json({ report });
  } catch (err) {
    res.status(400).send(err.message);
  }
};
