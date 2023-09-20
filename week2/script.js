// script.js

const popups = [];
let activePopups = 0;

function stars(event) {
    const button = document.querySelector('button');
    button.style.transform = "scale(2)";
    button.textContent = "And Make Some More";

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Create and display multiple random popups
    const popupsContainer = document.getElementById('popups');
    const usedPositions = new Set();

    for (let i = 0; i < 8; i++) {
        // Generate a unique random position
        let randomX, randomY;
        do {
            randomX = Math.random() * screenWidth;
            randomY = Math.random() * screenHeight;
        } while (usedPositions.has(`${randomX}-${randomY}`));

        usedPositions.add(`${randomX}-${randomY}`);

        const popup = document.createElement('div');
        popup.classList.add('popup');

        // Set the popup's position
        popup.style.left = `${randomX}px`;
        popup.style.top = `${randomY}px`;

        // Add content to the popups
        popup.innerHTML = `<p>⋆｡°✩</p>`;

        // Append the popup to the popups container
        popupsContainer.appendChild(popup);

        // Increment the activePopups counter
        activePopups++;

        // Store popup information in the array
        popups.push({
            element: popup,
            x: randomX,
            y: randomY,
        });

        // Apply the fade-out effect after 1.5 seconds
        setTimeout(() => {
            fadeOutPopup(popup);
        }, 1500); // 1.5 seconds in milliseconds
    }
}

// Function to fade out a popup chatGPT help
function fadeOutPopup(popup) {
    let opacity = 1;
    const fadeOutInterval = setInterval(() => {
        opacity -= 0.02; // Adjust the rate of opacity decrease as needed
        popup.style.opacity = opacity.toFixed(2);

        if (opacity <= 0) {
            clearInterval(fadeOutInterval);
            popup.remove(); // Remove the popup from the DOM when opacity is 0

            // Decrement the activePopups counter
            activePopups--;

            // Check if all popups have faded out
            if (activePopups === 0) {
                // Reset the button to its original state
                const button = document.querySelector('button');
                button.style.transform = "scale(1)";
                button.textContent = "Take Whats Yours";
            }
        }
    }, 10); // Adjust the interval as needed for smoother or faster fading
}

// Event listener to trigger the popups and pass the mouse event
document.querySelector('button').addEventListener('click', (event) => {
    stars(event);
});
