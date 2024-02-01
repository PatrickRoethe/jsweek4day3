// Function to handle confirmation before deletion
function confirmDelete(index) {
  // Show a confirmation dialog
  const confirmation = confirm("Are you sure you want to delete this to-do?");

  // If the user confirms, proceed with deletion
  if (confirmation) {
    removeTodoFromLocal(index);
  }
}
