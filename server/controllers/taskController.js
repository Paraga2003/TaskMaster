import Task from '../Models/Task.js';

const getTasks = async (req, res) => {
  const { userId } = req.auth(); 
  const tasks = await Task.find({ user: userId });
  res.json(tasks);
};

const createTask = async (req, res) => {
  const { userId } = req.auth();
  const { title, description, status, dueDate } = req.body;
  const task = await Task.create({ user: userId, title, description, status, dueDate });
  res.status(201).json(task);
};

const updateTask = async (req, res) => {
  const { userId } = req.auth(); 
  const task = await Task.findById(req.params.id);
  if (task && task.user.toString() === userId) {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};

const deleteTask = async (req, res) => {
  const { userId } = req.auth(); 
  const task = await Task.findById(req.params.id);
  if (task && task.user.toString() === userId) {
    await task.deleteOne();
    res.json({ message: 'Task removed' });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};

export { getTasks, createTask, updateTask, deleteTask };