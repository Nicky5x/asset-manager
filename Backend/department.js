const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Department = sequelize.define('Department', {
    department_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    department_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'department', 
    timestamps: false
});

module.exports = Department;