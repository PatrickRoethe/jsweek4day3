console.log("HEEEEY");

// Assume you have an HTML file with an element with the id "todo-list"
let todoListElement = document.getElementById("todo-list");

// Function to fetch cat facts from an API
function fetchCatFacts() {
  return fetch("https://catfact.ninja/fact").then((response) =>
    response.json()
  );
}

// Function to display cat facts in the HTML
function displayCatFacts(catFacts) {
  // Clear existing cat facts list
  todoListElement.innerHTML = "";

  // Display the cat fact
  let listItem = document.createElement("li");
  listItem.textContent = catFacts.fact;
  todoListElement.appendChild(listItem);
}

// Fetch cat facts and display them when the page loads
document.addEventListener("DOMContentLoaded", function () {
  fetchCatFacts()
    .then((catFacts) => displayCatFacts(catFacts))
    .catch((error) => console.error(error));
});
