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
