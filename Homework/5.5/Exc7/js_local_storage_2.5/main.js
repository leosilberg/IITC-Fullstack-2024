console.clear();
let todoArr = read();
let todoListElement = document.querySelector("#todo-list");
let todoInputElement = document.querySelector("#todo-input");

function save(arr) {
  let json = JSON.stringify(arr);
  localStorage.setItem("todo_items", json);
}

function read() {
  let json = localStorage.getItem("todo_items");
  return json != null ? JSON.parse(json) : [];
}

function displayTodo(todo) {
  let style = todo.completed ? "color:green;" : "";
  todoListElement.innerHTML += `<li onclick="complete(this)" style=${style}>${todo.name}</li>`;
}

function displayAll() {
  todoListElement.innerHTML = "";
  for (let val of todoArr) {
    displayTodo(val);
  }
}

function input() {
  let todo = todoInputElement.value;
  if (todo !== "" && !todoArr.includes(todo)) {
    todoArr.push({ name: todo, completed: false });
  }
  todoInputElement.value = "";
}

function saveAll() {
  save(todoArr);
}
function clearData() {
  localStorage.clear();
  todoArr = [];
}
function complete(elem) {
  let index = [...elem.parentElement.children].indexOf(elem);
  todoArr[index].completed=!todoArr[index].completed
  save(todoArr);
  displayAll()
}
