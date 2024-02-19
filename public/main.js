import * as apiService from "./apiService";
import * as tasksModule from "./tasks";

const addTaskForm = document.getElementById("addTaskForm");
const taskList = document.getElementById("taskList");

// Function to render tasks in the UI
function renderTasks() {
  const allTasks = tasksModule.getAllTasks();

  // Clear the existing task list
  taskList.innerHTML = "";

  // Render each task
  allTasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.className = "task";
    taskElement.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <button class="delete-btn" data-task-id="${task.id}">Delete</button>
    `;

    // Add event listener for delete button
    const deleteButton = taskElement.querySelector(".delete-btn");
    deleteButton.addEventListener("click", () => handleDeleteTask(task.id));

    taskList.appendChild(taskElement);
  });
}

// Function to handle the form submission and add a new task
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
      renderTasks(); // Refresh the task list after adding a new task
      addTaskForm.reset(); // Clear the form
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

// Set up event listener for form submission
addTaskForm.addEventListener("submit", handleAddTask);

// Initial rendering of tasks when the page loads
renderTasks();
