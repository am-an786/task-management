const express = require('express');
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(5000, async () => {
  console.log('Server is running on port 5000');
  await sequelize.sync({ alter: true });
});
