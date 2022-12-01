//Global Variables
let taskManager = new TaskManager(0);

taskManager.load();
taskManager.render();

const closeBtn = document.getElementById("closebtn");
const deleteBtn = document.getElementById("deletebtn");
const searchInput = document.getElementById("status");
const getAllbtn = document.getElementById('getAllbtn')

const taskForm = document.getElementById("taskForm");
const formInput = document.getElementsByClassName("form-control");

const taskName = document.getElementById("taskName");
const taskDescription = document.getElementById("taskDescription");
const taskAssignedTo = document.getElementById("taskAssignedTo");
const taskDueDate = document.getElementById("taskDueDate");
const taskStatus = document.getElementById("taskStatus");

const errorDescription = document.getElementById("errorDescription");
const errorAssignedTo = document.getElementById("errorAssignedTo");
const errorName = document.getElementById("errorName");
const errorDate = document.getElementById("errorDate");
const errorStatus = document.getElementById("errorStatus");

let zeroErrors = 0;
const date = new Date();

// Display date

function displayDate() {
  const [month, day, year, hour, minute, second] = [
    date.getMonth() + 1,
    date.getDate(),
    date.getFullYear(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ];

  // let currentDate = date.toLocaleDateString("en-GB"); // display date into Australian/Bristish format.
  // document.getElementById("time").innerText = `${currentDate}`;
  document.getElementById("time").innerText = `${day < 10 ? `0` + day : day}-${
    month < 10 ? `0` + month : month
  }-${year}   ${hour < 10 ? `0` + hour : hour}:${
    minute < 10 ? `0` + minute : minute
  }`;
}

displayDate();

// Form validation
function errorMessage(errorId, message, input) {
  errorId.innerHTML = message;
  errorId.style.display = "block";
  input.style.borderColor = "red";
  zeroErrors++;
}

function successMessage(errorId, input) {
  input.style.borderColor = "#ced4da";
  errorId.style.display = "none";
}

function checkName(input) {
  if (input.value === "" || input.value.length > 8) {
    errorMessage(
      errorName,
      "Name must be filled in and less than 8 characters",
      taskName
    );
  } else {
    successMessage(errorName, taskName);
  }
}

function checkDescription(input) {
  if (input.value === "" || input.value.length > 15) {
    errorMessage(
      errorDescription,
      "Description must be filled in and less than 15 characters",
      taskDescription
    );
  } else {
    successMessage(errorDescription, taskDescription);
  }
}

function checkAssignedTo(input) {
  if (input.value === "" || input.value.length > 8) {
    errorMessage(
      errorAssignedTo,
      "Name must be filled in and less than 8 characters",
      taskAssignedTo
    );
  } else {
    successMessage(errorAssignedTo, taskAssignedTo);
  }
}

function checkDueDate(input) {
  const [month, day, year] = [
    date.getMonth() + 1,
    date.getDate(),
    date.getFullYear(),
  ];

  const checkingDate = `${year}-${month}-${day}`;
  if (input.value === "") {
    errorMessage(errorDate, "Select a valid date", taskDueDate);
  } else if (Date.parse(input.value) < Date.parse(checkingDate)) {
    errorMessage(
      errorDate,
      "The due date cannot be earlier than the current date",
      taskDueDate
    );
  } else {
    successMessage(errorDate, taskDueDate);
  }
}

function checkStatus(input) {
  if (input.value === "") {
    errorMessage(errorStatus, "Select a valid field", taskStatus);
  } else {
    successMessage(errorStatus, taskStatus);
  }
}

// Clear Form
function resetForm() {
  taskName.value = "";
  taskDescription.value = "";
  taskAssignedTo.value = "";
  taskDueDate.value = "";
  taskStatus.value = "";

  successMessage(errorName, taskName);
  successMessage(errorDescription, taskDescription);
  successMessage(errorAssignedTo, taskAssignedTo);
  successMessage(errorDate, taskDueDate);
  successMessage(errorStatus, taskStatus);
}

// Form buttons event Listeners
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  checkName(taskName);
  checkDescription(taskDescription);
  checkAssignedTo(taskAssignedTo);
  checkDueDate(taskDueDate);
  checkStatus(taskStatus);

  // if there's no errors in form, add a task into TaskManager, reset form and render form. Otherwise, form will persist until no more errors.
  if (zeroErrors == 0) {
    taskManager.addTask(
      taskName.value,
      taskDescription.value,
      taskAssignedTo.value,
      taskDueDate.value,
      taskStatus.value
    );
    // resetForm();
    taskManager.save();
    taskManager.render();
  } else {
    return (zeroErrors = 0);
  }
});

closeBtn.addEventListener("click", function (e) {
  e.preventDefault();
  resetForm();
});

let list = taskManager.taskList;

searchInput.addEventListener("change", (e) => {
  e.preventDefault()
  
  const value = e.target.value;

  console.log(taskManager.getTasksWithStatus(value));

  console.log(taskManager.taskList)
  taskManager.render();
});

getAllbtn.addEventListener('click', (e) => {
  window.location.reload()
})

const cardWrap = document.getElementById("cardWrap");

cardWrap.addEventListener("click", function (e) {
  let parentElement =
    e.target.parentElement.parentElement.parentElement.parentElement;
  let taskId = Number(parentElement.id);

  if (e.target.classList.contains("delete-button")) {
    taskManager.deleteById(taskId);
    taskManager.save();
    taskManager.render();
  }

  if (e.target.classList.contains("updateStatus-button")) {
    taskManager.markAsDoneById(taskId);
    taskManager.save();
    taskManager.render();
  }
});
