// models/index.js
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./User')(sequelize, Sequelize.DataTypes);
const Meter = require('./Meter')(sequelize, Sequelize.DataTypes);
const MutationApplication = require('./MutationApplication')(sequelize, Sequelize.DataTypes);
const Claim = require('./Claim')(sequelize, Sequelize.DataTypes);
const Customer = require('./Customer')(sequelize, Sequelize.DataTypes);

const models = {
  User,
  Meter,
  MutationApplication,
  Claim,
  Customer,
};

// Define relationships
// Assuming you have models like Application, Claim, User, etc.
models.MutationApplication.belongsTo(models.User, { foreignKey: 'userId' });
models.MutationApplication.belongsTo(models.Meter, { foreignKey: 'meterId' });
models.Claim.belongsTo(models.MutationApplication, { foreignKey: 'applicationId' });

module.exports = {
  ...models,
  sequelize,
  Sequelize,
};
