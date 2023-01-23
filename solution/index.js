// Dom Variables
const form = document.querySelector("#add-task");
const taskList = document.querySelector("#task-list");

form.addEventListener("submit", addTask);
taskList.addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON" || e.target.nodeName === "I") {
    deleteTask(e.target);
  } else if (e.target.nodeName === "INPUT") {
    toggleComplete(e.target);
  }
});

// Add a Task
function addTask(e) {
  e.preventDefault();
  // Dom variables
  const taskInput = document.querySelector("#task-input");

  // validation
  if (!taskInput.value.trim()) {
    toast("error", "Please Enter a Task !", 2);
    return;
  }

  const task = document.createElement("div");
  task.className = "card task";

  task.innerHTML = `
    <div>
     <input type="checkbox" class="done-check">
     <p class="task-text"> ${taskInput.value}</p>  
    </div>
    <button class="delete-btn"> 
     <i class="fa-solid fa-trash"></i>
     </button>
    `;
  taskList.prepend(task);
  // clear form
  taskInput.value = "";
  updateCounters();

  toast("success", "Task added successfuly!", 3);
}

// Update status Bar
function updateCounters() {
  const allTasks = document.querySelector("#allTasks");
  const doneTasks = document.querySelector("#doneTasks");

  const taskCount = document.querySelectorAll(".task").length;
  const doneCount = document.querySelectorAll(".done").length;
  allTasks.textContent = taskCount;
  doneTasks.textContent = doneCount;
}

// Delete Task
function deleteTask(el) {
  if (el.className.includes("fa-trash")) el = el.parentElement;
  const task = el.parentElement;
  task.remove();
  updateCounters();
  toast("success", "Task deleted successfully !", 3);
}

function toggleComplete(el) {
  const task = el.parentElement.parentElement;
  task.classList.toggle("done");

  if (task.className.includes("done")) {
    toast("success", "Task completed successfully !", 3);
  }
  updateCounters();
}

function toast(type, message, sec) {
  const notifications = document.querySelector("#notifications");
  let icon;
  switch (type) {
    case "success":
      icon = '<i class="fa-solid fa-circle-check"></i>';
      break;
    case "error":
      icon = ' <i class="fa-sharp fa-solid fa-circle-exclamation"></i>';
      break;
  }

  const notification = document.createElement("div");
  notification.classList.add("toast");
  notification.classList.add(type);
  notification.innerHTML = ` ${icon} <p>${message}<p>`;
  notifications.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, sec * 1000);
}
