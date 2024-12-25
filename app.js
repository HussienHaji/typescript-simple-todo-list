"use strict";
const form = document.querySelector(".form");
const input = document.querySelector(".input");
const list = document.querySelector(".list");
let todos = getTodos();
form.addEventListener("submit", createTodo);
list.addEventListener("click", toggleChecked);
// create a new todo abse on user input and sended for render
function createTodo(e) {
    e.preventDefault();
    if (input.value.trim() == "" || input.value === null)
        return;
    //   the new todo
    const newTodo = {
        id: createId(),
        text: input.value,
        completed: false
    };
    // clear the input
    input.value = "";
    todos.push(newTodo);
    //   save todo to local storage
    saveTodo();
    // render the todo
    renderTodo(newTodo);
}
// create a random id
function createId() {
    return Math.floor(Math.random() * 1000000 * new Date().getTime()).toString(32);
}
//   save the new todo to local storage
function saveTodo() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
// render new todo to the user
function renderTodo(todo) {
    const todoEl = `
     <li id="${todo.id}">
          <label> <input type="checkbox"  ${todo.completed ? "checked" : ""} /> ${todo.text}</label>
    </li>
  `;
    list.insertAdjacentHTML("beforeend", todoEl);
}
// get all todos on localstorage
function getTodos() {
    let storedTodos = localStorage.getItem("todos");
    if (typeof storedTodos === "string") {
        return JSON.parse(storedTodos);
    }
    return [];
}
// toggle the todo completed
function toggleChecked(e) {
    var _a;
    const listItemEl = e.target;
    const clickedItem = listItemEl.closest("input[type='checkbox']");
    const clickedItemId = (_a = listItemEl.closest("li")) === null || _a === void 0 ? void 0 : _a.getAttribute("id");
    if (clickedItem) {
        todos = todos.map((todo) => {
            if (todo.id === clickedItemId)
                return Object.assign(Object.assign({}, todo), { completed: !todo.completed });
            return todo;
        });
    }
    saveTodo();
}
// a function to render todos when page loaded
function init() {
    const storedTodos = getTodos();
    storedTodos.forEach((todo) => renderTodo(todo));
}
init();
