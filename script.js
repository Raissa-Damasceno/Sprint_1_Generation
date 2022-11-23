console.log("test");

const taskForm = document.getElementById("taskForm");
const taskName = document.getElementById("taskName");
const taskDescription = document.getElementById("taskDescription");
const taskAssignedTo = document.getElementById("taskAssignedTo");
const taskDueDate = document.getElementById("taskDueDate");
const taskStatus = document.getElementById("taskStatus");

function checkName(input) {
  if (input.value === "" || input.value.length > 8) {
    alert("Name must be filled in and less than 8 characters!");
  }
  console.log(input.value);
}

function checkDescription(input) {
  if (input.value === "" || input.value.length > 15) {
    alert("Description must be filled in and less than 15 characters!");
  }
  console.log(input.value);
}

function checkAssignedTo(input) {
  if (input.value === "" || input.value.length > 8) {
    alert("Name must be filled in and less than 8 characters!");
  }
  console.log(input.value);
}

// Come back to the date validation later.
function checkDueDate(input) {
  if (input.value === "" || input.value.length > 8) {
    alert("date");
  }
  console.log(input.value);
}

function checkStatus(input) {
  console.log(input.value);
}

//Event Listeners
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  checkName(taskName);
  checkDescription(taskDescription);
  checkAssignedTo(taskAssignedTo);
  //checkDueDate(taskDueDate);
  checkStatus(taskStatus);
});

const date = new Date();
const [month, day, year] = [
  date.getMonth(),
  date.getDate(),
  date.getFullYear(),
];

// This arrangement can be altered based on how we want the date's format to appear.
let currentDate = `${day}-${month}-${year}`;
console.log(currentDate); // "17-6-2022"
document.getElementById("time").innerText = `${currentDate}`;
console.log(date);
