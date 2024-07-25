module.exports = (sequelize, DataTypes) => {
  const MutationApplication = sequelize.define('MutationApplication', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    identityProof: {
      type: DataTypes.BLOB('long'),
      allowNull: false,
    },
    newPropertyProof: {
      type: DataTypes.BLOB('long'),
      allowNull: false,
    },
    oldPropertyProof: {
      type: DataTypes.BLOB('long'),
      allowNull: false,
    },
    applicationLetter: {
      type: DataTypes.BLOB('long'),
      allowNull: false,
    },
    utilityBillProof: {
      type: DataTypes.BLOB('long'),
      allowNull: false,
    },
  });

  return MutationApplication;
};
