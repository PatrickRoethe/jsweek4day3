document.addEventListener("DOMContentLoaded", function () {
  // Check if the user is logged in
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  if (loggedInUser) {
    // Display user information on the dashboard
    displayUserInfo(loggedInUser);

    // Display user's to-do list
    displayUserTodos(loggedInUser);
  } else {
    // Redirect to the login page if the user is not logged in
    window.location.href = "ilogin-register-page.html";
  }
});

function displayUserInfo(user) {
  const userInfoContainer = document.getElementById("user-info");

  // Create elements to display user information
  const usernameParagraph = document.createElement("p");
  usernameParagraph.textContent = `Username: ${user.username}`;

  const registrationDateParagraph = document.createElement("p");
  registrationDateParagraph.textContent = `Registration Date: ${
    user.registrationDate || "N/A"
  }`;

  // Append elements to the container
  userInfoContainer.appendChild(usernameParagraph);
  userInfoContainer.appendChild(registrationDateParagraph);
}

function displayUserTodos(user) {
  const userTodosContainer = document.getElementById("user-todos");

  // Fetch user's to-do list from local storage
  const userTodos =
    JSON.parse(localStorage.getItem(`${user.username}-todos`)) || [];

  if (userTodos.length > 0) {
    // Create a heading for the to-do list
    const todosHeading = document.createElement("h2");
    todosHeading.textContent = "Your To-Do List";

    // Create an unordered list to display to-dos
    const todosList = document.createElement("ul");
    todosList.id = "user-todos-list";

    // Loop through user's to-dos and create list items
    userTodos.forEach((todo, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${index + 1}. ${todo.title}`;
      todosList.appendChild(listItem);
    });

    // Append heading and to-do list to the container
    userTodosContainer.appendChild(todosHeading);
    userTodosContainer.appendChild(todosList);
  } else {
    // Display a message if the user has no to-dos
    const noTodosMessage = document.createElement("p");
    noTodosMessage.textContent = "You have no to-dos yet. Start adding some!";
    userTodosContainer.appendChild(noTodosMessage);
  }
}
