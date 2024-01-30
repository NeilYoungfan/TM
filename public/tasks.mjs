let tasks = [
  { id: 1, title: "Task 1", description: "Description for Task 1" },
  { id: 2, title: "Task 2", description: "Description for Task 2" },
];

export function getAllTasks() {
  return tasks;
}

export function getTaskById(id) {
  return tasks.find((task) => task.id === id);
}

export function createTask(newTask) {
  newTask.id = tasks.length + 1;
  tasks.push(newTask);
  return newTask;
}

export function updateTask(id, updatedTask) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, ...updatedTask } : task
  );
}

export function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
}
