// console.log("HEEEEY");

// Assume you have an HTML file with an element with the id "todo-list"
let todoListElement = document.getElementById("todo-list");

// Function to fetch todo items from an API
function fetchTodos() {
  return fetch("https://jsonplaceholder.typicode.com/todos").then((response) =>
    response.json()
  );
}

// Function to display todos in the HTML
function displayTodos(todos) {
  // Clear existing todo list
  todoListElement.innerHTML = "";

  // Loop through todos and create list items
  todos.forEach((todo) => {
    let listItem = document.createElement("li");
    listItem.textContent = todo.title;
    todoListElement.appendChild(listItem);
  });
}

// Fetch todos and display them when the page loads
document.addEventListener("DOMContentLoaded", function () {
  fetchTodos()
    .then((todos) => displayTodos(todos))
    .catch((error) => console.error(error));
});
