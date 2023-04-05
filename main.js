const tilesContainer = document.querySelector(".tiles");
const colors = ['#FF0000', '#00FF00', '#0000FF', '#FF00FF', '#00FFFF', '#800000', '#008000', '#000080', '#808000', '#800080', '#008080', '#C0C0C0', '#808080', '#FFA500', '#FFC0CB', '#FFD700', '#FF00FF', '#B22222', '#FF1493', '#00BFFF', '#1E90FF', '#FF4500', '#FF8C00', '#FF69B4', '#FF6347', '#00CED1', '#0000CD', '#9400D3', '#8B008B', '#32CD32', '#FFFAFA', '#F0E68C', '#00FF7F', '#B0E0E6', '#BA55D3', '#87CEFA', '#228B22', '#FFFFF0', '#FFDAB9', '#FFDEAD', '#DDA0DD', '#FFB6C1', '#BC8F8F', '#2F4F4F', '#4B0082'];
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
            activeTile.setAttribute("data-revealed", "true");
            element.setAttribute("data-revealed", "true");

            awaitingEndOfMove = false;
            activeTile = null;

            revealed += 2;

            if (revealed === tileCount) {
                alert("YOU SUCK");
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
