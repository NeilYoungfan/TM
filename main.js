// main.js

import * as apiService from "./apiService";
import * as tasks from "./tasks";

// Example usage
apiService
  .fetchAllTasks()
  .then((apiTasks) => {
    console.log("All tasks from API:", apiTasks);
    // Do something with the tasks from the API on the frontend
  })
  .catch((error) => console.error("Error fetching tasks from API:", error));

// Example usage of tasks.js functions
const allTasksLocal = tasks.getAllTasks();
console.log("All tasks from local data:", allTasksLocal);

// Similar usage for other API functions and tasks.js functions
