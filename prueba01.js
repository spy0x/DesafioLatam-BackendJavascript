/*
    Crea una estructura de datos para representar proyectos y tareas.
 */
class Task {
    constructor(description, deadline, status) {
        this.id = Math.floor(Math.random() * 1000);
        this.description = description;
        this.status = status;
        this.deadline = deadline;
        this.listeners = [];
    }

    /*
    Crea una función actualizarEstadoTarea que simule la actualización del
    estado de una tarea en el servidor y maneje tanto el caso de éxito como el de
    error
    */
    async updateTaskStatus(newStatus) {
        console.log(`Updating task status...`);
        try {
            const updatedTask = await fetchTaskStatus(this, newStatus);
            console.log(`Task status updated to: ${updatedTask.status}`);
            console.table({
                "Task ID": updatedTask.id,
                "Description": updatedTask.description,
                "Status": updatedTask.status,
                "Deadline": updatedTask.deadline.toLocaleString()
            });
            if (updatedTask.status === "Completed") {
                this.listeners.forEach(listener => listener.onTaskCompleted());
            }
        } catch (error) {
            console.error(error);
            console.log(`Task status not updated!`);
        }
    }
}

function fetchTaskStatus(task, newStatus) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            task.status = newStatus;
            resolve(task);
        }, 2000);
    });
}

/*
    Implementa un sistema simple de noticacionesTareas que permita a
    diferentes partes del código "escuchar" cuando se completa una tarea.
 */
class TaskListener {
    constructor(task) {
        this.task = task;
        task.listeners.push(this);
    }

    onTaskCompleted() {
        console.log(`Task ${this.task.id}: ${this.task.description} has been completed!`);
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
        return task;
    }

    /*
    Desarrolla una función que utilice métodos de array (map, filter, reduce) para
    generar un resumen del proyecto mostrando el número de tareas en cada
    estado.
     */
    showSummary() {
        return {
            "ID": this.id,
            "Project": this.name,
            "Start Date": this.startDate.toLocaleString(),
            "Pending Tasks": this.showTasksStatus("Pending"),
            "Completed Tasks": this.showTasksStatus("Completed"),
            "In Progress Tasks": this.showTasksStatus("In Progress"),
        };
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
        return this.tasks;
    }

    /*
    Implementa una función calcularTiempoRestante que utilice la funcion
    reduce para calcular el número total de días que faltan para completar todas
    las tareas pendientes de un proyecto.
     */
    calculateRemainingTime() {
        const currentDate = new Date();
        const pendingTasks = this.tasks.filter(task => task.status === "Pending");
        return pendingTasks.reduce((totalDays, task) => {
            const days = Math.ceil((task.deadline - currentDate) / (1000 * 60 * 60 * 24));
            return totalDays + days;
        }, 0);
    }

    /*
    Desarrolla una función obtenerTareasCriticas que identifique y retorne las
    tareas que están a menos de 3 días de su fecha límite y aún no están
    completadas.
     */
    getCriticalTasks() {
        const currentDate = new Date();
        return this.tasks.filter(task => {
            const days = Math.ceil((task.deadline - currentDate) / (1000 * 60 * 60 * 24));
            return days < 3 && days >= 0 && task.status !== "Completed";
        });
    }

    /*
    Crea una función de orden superior filtrarTareasProyecto que tome una
    función de filtrado como argumento y la aplique a la lista de tareas de un
    proyecto.
     */
    showFilteredTasks(filterFunction, query) {
        return filterFunction(this.tasks, query)
    }
}

function filterTasksByStatus(tasks, status) {
    return tasks.filter(task => task.status === status);
}

function filterTasksBySearch(tasks, search) {
    return tasks.filter(task => task.description.toLowerCase().includes(search.toLowerCase()));
}

/*
    Desarrolla una función cargarDetallesProyecto que simule una llamada
    asíncrona a una API para cargar los detalles de un proyecto.
    Utiliza Promises o async/await.
*/
async function loadProjectDetails(project) {
    console.log("Loading project details...");
    try {
        const showLoadedProject = await fetchProject(project);
        console.log("Project details loaded!");
        return showLoadedProject();
    } catch (error) {
        console.error(error);
    }
}

function fetchProject(project) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const projectFunc = () => project.showSummary();
            resolve(projectFunc);
        }, 2000);
    });
}

/*
    PRUEBA DE LOS MÉTODOS
 */

// CREAR PROYECTO Y AÑADIR TAREAS
const project = new Project("Project Test");
project.addNewTask("Give christmas presents!", new Date(2024, 11, 25), "Completed");
project.addNewTask("New year PARTY!", new Date(2024, 11, 31), "Pending");
project.addNewTask("Buy new car", new Date(2024, 10, 4), "In Progress");
project.addNewTask("Buy new house", new Date(2024, 9, 17), "Pending");

// MOSTRAR RESUMEN DEL PROYECTO
console.log(`
Mostrar resumen del proyecto. Debería mostrar 1 tarea completada, 1 en progreso y 2 pendientes.
`);
console.table(project.showSummary());

// ORDENAR TAREAS POR FECHA LÍMITE
console.log(`
Ordenar las tareas por fecha límite. Debería mostrar 'Buy new house' primero y 'New year PARTY!' al final.
`);
console.table(project.sortTasksByDeadline());

// FILTRAR TAREAS POR ESTADO Y BÚSQUEDA PALABRAS CLAVE
console.log(`
Filtrar tareas por estado Completed. Debería mostrar 'Give christmas presents!'.
`);
console.table(project.showFilteredTasks(filterTasksByStatus, "Completed"));
console.log(`
Filtrar tareas por estado In Progress. Debería mostrar 'Buy new car'.
`)
console.table(project.showFilteredTasks(filterTasksByStatus, "In Progress"));
console.log(`
Filtrar tareas por búsqueda de palabra clave 'buy'. Debería mostrar Tareas 'Buy new car' y 'Buy new house'.
`);
console.table(project.showFilteredTasks(filterTasksBySearch, "buy"));
console.log(`
Filtrar tareas por búsqueda de palabra clave 'Christmas'. Debería mostrar Tareas 'Give christmas presents!'.
`);
console.table(project.showFilteredTasks(filterTasksBySearch, "Christmas"));


// CALCULAR TOTAL DE DIAS RESTANTE PARA COMPLETAR TODAS LAS TAREAS PENDIENTES.
console.log(`
Calcular el total de días restantes para completar todas las tareas pendientes.
`);
console.log(project.calculateRemainingTime());

// CREAR ALGUNAS TAREAS CRITICAS (A MENOS DE 3 DIAS DE SU FECHA LIMITE)
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

// OBTENER LAS TAREAS CRITICAS.
console.log(`
Mostrar las tareas criticas (a menos de 3 días de su fecha límite y no completadas). Debería mostrar las tres Critical Task Test.
`);
console.table(project.getCriticalTasks());

// SIMULA CARGA DE DETALLES DEL PROYECTO. A LOS 2 SEGUNDOS DEBERÍA MOSTRAR EL RESUMEN DEL PROYECTO.
loadProjectDetails(project)
    .then((result) => {
        console.table(result);

        // CREA UNA TAREA CON ESTADO PENDING Y AÑADE TRES LISTENERS A ELLA.
        const taskToBeUpdated = project.addNewTask("Sell my TV", new Date(2025, 1, 15), "Pending");
        const listener1 = new TaskListener(taskToBeUpdated);
        const listener2 = new TaskListener(taskToBeUpdated);
        const listener3 = new TaskListener(taskToBeUpdated);

        /* 
        SIMULA LA ACTUALIZACIÓN DE ESTADO DE LA TAREA ANTERIOR. A LOS 2 SEGUNDOS DEBERIA ACTUALIZAR A COMPLETED.
        AL CAMBIAR EL ESTADO DE LA TAREA A COMPLETADA, LOS TRES LISTENERS DEBERÍAN MOSTRAR UN MENSAJE EN LA CONSOLA.
        */
        taskToBeUpdated.updateTaskStatus("Completed");
    });


