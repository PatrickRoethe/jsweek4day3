// Log a message to the console
console.log("HEEEEY");

// Get the HTML element with the id "todo-list" and assign it to the variable todoListElement
let todoListElement = document.getElementById("todo-list");

// Function to fetch todos from the JSONPlaceholder API
function fetchTodos() {
  // Use the fetch API to make a GET request to the JSONPlaceholder API
  // The URL "https://jsonplaceholder.typicode.com/todos" fetches todos
  // The response is a Promise, and .json() is used to parse the JSON data
  // The function returns a Promise that resolves to the parsed JSON data
  return fetch("https://jsonplaceholder.typicode.com/todos").then((response) =>
    response.json()
  );
}

// Function to display a limited number of todos in the HTML
function displayTodos(todos, limit) {
  // Clear the existing content of the todoListElement
  todoListElement.innerHTML = "";

  // Loop through todos up to the specified limit and create list items
  for (let i = 0; i < limit && i < todos.length; i++) {
    // Create a new list item element
    let listItem = document.createElement("li");
    // Set the text content of the list item to the title of the current todo
    listItem.textContent = todos[i].title;
    // Append the list item to the todoListElement
    todoListElement.appendChild(listItem);
  }
}

// Function to submit a new todo (POST request)
function submitTodo() {
  // Get the value of the input field with the id "new-todo"
  const newTodoData = {
    title: document.getElementById("new-todo").value,
    completed: false,
  };

  // Use the fetch API to make a POST request to the JSONPlaceholder API
  // The URL "https://jsonplaceholder.typicode.com/todos" is used for posting todos
  // The method is set to "POST," and headers specify that the content is in JSON format
  // The body of the request is the newTodoData object, converted to JSON
  fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodoData),
  })
    // The response is a Promise, and .json() is used to parse the JSON data
    .then((response) => response.json())
    // After successfully posting the new todo, fetch the updated todos and display them
    .then((newTodo) => {
      console.log("New To-Do:", newTodo);

      // Save the new todo to local storage
      saveTodoToLocal(newTodo);

      // Assuming you want to refresh the list with the new todo, call fetchTodos and displayTodos
      fetchAndDisplayTodos();
    })
    // Handle any errors that occur during the process
    .catch((error) => console.error(error));
}

// Function to save a todo to local storage
function saveTodoToLocal(todo) {
  // Retrieve existing todos from local storage or initialize an empty array
  const existingTodos = JSON.parse(localStorage.getItem("todos")) || [];

  // Add the new todo to the existing todos array
  existingTodos.push(todo);

  // Store the updated todos array back to local storage
  localStorage.setItem("todos", JSON.stringify(existingTodos));
}

// Function to fetch and display todos
function fetchAndDisplayTodos() {
  // Set the desired limit for displaying todos
  const displayLimit = 5;

  // Call the fetchTodos function to get todos from the API
  // The .then() method is used to handle the asynchronous response from fetchTodos
  // The response (todos) is passed to the displayTodos function along with the displayLimit
  // The .catch() method is used to handle errors and log them to the console
  fetchTodos()
    .then((todos) => displayTodos(todos, displayLimit))
    .catch((error) => console.error(error));
}

// Execute code when the DOMContentLoaded event is fired (when the page has finished loading)
document.addEventListener("DOMContentLoaded", function () {
  // Set the desired limit for displaying todos
  const displayLimit = 5;

  // Call the fetchTodos function to get todos from the API
  // The .then() method is used to handle the asynchronous response from fetchTodos
  // The response (todos) is passed to the displayTodos function along with the displayLimit
  // The .catch() method is used to handle errors and log them to the console
  fetchAndDisplayTodos();
});
