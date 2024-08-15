module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.ENUM('Todo', 'In Progress', 'Done'),
        defaultValue: 'Todo',
      },
      priority: {
        type: DataTypes.ENUM('Low', 'Medium', 'High'),
        defaultValue: 'Medium',
      },
      dueDate: {
        type: DataTypes.DATE,
      },
    });
  
    return Task;
  };
  