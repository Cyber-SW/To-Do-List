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
        if(EditTodoId >= 0) {
            tasks = tasks.map((todo, index) => ({
                ...todo,
                title : index === EditTodoId ? titleValue : todo.value,
                text : index === EditTodoId ? textareaValue : todo.value,
            }));

            EditTodoId = -1;
        }

        else {
            const todo = {
                title : titleValue,
                text : textareaValue,
                checked : false,
            }

            tasks.push(todo);
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
                
                <button id="edit-task" type="submit">
                    <svg data-action="edit" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
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
    // action === "delete" && deleteTodo(todoId);
})

// CHECK a TODO
function checkTodo(todoId) {
    tasks = tasks.map((todo, index) => ({
            ...todo,
            checked : index === todoId ? !todo.checked : todo.checked
    }));

    renderTask();
}

// EDIT A TODO
function editTodo(todoId) {
    titleInput.value = tasks[todoId].title.value;
    textareaInput.value = tasks[todoId].text.value;
    EditTodoId = todoId;
}