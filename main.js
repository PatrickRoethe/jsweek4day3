console.log("HEEEEY");

let todoListElement = document.getElementById("todo-list");

function fetchLocalTodos() {
  const localTodos = JSON.parse(localStorage.getItem("todos")) || [];
  return localTodos;
}

function displayLocalTodos() {
  todoListElement.innerHTML = "";

  const localTodos = fetchLocalTodos();

  localTodos.forEach((todo, index) => {
    let listItem = document.createElement("li");
    listItem.innerHTML = `
        <input type="checkbox" id="todo-${index}" ${
      todo.completed ? "checked" : ""
    }>
        <label for="todo-${index}">${todo.title}</label>
    `;
    let deleteButton = createDeleteButton(index);
    listItem.appendChild(deleteButton);
    todoListElement.appendChild(listItem);

    let checkbox = listItem.querySelector(`#todo-${index}`);
    checkbox.addEventListener("change", function () {
      toggleTodoCompletion(index);
    });
  });
}

function createDeleteButton(index) {
  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = "&#10006;";
  deleteButton.classList.add("delete-button");

  deleteButton.addEventListener("click", function () {
    removeTodoFromLocal(index);
  });

  return deleteButton;
}

function removeTodoFromLocal(index) {
  const existingTodos = JSON.parse(localStorage.getItem("todos")) || [];
  existingTodos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(existingTodos));
  displayLocalTodos();
}

function submitTodo() {
  const newTodoInput = document.getElementById("new-todo");
  const newTodoValue = newTodoInput.value.trim();

  if (newTodoValue !== "") {
    const newTodoData = {
      title: newTodoValue,
      completed: false,
    };

    const existingTodos = JSON.parse(localStorage.getItem("todos")) || [];
    existingTodos.push(newTodoData);
    localStorage.setItem("todos", JSON.stringify(existingTodos));
    displayLocalTodos();
    newTodoInput.value = ""; // Clear the input field
  } else {
    alert("Please enter a valid to-do item.");
  }
}

function toggleTodoCompletion(index) {
  const existingTodos = fetchLocalTodos();
  existingTodos[index].completed = !existingTodos[index].completed;
  localStorage.setItem("todos", JSON.stringify(existingTodos));
  displayLocalTodos();
}

document.addEventListener("DOMContentLoaded", function () {
  displayLocalTodos();
});
