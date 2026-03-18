const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Asset = sequelize.define('Asset', {
    aid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    serial_number: {
        type: DataTypes.INTEGER,
        unique: true
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Ready'
    }
}, {
    tableName: 'assets',
    timestamps: false
});

module.exports = Asset;