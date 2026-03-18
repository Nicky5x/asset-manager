const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Assignment = sequelize.define('Assignment', {
    assignmentid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    asset_id: DataTypes.INTEGER,
    employee: DataTypes.INTEGER,
    department: DataTypes.INTEGER
}, {
    tableName: 'assignments',
    timestamps: false
});

module.exports = Assignment;