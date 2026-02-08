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
        li.className = "Todo-item";
        li.innerHTML = `
        <span class ="Todo-text">${item.title}</span>
        <div class = "Todo-actions">
        <button class ="edit">edit</button>
        <button class ="delete">delete</button>
        </div>`;

        li.querySelector(".edit").onclick = function(){
            const newTitle = prompt("change task", item.title);
            if(newTitle){
                updateTodo(item.id, newTitle);
            }
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