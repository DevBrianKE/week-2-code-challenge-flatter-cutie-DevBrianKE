document.addEventListener("DOMContentLoaded", () => {
    fetchCharacters();
});

function fetchCharacters() {
    fetch("http://localhost:3000/characters")
        .then((response) => response.json())
        .then((characters) => {
            const characterBar = document.getElementById("character-bar");
            characterBar.innerHTML = ""; // Clear existing data
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


function displayCharacter(character) {
    document.getElementById("name").textContent = character.name;
    document.getElementById("image").src = character.image;
    document.getElementById("vote-count").textContent = character.votes;
    document.getElementById("votes-form").dataset.id = character.id;
}
