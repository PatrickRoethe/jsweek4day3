// edit.js

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

function saveEditedTodo(index, newText) {
  const existingTodos = fetchLocalTodos();
  existingTodos[index].title = newText;
  localStorage.setItem("todos", JSON.stringify(existingTodos));
  displayLocalTodos();
}
