function addPetToWishlist(petId) {
  // Perform an asynchronous request to your backend server to add the pet to the user's wishlist
  fetch("/wishlist/add-pet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ petId: petId }),
  })
    .then((response) => {
      if (response.ok) {
        // Pet added successfully
        // Refresh or update the wishlist UI
        updateWishlist();
      } else {
        // Handle the error
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle the error
    });
}

function updateWishlist() {}

// Find all buttons with the "add-to-wishlist" class
const wishlistButtons = document.querySelectorAll(".add-to-wishlist");

// Add event listeners to each button
wishlistButtons.forEach((button) => {
  button.addEventListener("click", function (event) {
    const petId = event.target.getAttribute("data-pet-id");

    // Call the addPetToWishlist function with the petId when the button is clicked
    addPetToWishlist(petId);
  });
});
