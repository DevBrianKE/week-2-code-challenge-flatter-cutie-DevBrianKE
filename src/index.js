// Run JavaScript after the page loads
document.addEventListener("DOMContentLoaded", () => {
    fetchCharacters();
});

// Fetch characters from the server and display them
function fetchCharacters() {
    fetch("http://localhost:3000/characters")
        .then((response) => response.json())
        .then((characters) => {
            const characterBar = document.getElementById("character-bar");
            characterBar.innerHTML = ""; // Clear previous entries

            characters.forEach(character => {
                const span = document.createElement("span");
                span.textContent = character.name;
                span.dataset.id = character.id;
                span.addEventListener("click", () => displayCharacter(character));
                characterBar.appendChild(span);
            });
        })
        .catch((error) => console.error("Error fetching characters:", error));
}

// Update character details on click
function displayCharacter(character) {
    document.getElementById("name").textContent = character.name;
    document.getElementById("image").src = character.image;
    document.getElementById("vote-count").textContent = character.votes;
    document.getElementById("votes-form").dataset.id = character.id;
}

// Handle vote submission
document.getElementById("votes-form").addEventListener("submit", (e) => {
    e.preventDefault();// Prevent page reload on form submission
    const characterId = e.target.dataset.id;
    const votesInput = document.getElementById("votes").value;
    const voteCountSpan = document.getElementById("vote-count");

    let newVotes = parseInt(votesInput);
    if (isNaN(newVotes) || newVotes < 0) {
        alert("Please enter a valid number!");
        return;
    }

    let updatedVotes = parseInt(voteCountSpan.textContent) + newVotes;
    voteCountSpan.textContent = updatedVotes;

    updateVotes(characterId, updatedVotes);
    e.target.reset();
});

// Update the vote count for a specific character on the server
function updateVotes(id, votes) {
    fetch(`http://localhost:3000/characters/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ votes }),
    })
    .then((response) => response.json())
    .then((data) => console.log("Updated votes:", data))
    .catch((error) => console.error("Error updating votes:", error));
}

// Reset the vote count to 0 when the reset button is clicked
document.getElementById("reset-btn").addEventListener("click", () => {
    const characterId = document.getElementById("votes-form").dataset.id;
    document.getElementById("vote-count").textContent = 0;
    updateVotes(characterId, 0);
});
