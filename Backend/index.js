const express = require('express');
const cors = require('cors');
const sequelize = require('./database');
const Asset = require('./assets');
const Employee = require('./employee');
const Department = require('./department');
const Assignment = require('./assignment');

// Matches 'asset_id' in assignments table
Asset.hasMany(Assignment, { foreignKey: 'asset_id' });
Assignment.belongsTo(Asset, { foreignKey: 'asset_id' });

// Matches 'employee' in assignments table
Employee.hasMany(Assignment, { foreignKey: 'employee' });
Assignment.belongsTo(Employee, { foreignKey: 'employee' });

// Matches 'department' in assignments table
Assignment.belongsTo(Department, { foreignKey: 'department' });

// Matches 'department' in employee table
Department.hasMany(Employee, { foreignKey: 'department' });
Employee.belongsTo(Department, { foreignKey: 'department' });

const app = express();
app.use(cors());
app.use(express.json()); // Essential for POST/PUT requests!

// --- THE BIG 5 METHODS ---

// 1. GET ALL (Now with Joins!)
app.get('/assets', async (req, res) => {
    try {
        const assets = await Asset.findAll({
            include: [{
                model: Assignment,
                include: [
                    { model: Employee, attributes: ['first_name', 'last_name'] },
                    { model: Department, attributes: ['department_name'] }
                ]
            }]
        });
        res.json(assets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

//1.2 GET ALL EMPLOYEES
app.get('/employee', async (req, res) => {
    try {
        const employees = await Employee.findAll({
            include: [{
                    model: Assignment, include: [{ model: Asset }]
                },
                { model: Department, attributes: ['department_name'] }]
        });
        res.json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});
// 2. GET ONE
app.get('/assets/:id', async (req, res) => {
    const asset = await Asset.findByPk(req.params.id);
    res.json(asset);
});

// 3. POST (CREATE)
app.post('/assets', async (req, res) => {
    const newAsset = await Asset.create(req.body);
    res.json(newAsset);
});

// 4. PUT (UPDATE)
app.put('/assets/:id', async (req, res) => {
    await Asset.update(req.body, { where: { aid: req.params.id } });
    res.json({ message: "Asset updated" });
});

// 5. DELETE
app.delete('/assets/:id', async (req, res) => {
    await Asset.destroy({ where: { aid: req.params.id } });
    res.json({ message: "Asset deleted" });
});

sequelize.sync().then(() => {
    app.listen(5000, () => console.log('Server running on port 5000'));
}).catch(error => {
    console.error('Database sync failed:', error);
    process.exit(1);
});
