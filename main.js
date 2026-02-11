const API_URL="https://jsonplaceholder.typicode.com/todos";

const list = document.getElementById("list");
const inputDiv = document.getElementById("inputDiv");
const addBtn = document.getElementById("addBtn");
const todoInput = document.getElementById("newTask");

let todo = [];

async function getTodos(){
    const response = await fetch(API_URL + "?_limit=5");
    todo = await response.json();
    renderToDo();
}

function renderToDo(){
    list.innerHTML = "";

    todo.forEach(item => {
        const li = document.createElement("li");
        li.className = "Todo-item" + (item.completed ? " completed" : "");
        li.innerHTML = `
        <input type="checkbox" class="todo-checkbox" ${item.completed ? "checked" : ""}>
        <span class="Todo-text">${item.title}</span>
        <div class="Todo-actions">
        <button class="edit">edit</button>
        <button class="delete">delete</button>
        </div>`;

        li.querySelector(".todo-checkbox").onclick = function(){
            item.completed = this.checked;
            renderToDo();
        };

        li.querySelector(".edit").onclick = function(){
            const newTitle = prompt("change task", item.title);
            if(newTitle){
                updateTodo(item.id, newTitle);
            }
        };

        li.querySelector(".delete").onclick = function(){
            deleteTodo(item.id);
        };

        list.appendChild(li);
    }); 
}

function updateTodo(id, newTitle){
    const todoItem = todo.find(t => t.id === id);
    if(todoItem){
        todoItem.title = newTitle;
        renderToDo();
    }
}

function deleteTodo(id){
    todo = todo.filter(t => t.id !== id);
    renderToDo();
}

addBtn.onclick = function(){
    const title = todoInput.value.trim();
    if(title){
        const newItem = { id: Date.now(), title: title, completed: false };
        todo.push(newItem);
        todoInput.value = "";
        renderToDo();
    }
}

getTodos();