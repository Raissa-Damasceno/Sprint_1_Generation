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

function errorMessage(errorId, message, input) {
  errorId.innerHTML = message;
  errorId.style.display = "block";
  input.style.borderColor = "red";
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

// Come back to the date validation later.
function checkDueDate(input) {
  if (input.value === "") {
    errorMessage(errorDate, "Select a valid date", taskDueDate);
  } else {
    successMessage(errorDate, taskDueDate);
  }
}

function resetForm() {
  taskName.value = "";
  taskDescription.value = "";
  taskAssignedTo.value = "";
  taskDueDate.value = "";

  successMessage(errorName, taskName);
  successMessage(errorDescription, taskDescription);
  successMessage(errorAssignedTo, taskAssignedTo);
  successMessage(errorDate, taskDueDate);
}

//Event Listeners
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  checkName(taskName);
  checkDescription(taskDescription);
  checkAssignedTo(taskAssignedTo);
  checkDueDate(taskDueDate);
  checkStatus(taskStatus);
});

closeBtn.addEventListener("click", function (e) {
  e.preventDefault();
  resetForm();
});

const date = new Date();
const [month, day, year] = [
  date.getMonth(),
  date.getDate(),
  date.getFullYear(),
];

let currentDate = `${day}-${month}-${year}`;
console.log(currentDate); 
document.getElementById("time").innerText = `${currentDate}`;
console.log(date);
