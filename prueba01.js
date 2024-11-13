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

    /*
    Implementa una función calcularTiempoRestante que utilice el método
    reduce para calcular el número total de días que faltan para completar todas
    las tareas pendientes de un proyecto.
     */
    calculateRemainingTime() {
        const currentDate = new Date();
        const pendingTasks = this.tasks.filter(task => task.status === "Pending");
        const remainingDays = pendingTasks.reduce((totalDays, task) => {
            const days = Math.ceil((task.deadline - currentDate) / (1000 * 60 * 60 * 24));
            return totalDays + days;
        }, 0);
        console.log(`Remaining days: ${remainingDays}`);
    }
    /*
    Desarrolla una función obtenerTareasCriticas que identifique y retorne las
    tareas que están a menos de 3 días de su fecha límite y aún no están
    completadas.
     */
    getCriticalTasks() {
        const currentDate = new Date();
        const criticalTasks = this.tasks.filter(task => {
            const days = Math.ceil((task.deadline - currentDate) / (1000 * 60 * 60 * 24));
            return days <= 3 && days >= 0 && task.status !== "Completed";
        });
        console.table(criticalTasks);
    }
    /*
    Crea una función de orden superior filtrarTareasProyecto que tome una
    función de filtrado como argumento y la aplique a la lista de tareas de un
    proyecto.
     */
    showFilteredTasks(filterFunction, query) {
        console.table(filterFunction(this.tasks, query));
    }
}

function filterTasksByStatus(tasks, status) {
    return tasks.filter(task => task.status === status);
}

function filterTasksBySearch(tasks, search) {
    return tasks.filter(task => task.description.toLowerCase().includes(search.toLowerCase()));
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

project.showFilteredTasks(filterTasksByStatus, "Completed");
project.showFilteredTasks(filterTasksByStatus, "In Progress");
project.showFilteredTasks(filterTasksBySearch, "buy");
project.showFilteredTasks(filterTasksBySearch, "Christmas");

project.calculateRemainingTime();

const currentDate = new Date();
const oneDay = new Date();
const twoDays = new Date();
const threeDays = new Date();
oneDay.setDate(currentDate.getDate());
twoDays.setDate(currentDate.getDate() + 1);
threeDays.setDate(currentDate.getDate() + 2);
project.addNewTask("Critical Task Test 01", oneDay);
project.addNewTask("Critical Task Test 02", threeDays);
project.addNewTask("Critical Task Test 03", twoDays);
project.getCriticalTasks();