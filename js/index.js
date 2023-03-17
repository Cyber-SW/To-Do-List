// SELECT ELEMENT
const form = document.getElementById("todoform");
const titleInput = document.getElementById("input-title");
const textareaInput = document.getElementById("textarea");
const button = document.getElementById("submit-task-btn");
const tasksListElem = document.getElementById("section-body");

// ARRAY WHERE TO-DO´S GET SAVED AS OBJECTS
let tasks = [];
let EditTodoId = -1;

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
const isDuplicate = tasks.some((todo) => todo.title.toUpperCase() === titleValue.toUpperCase() && todo.text.toUpperCase() === textareaValue.toUpperCase());
// const isDuplicate = tasks.forEach((task) => {
//     if (task.title === titleValue && task.text === textareaValue) {
//         alert("This task already exists!");
//         titleInput.value = "";
//         textareaInput.value = "";
//         return error;
//     }
// })

    if (isEmpty) {
        alert("Please enter a task :)");
    }
    else if(isDuplicate) {
        alert("Task already exists!");
    }
    else {
        if(EditTodoId >= 0) {
            tasks = tasks.map((todo, index) => ({
                ...todo,
                title : index === EditTodoId ? titleValue : todo.value,
                text : index === EditTodoId ? textareaValue : todo.value,
            }));

            EditTodoId = -1;
        }

        else {
            tasks.push({
                title : titleValue,
                text : textareaValue,
                checked : false,
            });
        }

        titleInput.value = "";
        textareaInput.value = "";
    }
}

// RENDER TASKS
let displayTasks = [];

function renderTask() {
// CLEAR ELEMENT BEFORE A RE-RENDER
    tasksListElem.innerHTML = "";

// RENDER TASKS
    tasks.forEach((task, index) => {
        tasksListElem.innerHTML += `
            <div class="to-do" id=${index}>
                <div class="to-do-alignment">
                    <h4 class="to-do-title">Deadline: ${task.title}</h4>
                    <button class="${task.checked ? "checked-square" : "empty-square"}" type="submit" data-action="check">   
                    </button>
                    <button id="delete-task" type="submit" data-action="delete">
                    </button>
                </div>

                <p class="to-do-text">${task.text}</p>
                
                <button id="edit-task" type="submit" data-action="edit">
                </button>
            </div>`
    })
}



// CLICK EVENTLISTENER FOR ALL TASKS
tasksListElem.addEventListener("click", (event) => {
    const target = event.target;
    const parentElem = target.parentNode.parentNode;

    if(parentElem.className !== "to-do") {
        return;
    }

    // TODO ID
    const todo = parentElem;
    const todoId = Number(todo.id);

    // TARGET ACTION
    const action = target.dataset.action

    action === "check" && checkTodo(todoId);
    action === "edit" && editTodo(todoId);
    action === "delete" && deleteTodo(todoId);
})

// CHECK TODO
function checkTodo(todoId) {
    tasks = tasks.map((todo, index) => ({
            ...todo,
            checked : index === todoId ? !todo.checked : todo.checked,
    }));

    renderTask();
}

// EDIT TODO
function editTodo(todoId) {
    titleInput.value = tasks[todoId].title;
    textareaInput.value = tasks[todoId].text;
    EditTodoId = todoId;
}

// DELETE TODO
function deleteTodo(todoId) {
    tasks = tasks.filter((todo, index) => index !== todoId);
    EditTodoId = -1;

    // RE-RENDER
    renderTask();
}