module.exports = (sequelize, DataTypes) => {
    const Claim = sequelize.define('Claim', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      issueDetails: {
        type: DataTypes.STRING,
        allowNull: false
      },
      documents: {
        type: DataTypes.STRING,
        allowNull: true
      },
      response: {
        type: DataTypes.STRING,
        allowNull: true
      }
    });
  
    return Claim;
  };
  