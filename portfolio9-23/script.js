const projectTiles = document.querySelectorAll('.project-tile');
const expandingSections = document.querySelectorAll('.expanding-section');

// Function to hide all expanding sections
function hideAllSections() {
    expandingSections.forEach((section) => {
        section.style.display = 'none';
    });
}

projectTiles.forEach((tile, index) => {
    const button = tile.querySelector('.button');
    const expandingSection = expandingSections[index];

    button.addEventListener('click', (event) => {
        // Prevent the click event from propagating to the document
        event.stopPropagation();

        // Hide all expanding sections
        hideAllSections();

        // Show the expanding section for the clicked tile
        expandingSection.style.display = 'block';
    });
});

// Add a click event listener to the document (or another container element)
document.addEventListener('click', (event) => {
    const target = event.target;

    // Check if the click target is not within an expanding section
    if (!target.closest('.expanding-section')) {
        // Hide all expanding sections
        hideAllSections();
    }
});
