/**
 * Function to load HTML content from a file and inject it into a page element.
 * @param {string} url - The path to the HTML file to load.
 * @param {string} elementId - The ID of the element to inject the content into.
 */
const loadContent = (url, elementId) => {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error loading ${url}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = data;
            } else {
                console.error(`Element with ID '${elementId}' not found.`);
            }
        })
        .catch(error => console.error("Error during fetch:", error));
};

/**
 * START OF NEW CODE: Clock Logic
 * Function to update the clock in real-time.
 */
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    // Find the clock element. It might not exist right away, so we check.
    const clockElement = document.getElementById('horloge');
    if (clockElement) {
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
}
// END OF NEW CODE

// Event triggered when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load the different components into their respective containers
    loadContent('./element/header.html', 'header-container');
    loadContent('./element/hero.html', 'hero-container');
    loadContent('./element/page.html', 'page-container');

    // START OF NEW CODE: Start the clock after loading content
    // We start the clock on a 1-second interval.
    setInterval(updateClock, 1000);
    // Call it once immediately to display the time without a 1-second delay.
    updateClock();
    // END OF NEW CODE
});
