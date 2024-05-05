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
  todoListElement.innerHTML += `<li onclick="remove(this)">${todo}</li>`;
}

function displayAll(arr){
    todoListElement.innerHTML=""
    for (let val of arr) {
        displayTodo(val);
      }
}

function sort(){
    todoArr.sort()
    save(todoArr)
    displayAll(todoArr)
}
function input() {
  let todo = todoInputElement.value;
  console.log(todo)
  if(todo!=="" && !todoArr.includes(todo)){
  todoArr.push(todo);
  save(todoArr);
  displayTodo(todo);
  }
  todoInputElement.value = "";
}

function remove(elem) {
  let index = [...elem.parentElement.children].indexOf(elem);
  todoArr.splice(index, 1);
  save(todoArr);
  elem.remove();
}

displayAll(todoArr)

