// controllers/mutationApplicationController.js
const db = require('../models');
const MutationApplication = db.MutationApplication;

exports.createApplication = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber } = req.user;
    const files = req.files;

    const newApplication = await MutationApplication.create({
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      identityProof: files.identityProof[0].buffer,
      newPropertyProof: files.newPropertyProof[0].buffer,
      oldPropertyProof: files.oldPropertyProof[0].buffer,
      applicationLetter: files.applicationLetter[0].buffer,
      utilityBillProof: files.utilityBillProof[0].buffer,
      status: 'Submitted',
    });

    res.status(200).send('Application submitted successfully');
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).send('Error uploading files');
  }
};
// controllers/mutationApplicationController.js
exports.getApplicationFile = async (req, res) => {
  try {
    const application = await MutationApplication.findByPk(req.params.id);
    if (!application) {
      return res.status(404).send('Application not found');
    }

    const fileType = req.params.fileType; // identityProof, newPropertyProof, etc.
    const fileBuffer = application[fileType];

    if (!fileBuffer) {
      return res.status(404).send('File not found');
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.send(fileBuffer);
  } catch (error) {
    console.error('Error fetching application file:', error);
    res.status(500).send('Error fetching application file');
  }
};


exports.getAllApplications = async (req, res) => {
  try {
    const applications = await MutationApplication.findAll();
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Error fetching applications' });
  }
};
  // Get a single mutation application by ID
exports.getApplicationById = async (req, res) => {
  try {
    const application = await MutationApplication.findByPk(req.params.id);
    if (application) {
      res.status(200).json(application);
    } else {
      res.status(404).json({ error: 'Application not found' });
    }
  } catch (error) {
    console.error('Error fetching application:', error);
    res.status(500).json({ error: 'Error fetching application' });
  }
};

// Update a mutation application by ID
exports.updateApplication = async (req, res) => {
  try {
    const files = req.files;
    const application = await MutationApplication.findByPk(req.params.id);

    if (application) {
      application.meterNumber = req.body.meterNumber || application.meterNumber;
      application.identityProof = files.identityProof ? files.identityProof[0].buffer : application.identityProof;
      application.newPropertyProof = files.newPropertyProof ? files.newPropertyProof[0].buffer : application.newPropertyProof;
      application.oldPropertyProof = files.oldPropertyProof ? files.oldPropertyProof[0].buffer : application.oldPropertyProof;
      application.applicationLetter = files.applicationLetter ? files.applicationLetter[0].buffer : application.applicationLetter;
      application.utilityBillProof = files.utilityBillProof ? files.utilityBillProof[0].buffer : application.utilityBillProof;

      await application.save();
      res.status(200).send('Application updated successfully');
    } else {
      res.status(404).json({ error: 'Application not found' });
    }
  } catch (error) {
    console.error('Error updating application:', error);
    res.status(500).send('Error updating application');
  }
};

// Delete a mutation application by ID
exports.deleteApplication = async (req, res) => {
  try {
    const application = await MutationApplication.findByPk(req.params.id);

    if (application) {
      await application.destroy();
      res.status(200).send('Application deleted successfully');
    } else {
      res.status(404).json({ error: 'Application not found' });
    }
  } catch (error) {
    console.error('Error deleting application:', error);
    res.status(500).json({ error: 'Error deleting application' });
  }
};
// controllers/mutationApplicationController.js
exports.getApplicationsByPhoneNumber = async (req, res) => {
  try {
    const phoneNumber = req.user.phoneNumber;
    console.log('Fetching applications for phone number:', phoneNumber);
    const applications = await MutationApplication.findAll({ where: { phoneNumber } });
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching user applications:', error);
    res.status(500).json({ error: 'Error fetching user applications' });
  }
};
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const application = await MutationApplication.findByPk(req.params.id);

    if (application) {
      application.status = status;
      await application.save();
      res.status(200).send('Application status updated successfully');
    } else {
      res.status(404).json({ error: 'Application not found' });
    }
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).send('Error updating application status');
  }
};
