const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Employee = sequelize.define('Employee', {
    employee_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING
}, {
    tableName: 'employee',
    timestamps: false
});

module.exports = Employee;