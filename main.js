const tilesContainer = document.querySelector(".tiles");
const colors = ["black", "white", "red", "green", "blue", "yellow", "magenta", "cyan"]
const colorsPicklist = [...colors, ...colors];
const tileCount = colorsPicklist.length;

// Game state
let revealed = 0;
let activeTile = null;
let awaitingEndOfMove = false;
// Generates tiles
function buildTile(color) {
    const element = document.createElement("div"); // Creates a `div` element

    element.classList.add("tile"); 
    element.setAttribute("data-color", color); 
    element.setAttribute("data-revealed", "false");

    element.addEventListener("click", () => {
        const revealed = element.getAttribute("data-revealed");

        if (
            awaitingEndOfMove
            || revealed === "true"
            || element === activeTile
        ) {
            return;
        }

        element.style.backgroundColor = color;

        if (!activeTile) {
            activeTile = element;
            return;
        }

        const colorToMatch = activeTile.getAttribute("data-color");

        if (colorToMatch === color) {
            activeTile.setAttribute("data-revelead", "true");
            element.setAttribute("data-revelead", "true");

            awaitingEndOfMove = false;
            activeTile = null;

            revealed += 2;

            if (revealed === tileCount) {
                alert("You win! Referesh to play again :)");
            }

            return
        }
        awaitingEndOfMove = true;

        setTimeout(() => {
            element.style.backgroundColor = null;
            activeTile.style.backgroundColor = null;

            awaitingEndOfMove = false;
            activeTile = null;
        }, 1000);
    })

    return element; // Returns the element created with the `.tile` class and `data-color: color` attribute.
}
// Build up tiles
for (let i = 0; i < tileCount; i++) {
    const randomIndex = Math.floor(Math.random() * colorsPicklist.length); // Generates a random number from 1-16 and is set to `randomIndex`
    const color = colorsPicklist[randomIndex]; // Picks a color from the `colorsPickList` array with the `randomIndex`
    colorsPicklist.splice(randomIndex, 1) // Removes the color that is picked from the `colorsPickList` array once. This results in the same color only being picked one more time.
    const tile = buildTile(color); // Calls the function `buildTile` and passes in the color generated above

    // Once the `element` is received from the `buildTile()` function. 
    // It is appended to the `tilesContainer` element. And the reason we pass in `tile` is because we set the element received from the function
    // To be set to the constant name of `tile`
    tilesContainer.appendChild(tile); 
}
