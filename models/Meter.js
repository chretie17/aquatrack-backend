module.exports = (sequelize, DataTypes) => {
    const Meter = sequelize.define('Meter', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      meterNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      ownerName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false
      }
    });
  
    return Meter;
  };
  