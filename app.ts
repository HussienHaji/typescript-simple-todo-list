const form = document.querySelector(".form")! as HTMLFormElement;
const input = document.querySelector(".input")! as HTMLInputElement;
const list = document.querySelector(".list")! as HTMLUListElement;

type TodoType = {
  id: string;
  text: string;
  completed: boolean;
};

let todos: TodoType[] = getTodos();

form.addEventListener("submit", createTodo);
list.addEventListener("click", toggleChecked);

// create a new todo abse on user input and sended for render
function createTodo(e: Event) {
  e.preventDefault();

  if (input.value.trim() == "" || input.value === null) return;

  //   the new todo
  const newTodo: TodoType = {
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
function createId(): string {
  return Math.floor(Math.random() * 1000000 * new Date().getTime()).toString(
    32
  );
}

//   save the new todo to local storage
function saveTodo() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// render new todo to the user
function renderTodo(todo: TodoType) {
  const todoEl = `
     <li id="${todo.id}">
          <label> <input type="checkbox"  ${
            todo.completed ? "checked" : ""
          } /> ${todo.text}</label>
    </li>
  `;

  list.insertAdjacentHTML("beforeend", todoEl);
}

// get all todos on localstorage
function getTodos(): TodoType[] {
  let storedTodos = localStorage.getItem("todos");

  if (typeof storedTodos === "string") {
    return JSON.parse(storedTodos) as TodoType[];
  }
  return [];
}

// toggle the todo completed
function toggleChecked(e: MouseEvent) {
  const listItemEl = e.target as HTMLLIElement;
  const clickedItem = listItemEl.closest("input[type='checkbox']");
  const clickedItemId = listItemEl.closest("li")?.getAttribute("id");
  if (clickedItem) {
    todos = todos.map((todo) => {
      if (todo.id === clickedItemId)
        return { ...todo, completed: !todo.completed };
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
