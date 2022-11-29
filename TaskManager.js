function createTaskHTML(id, name, description, assignedTo, dueDate, status) {
    const australianDueDate = new Date(dueDate).toLocaleDateString("en-GB"); // Parsing the ISO formatted date into Australian/Bristish date
    let displayStatus;
    
    if (status === "Done") {
        displayStatus = "none";
    } else {
        displayStatus = "block";
    }

    const cardhtml = `<div class="col">
  <div class="card" id=${id}>
    <div class="card-header">${name}</div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item"> ${description}</li>
        <li class="list-group-item">Assigned to: <span class="fw-bold">${assignedTo}<span></li>
        <li class="list-group-item">Due date: <span class="fw-bold">${australianDueDate}</span></li>
    </ul>
    <div class="card-footer d-grid gap-2 d-flex justify-content-between align-content-between">
    ${status}
        <button type="button" class="btn btn-primary updateStatus-button" id='updateStatus-button_${id}' style="display:${displayStatus};">Mark as Done</button>
    </div>
    <button type="button" class="btn btn-primary delete-button" id='deletebtn'>Delete</button>
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

    deleteById(taskId) {
        const newTask = [];
        for (let i = 0; i < this.taskList.length; i++) {
            const task = this.taskList[i];
            if (task.id !== taskId) {
                newTask.push(task);
            }
        }

        this.taskList = newTask;
    }

    markAsDoneById(taskId) {
        for (let i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].id == taskId) {
                this.taskList[i].status = "Done";
            }
        }
    }

    getTaskById(taskId) {
        let taskByID;

        for (let i = 0; i < this.taskList.length; i++) {
            const task = this.taskList[i];
            console.log(task);
            if (task._id === taskId) {
                taskByID = task;
                console.log(taskByID);
            }
        }
        return taskByID;
    }

    render() {
        let displayCard = "";

        this.taskList.map((task) => {
            displayCard += createTaskHTML(
                task.id,
                task.taskName,
                task.description,
                task.assignedTo,
                task.dueDate,
                task.status
            );
        });

        const cardWrap = document.getElementById("cardWrap");
        return (cardWrap.innerHTML = displayCard);
    }

    save() {
        const tasksJson = JSON.stringify(this.taskList);
        localStorage.setItem("tasks", tasksJson);

        const currentId = String(this._id);
        localStorage.setItem("currentId", currentId);
    }

    load() {
        if (localStorage.getItem("tasks")) {
            const tasksJson = localStorage.getItem("tasks");
            this.taskList = JSON.parse(tasksJson);
        }
        if (localStorage.getItem("currentId")) {
            const currentId = localStorage.getItem("currentId");
            this._id = Number(currentId);
        }
    }
}
