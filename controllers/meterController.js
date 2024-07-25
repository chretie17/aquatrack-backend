const { Meter } = require('../models');

exports.addMeter = async (req, res) => {
  const { meterNumber, ownerName, latitude, longitude } = req.body;

  try {
    const newMeter = await Meter.create({ meterNumber, ownerName, latitude, longitude });
    res.status(201).json(newMeter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateMeter = async (req, res) => {
  const { id } = req.params;
  const { meterNumber, ownerName, latitude, longitude } = req.body;

  try {
    const meter = await Meter.findByPk(id);
    if (!meter) return res.status(404).json({ error: 'Meter not found' });

    meter.meterNumber = meterNumber;
    meter.ownerName = ownerName;
    meter.latitude = latitude;
    meter.longitude = longitude;

    await meter.save();
    res.json(meter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteMeter = async (req, res) => {
  const { id } = req.params;

  try {
    const meter = await Meter.findByPk(id);
    if (!meter) return res.status(404).json({ error: 'Meter not found' });

    await meter.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllMeters = async (req, res) => {
  try {
    const meters = await Meter.findAll();
    res.json(meters);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
