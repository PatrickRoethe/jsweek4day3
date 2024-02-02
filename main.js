// main.js

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
    listItem.id = `todo-${index}`;
    listItem.classList.add("todo-item");

    // Create checkbox, label, and "Edit" button for each todo
    listItem.innerHTML = `
            <input type="checkbox" id="todo-checkbox-${index}" ${
      todo.completed ? "checked" : ""
    }>
            <label for="todo-checkbox-${index}" class="todo-label">${
      todo.title
    }</label>
            <button class="edit-button" onclick="editTodo(${index})">Edit</button>
        `;

    // Create a delete button for each todo
    let deleteButton = createDeleteButton(index);
    // Append the delete button to the list item
    listItem.appendChild(deleteButton);

    // Append the list item to the todoListElement
    todoListElement.appendChild(listItem);

    // Add event listener for checkbox
    let checkbox = listItem.querySelector(`#todo-checkbox-${index}`);
    checkbox.addEventListener("change", function () {
      toggleTodoCompletion(index);
    });
  });
}

// Function to create a delete button for each todo
function createDeleteButton(index) {
  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = "&#10006;"; // Unicode for the "X" symbol (cross)
  deleteButton.classList.add("delete-button");

  // Add an event listener to the delete button
  deleteButton.addEventListener("click", function () {
    confirmDelete(index);
  });

  return deleteButton;
}

// Function to handle confirmation before deletion
function confirmDelete(index) {
  // Show a confirmation dialog
  const confirmation = confirm("Are you sure you want to delete this to-do?");

  // If the user confirms, proceed with deletion
  if (confirmation) {
    removeTodoFromLocal(index);
  }
}

// Function to handle editing a todo
function editTodo(index) {
  const listItem = document.getElementById(`todo-${index}`);
  const label = listItem.querySelector(".todo-label");

  const currentText = label.textContent;
  const editableField = document.createElement("input");
  editableField.type = "text";
  editableField.value = currentText;
  editableField.classList.add("editable-field");

  editableField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      saveEditedTodo(index, editableField.value);
    }
  });

  listItem.replaceChild(editableField, label);
  editableField.focus();
}

// Function to save an edited todo
function saveEditedTodo(index, newText) {
  const existingTodos = fetchLocalTodos();
  existingTodos[index].title = newText;
  localStorage.setItem("todos", JSON.stringify(existingTodos));
  displayLocalTodos();
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
  const newTodoInput = document.getElementById("new-todo");
  const newTodoValue = newTodoInput.value.trim();

  // Check if the input is not empty
  if (newTodoValue !== "") {
    const newTodoData = {
      title: newTodoValue,
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

    // Clear the input field
    newTodoInput.value = "";
  } else {
    // Alert the user for an invalid input
    alert("Please enter a valid to-do item.");
  }
}

// Function to toggle the completion status of a todo
function toggleTodoCompletion(index) {
  const existingTodos = fetchLocalTodos();
  existingTodos[index].completed = !existingTodos[index].completed;
  localStorage.setItem("todos", JSON.stringify(existingTodos));
  displayLocalTodos();
}

// Function to apply filters based on completion status
function applyFilters() {
  const filterSelect = document.getElementById("filter");
  const selectedFilter = filterSelect.value;

  const localTodos = fetchLocalTodos();

  switch (selectedFilter) {
    case "completed":
      displayFilteredTodos(localTodos.filter((todo) => todo.completed));
      break;
    case "pending":
      displayFilteredTodos(localTodos.filter((todo) => !todo.completed));
      break;
    default:
      displayFilteredTodos(localTodos);
      break;
  }
}

// Function to apply sorting based on user selection
function applySort() {
  const sortSelect = document.getElementById("sort");
  const selectedSort = sortSelect.value;

  const localTodos = fetchLocalTodos();

  switch (selectedSort) {
    case "alphabetical":
      displayFilteredTodos(
        localTodos.sort((a, b) => a.title.localeCompare(b.title))
      );
      break;
    case "date":
    default:
      displayFilteredTodos(localTodos);
      break;
  }
}

// Function to display filtered and sorted todos
function displayFilteredTodos(filteredTodos) {
  todoListElement.innerHTML = ""; // Clear the existing content

  filteredTodos.forEach((todo, index) => {
    let listItem = document.createElement("li");
    listItem.id = `todo-${index}`;
    listItem.classList.add("todo-item");

    listItem.innerHTML = `
            <input type="checkbox" id="todo-checkbox-${index}" ${
      todo.completed ? "checked" : ""
    }>
            <label for="todo-checkbox-${index}" class="todo-label">${
      todo.title
    }</label>
            <button class="edit-button" onclick="editTodo(${index})">Edit</button>
        `;

    let deleteButton = createDeleteButton(index);
    listItem.appendChild(deleteButton);

    todoListElement.appendChild(listItem);

    let checkbox = listItem.querySelector(`#todo-checkbox-${index}`);
    checkbox.addEventListener("change", function () {
      toggleTodoCompletion(index);
    });
  });
}

// Execute code when the DOMContentLoaded event is fired (when the page has finished loading)
document.addEventListener("DOMContentLoaded", function () {
  displayLocalTodos(); // Display local todos when the page loads
});
