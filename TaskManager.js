console.log('class file');

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
            status: status
        }
        this.taskList.push(newTask);
    }

    getAllTasks() {
        return this.taskList;
    }

    getTasksWithStatus(status) {
        let taskWithStatus = []
        for(let i=0; i < this.taskList.length; i++) {
            if (this.taskList[i].status == status) {
                taskWithStatus.push(this.taskList[i]);
            }
        }
        return taskWithStatus;
    }
}

/*
let taskManager = new TaskManager(0);
taskTest.addTask("Jimmy", "cooking", "Jimmy", "32", "TO DO");
taskTest.addTask("Travis", "cooking", "Travis", "32", "TO DO");
taskTest.addTask("Elias", "cooking", "Travis", "32", "In Progress");
//console.log(taskTest);

//console.log(taskTest.getTasksWithStatus("In Progress"));
*/


/* ID -> Int
Name -> String
Description -> String
AssignedTo (person responsible for completing the task) -> String
DueDate -> Date when the task is due
Status*/