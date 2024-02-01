// Function to handle keyboard events
function handleKeyboardEvents(event) {
  // Check if the pressed key is "Enter" (key code 13)
  if (event.key === "Enter") {
    // Call the function from main.js to submit a to-do item
    submitTodo();
  }
}

// Add an event listener for the "keydown" event on the document
document.addEventListener("keydown", handleKeyboardEvents);
