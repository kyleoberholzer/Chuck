async function fetchJoke() {
    try {
      const response = await fetch("https://api.chucknorris.io/jokes/random");
  
      // Check if the response is okay
      if (!response.ok) {
        throw new Error("Failed to fetch joke: " + response.statusText);
      }
  
      const data = await response.json(); // Parse the JSON response
      displayJoke(data.value); // Display the joke (data.value contains the joke text)
    } catch (error) {
      console.error("Error fetching joke:", error);
      displayJoke("Oops! Something went wrong. Please try again.");
    }
  }
  
  // Function to display the joke in the HTML
  function displayJoke(joke) {
    const jokeDisplay = document.getElementById("jokeDisplay");
    jokeDisplay.textContent = joke;
  }
  
  // Add event listener to the button
  document.getElementById("jokeButton").addEventListener("click", fetchJoke);