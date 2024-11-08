//fetches categories and assigns them to the dropdown list
async function fetchCategories() {
    try {
      // fetches available categories from th API
      const response = await fetch("https://api.chucknorris.io/jokes/categories");
      const categories = await response.json();

      //Selects the dropdown element from the HTML
      const categorySelect = document.getElementById("categorySelect");
  
      // Add each category as an option in the dropdown
      categories.forEach(category => {
        const option = document.createElement("option"); //creates a variable and assigns  a new element "option" to it
        option.value = category; //now assigns the current iterated category
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1); //sets the text content of the dropdown
        categorySelect.appendChild(option); //adds a child to the categorySelect dropdown menu
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
}

//fetches a joke based on the selected category
async function fetchJoke(category) {
    try {
        // Determine the URL to fetch the joke from (random or specific category)
        const url = category === "random" 
        ? "https://api.chucknorris.io/jokes/random" 
        : `https://api.chucknorris.io/jokes/random?category=${category}`;
        
        // Fetch the joke from the API
        const response = await fetch(url);
        const data = await response.json();

        // Display the joke in the joke display area
        displayJoke(data.value);

    } catch (error) {
        console.error("Error fetching joke:", error);
        displayJoke("Oops! Something went wrong. Please try again."); // Display an error message if fetch fails
    }
}
  
// Function to update the displayed joke text in the HTML
function displayJoke(joke) {
    const jokeDisplay = document.getElementById("jokeDisplay");
    jokeDisplay.textContent = joke; // Set the joke text in the display element
}


  // Event listener to fetch a new joke when the "Get a New Joke" button is clicked
document.getElementById("jokeButton").addEventListener("click", () => {
    const categorySelect = document.getElementById("categorySelect"); //assigns a variable to the elemtnID
    const selectedCategory = categorySelect.value; //then assigns the value of the element to a new variable

    //Check if they've selected a category
    if (selectedCategory !==""){
        fetchJoke(selectedCategory); // Fetch and display a joke for the selected category
    } else {
        const pleaseSelect = document.getElementById("jokeDisplay"); // Show an alert if no category is selected
        pleaseSelect.textContent = "Please Select a category";
      }
});

 // Fetch and display categories when the page first loads
 fetchCategories();
 