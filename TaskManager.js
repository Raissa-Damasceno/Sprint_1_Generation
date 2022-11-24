function createTaskHTML(name, description, assignedTo, dueDate, status, id) {
    const australianDueDate = new Date(dueDate).toLocaleDateString("en-GB"); // Parsing the ISO formatted date into Australian/Bristish date
    
    const cardhtml = `<div class="col">
  <div class="card" id=${id}>
    <div class="card-header">${name}</div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item"> ${description}</li>
        <li class="list-group-item">Assigned to: ${assignedTo}</li>
        <li class="list-group-item">Due date: ${australianDueDate}</li>
    </ul>
    <div class="card-footer">
    ${status}
    </div>
</div>
</div>`;

    return cardhtml;
}

class TaskManager {
    constructor(id) {
        this._id = id;
        this.taskList = [];
    }

    addTask(taskName, description, assignedTo, dueDate, status) {
        const newTask = {
            id: this._id++,
            taskName: taskName,
            description: description,
            assignedTo: assignedTo,
            dueDate: dueDate,
            status: status,
        };
        this.taskList.push(newTask);
    }

    getAllTasks() {
        return this.taskList;
    }

    getTasksWithStatus(status) {
        let taskWithStatus = [];
        for (let i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].status == status) {
                taskWithStatus.push(this.taskList[i]);
            }
        }
        return taskWithStatus;
    }

    render() {
        let displayCard = "";

        this.taskList.map((task, index) => {
            displayCard += createTaskHTML(
                task.taskName,
                task.description,
                task.assignedTo,
                task.dueDate,
                task.status,
                index
            );
        });

        const cardWrap = document.getElementById("cardWrap");

        return cardWrap.innerHTML = displayCard;
    }
}

/* Test comment.
let tasks = new TaskManager(0);
tasks.addTask("Jimmy", "cooking", "Jimmy", "32", "TO DO");
tasks.addTask("Travis", "cooking", "Travis", "32", "TO DO");
tasks.addTask("Elias", "cooking", "Travis", "32", "In Progress");
*/
// console.log(tasks);
