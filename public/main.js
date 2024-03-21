import * as apiService from "./apiService";
import * as tasksModule from "./tasks";

const addTaskForm = document.getElementById("addTaskForm");
const taskList = document.getElementById("taskList");

function renderTasks() {
  const allTasks = tasksModule.getAllTasks();

  taskList.innerHTML = "";

  allTasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.className = "task";
    taskElement.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <button class="delete-btn" data-task-id="${task.id}">Delete</button>
    `;

    const deleteButton = taskElement.querySelector(".delete-btn");
    deleteButton.addEventListener("click", () => handleDeleteTask(task.id));

    taskList.appendChild(taskElement);
  });
}

function handleAddTask(event) {
  event.preventDefault();

  const title = addTaskForm.querySelector("#title").value;
  const description = addTaskForm.querySelector("#description").value;

  const newTask = {
    title,
    description,
  };

  apiService
    .createTask(newTask)
    .then(() => {
      renderTasks();
      addTaskForm.reset();
    })
    .catch((error) => console.error("Error adding task:", error));
}

// Function to handle the delete button click and delete a task
function handleDeleteTask(taskId) {
  apiService
    .deleteTask(taskId)
    .then(() => renderTasks()) // Refresh the task list after deleting a task
    .catch((error) => console.error("Error deleting task:", error));
}

addTaskForm.addEventListener("submit", handleAddTask);

renderTasks();
