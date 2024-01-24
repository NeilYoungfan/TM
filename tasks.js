let tasks = [
  { id: 1, title: "Task 1", description: "Description for Task 1" },
  { id: 2, title: "Task 2", description: "Description for Task 2" },
];

function getAllTasks() {
  return tasks;
}

function getTaskById(id) {
  return tasks.find((task) => task.id === id);
}

function createTask(newTask) {
  newTask.id = tasks.length + 1;
  tasks.push(newTask);
  return newTask;
}

function updateTask(id, updatedTask) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, ...updatedTask } : task
  );
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
