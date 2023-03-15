// SELECT ELEMENT
const form = document.getElementById("todoform");
const titleInput = document.getElementById("input-title");
const textareaInput = document.getElementById("textarea");
const button = document.getElementById("submit-task-btn");
const tasksListElem = document.getElementById("section-body");

// ARRAY WHERE TO-DO´S GET SAVED AS OBJECTS
let tasks = [];

// FORM SUBMIT
form.addEventListener("submit", function(event) {
    event.preventDefault();

    saveTask();
    renderTask();
});

// SAVE TODO
function saveTask() {
    const titleValue = titleInput.value;
    const textareaValue = textareaInput.value;

// CHECK IF TO-DO IS EMPTY
const isEmpty = titleValue ==="" && textareaValue === "";

// CHECK FOR DUPLICATE
const isDuplicate = tasks.forEach((task) => {
    if (task.title === titleValue && task.text === textareaValue) {
        alert("This task already exists!");
        titleInput.value = "";
        textareaInput.value = "";
        return error;
    }
})

    if (isEmpty) {
        alert("Please enter a task :)");
    }
    
    else {
        const todo = {
            title : titleValue,
            text : textareaValue,
            checked : false,
        }
    
        tasks.push(todo);
        titleInput.value = "";
        textareaInput.value = "";
    
        console.log(tasks);
    }
}

// RENDER TASKS
let displayTasks = [];

function renderTask() {
// CLEAR ELEMENT BEFORE A RE-RENDER
    //tasksListElem.innerHTML = "";

// RENDER TASKS
    tasks.forEach((task, index) => {
        tasksListElem.innerHTML += `
        <div class="to-do" id=${index}>
            <i class="circle"></i>
            <i class="${task.checked ? "bi bi-check2-square" : "bi bi-square"}"></i>
            <h4 class="">${task.title}</h4>
            <p class="">${task.text}</p>
            <i class="bi bi-pencil-square"></i>
            <i class="<i class="bi bi-trash3"></i>
        </div>`
    })
}
    