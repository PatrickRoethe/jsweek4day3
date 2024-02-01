// Log a message to the console
console.log("HEEEEY");

// Get the HTML element with the id "todo-list" and assign it to the variable todoListElement
let todoListElement = document.getElementById("todo-list");

// Function to fetch todos from local storage
function fetchLocalTodos() {
  // Retrieve existing todos from local storage or initialize an empty array
  const localTodos = JSON.parse(localStorage.getItem("todos")) || [];
  return localTodos;
}

// Function to display todos in the HTML
function displayLocalTodos() {
  // Clear the existing content of the todoListElement
  todoListElement.innerHTML = "";

  // Fetch local todos
  const localTodos = fetchLocalTodos();

  // Loop through local todos and create list items
  localTodos.forEach((todo, index) => {
    // Create a new list item element
    let listItem = document.createElement("li");
    // Set the text content of the list item to the title of the current todo
    listItem.textContent = todo.title;

    // Create a delete button for each todo
    let deleteButton = createDeleteButton(index);
    // Append the delete button to the list item
    listItem.appendChild(deleteButton);

    // Append the list item to the todoListElement
    todoListElement.appendChild(listItem);
  });
}

// Function to create a delete button for each todo
function createDeleteButton(index) {
  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = "&#10006;"; // Unicode for the "X" symbol (cross)
  deleteButton.classList.add("delete-button");

  // Add an event listener to the delete button
  deleteButton.addEventListener("click", function () {
    removeTodoFromLocal(index);
  });

  return deleteButton;
}

// Function to remove a todo from local storage
function removeTodoFromLocal(index) {
  // Retrieve existing todos from local storage
  const existingTodos = JSON.parse(localStorage.getItem("todos")) || [];

  // Remove the todo at the specified index
  existingTodos.splice(index, 1);

  // Store the updated todos array back to local storage
  localStorage.setItem("todos", JSON.stringify(existingTodos));

  // Display the updated todos
  displayLocalTodos();
}

// Function to submit a new todo and save to local storage
function submitTodo() {
  // Get the value of the input field with the id "new-todo"
  const newTodoData = {
    title: document.getElementById("new-todo").value,
    completed: false,
  };

  // Retrieve existing todos from local storage or initialize an empty array
  const existingTodos = JSON.parse(localStorage.getItem("todos")) || [];

  // Add the new todo to the existing todos array
  existingTodos.push(newTodoData);

  // Store the updated todos array back to local storage
  localStorage.setItem("todos", JSON.stringify(existingTodos));

  // Display the updated todos
  displayLocalTodos();
}

// Execute code when the DOMContentLoaded event is fired (when the page has finished loading)
document.addEventListener("DOMContentLoaded", function () {
  // Display local todos when the page loads
  displayLocalTodos();
});
