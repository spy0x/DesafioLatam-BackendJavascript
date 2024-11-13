/*
    Crea una estructura de datos para representar proyectos y tareas.
 */
class Task {

    constructor(description, deadline, status) {
        this.id = Math.floor(Math.random() * 1000);
        this.description = description;
        this.status = status;
        this.deadline = deadline;
    }
}

class Project {
    constructor(name) {
        this.id = Math.floor(Math.random() * 1000);
        this.name = name;
        this.tasks = [];
        this.startDate = new Date();
    }

    /*
     Implementa una función que permita añadir nuevas tareas a un proyecto.
     */
    addNewTask(description, deadline, status = "Pending") {
        const task = new Task(description, deadline, status);
        this.tasks.push(task);
    }

    /*
    Desarrolla una función que utilice métodos de array (map, filter, reduce) para
    generar un resumen del proyecto mostrando el número de tareas en cada
    estado.
     */
    showSummary() {
        console.table({
            "ID": this.id,
            "Project": this.name,
            "Start Date": this.startDate.toLocaleString(),
            "Pending Tasks": this.showTasksStatus("Pending"),
            "Completed Tasks": this.showTasksStatus("Completed"),
            "In Progress Tasks": this.showTasksStatus("In Progress"),
        });
    }

    showTasksStatus(status) {
        const tasks = this.tasks.filter(task => task.status === status);
        return tasks.length;
    }

    /*
    Crea una función que ordene las tareas de un proyecto por fecha límite.
     */
    sortTasksByDeadline() {
        this.tasks.sort((a, b) => a.deadline - b.deadline);
        console.table(this.tasks);
    }
}

/*
    PRUEBA DE LOS MÉTODOS
 */
const project = new Project("Project Test");
project.addNewTask("Give christmas presents!", new Date(2024, 11, 25), "Completed");
project.addNewTask("New year PARTY!", new Date(2024, 11, 31));
project.addNewTask("Buy new car", new Date(2024, 10, 4), "In Progress");
project.addNewTask("Buy new house", new Date(2024, 9, 17));
project.showSummary();
project.sortTasksByDeadline();
