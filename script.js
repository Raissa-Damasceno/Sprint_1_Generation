//Global Variables
let taskManager = new TaskManager(0);

const closeBtn = document.getElementById("closebtn");

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

//Validation
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
      "Name must be filled in and less than 8 characters!",
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
      "Description must be filled in and less than 15 characters!",
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
      "Name must be filled in and less than 8 characters!",
      taskAssignedTo
    );
  } else {
    successMessage(errorAssignedTo, taskAssignedTo);
  }
}

function checkDueDate(input) {
  if (input.value === "") {
    errorMessage(errorDate, "Select a valid date", taskDueDate);
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

//Clear Form
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

//Event Listeners
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  checkName(taskName);
  checkDescription(taskDescription);
  checkAssignedTo(taskAssignedTo);
  checkDueDate(taskDueDate);
  checkStatus(taskStatus);

  if (zeroErrors == 0) {
    taskManager.addTask(
      taskName.value,
      taskDescription.value,
      taskAssignedTo.value,
      taskDueDate.value,
      taskStatus.value
    );
    resetForm();
    taskManager.render();
    console.log(taskManager);
  } else {
    return (zeroErrors = 0);
  }
});

closeBtn.addEventListener("click", function (e) {
  e.preventDefault();
  resetForm();
});

//Display Date
const date = new Date();
const [month, day, year] = [
  date.getMonth(),
  date.getDate(),
  date.getFullYear(),
];

let currentDate = `${day}-${month}-${year}`;
// console.log(currentDate);
document.getElementById("time").innerText = `${currentDate}`;

//Display Card
