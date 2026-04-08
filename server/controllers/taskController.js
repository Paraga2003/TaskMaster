
import Task from '../Models/Task.js';

const getTasks   = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
};
const createTask = async (req, res) => {
  const { title, description, status, dueDate } = req.body;
  const task = await Task.create({ user: req.user._id, title, description, status, dueDate });
  res.status(201).json(task);
};
const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task && task.user.toString() === req.user._id.toString()) {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } else res.status(404).json({ message: 'Task not found' });
};
const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task && task.user.toString() === req.user._id.toString()) {
    await task.deleteOne();
    res.json({ message: 'Task removed' });
  } else res.status(404).json({ message: 'Task not found' });
};

export { getTasks, createTask, updateTask, deleteTask };
