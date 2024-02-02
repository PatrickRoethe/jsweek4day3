// Function to register a new user
function registerUser(username, password) {
  // Check if the username is already taken (you might want to implement server-side validation)
  if (!isUsernameTaken(username)) {
    // Create a new user object
    const newUser = {
      username: username,
      password: password,
    };

    // Store the user data in local storage (you might want to use a more secure method in a real application)
    localStorage.setItem("user", JSON.stringify(newUser));

    // Redirect to the login page or perform any other desired action
    window.location.href = "login.html";
  } else {
    alert("Username is already taken. Please choose another.");
  }
}

// Function to check if a username is already taken
function isUsernameTaken(username) {
  const existingUser = localStorage.getItem("user");

  // If no existing user, return false
  if (!existingUser) {
    return false;
  }

  // Parse the existing user data
  const parsedUser = JSON.parse(existingUser);

  // Check if the provided username matches the existing one
  return parsedUser.username === username;
}

// Function to log in a user
function loginUser(username, password) {
  const existingUser = localStorage.getItem("user");

  // If no existing user, show an alert
  if (!existingUser) {
    alert("User not found. Please register.");
    return;
  }

  // Parse the existing user data
  const parsedUser = JSON.parse(existingUser);

  // Check if the provided username and password match the existing user's credentials
  if (parsedUser.username === username && parsedUser.password === password) {
    // Redirect to the to-do list page or perform any other desired action
    window.location.href = "todo.html";
  } else {
    alert("Invalid username or password. Please try again.");
  }
}

// Example usage:
// registerUser("exampleUser", "examplePassword");
// loginUser("exampleUser", "examplePassword");
