const { Task } = require('../models');

exports.createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, userId } = req.body;
    const task = await Task.create({ title, description, status, priority, dueDate, userId });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task' });
  }
};
exports.getTasks = async (req, res) => {
    try {
      const { page = 1, limit = 10, status, priority, dueDate, search } = req.query;
      const offset = (page - 1) * limit;
  
      let whereClause = {};
      if (status) whereClause.status = status;
      if (priority) whereClause.priority = priority;
      if (dueDate) whereClause.dueDate = dueDate;
      if (search) {
        whereClause = {
          ...whereClause,
          [Op.or]: [
            { title: { [Op.iLike]: `%${search}%` } },
            { description: { [Op.iLike]: `%${search}%` } },
          ],
        };
      }
  
      const tasks = await Task.findAndCountAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: parseInt(offset),
      });
  
      res.json({
        totalTasks: tasks.count,
        totalPages: Math.ceil(tasks.count / limit),
        currentPage: parseInt(page),
        tasks: tasks.rows,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving tasks' });
    }
  };
  
  

exports.updateTask = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, status, priority, dueDate } = req.body;
      const [updated] = await Task.update(
        { title, description, status, priority, dueDate },
        { where: { id } }
      );
      if (updated) {
        const updatedTask = await Task.findByPk(id);
        res.json(updatedTask);
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating task' });
    }
  };

  exports.deleteTask = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Task.destroy({ where: { id } });
      if (deleted) {
        res.status(204).send(); // No content to return
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting task' });
    }
  };
  

// Implement updateTask and deleteTask similarly
