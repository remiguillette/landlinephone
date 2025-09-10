/**
 * Asynchronously loads HTML content from a file and injects it into a page element.
 * This version ensures that any <script> tags in the loaded content are executed.
 * @param {string} url - The path to the HTML file to load.
 * @param {string} elementId - The ID of the element to inject the content into.
 */
const loadContent = async (url, elementId) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error loading ${url}: ${response.statusText}`);
        }
        const data = await response.text();
        const element = document.getElementById(elementId);

        if (element) {
            element.innerHTML = data;

            // Find all script tags in the newly added content
            const scripts = element.querySelectorAll("script");

            // For each script, create a new script element and append it to the document
            // This is a workaround to get the browser to execute them.
            scripts.forEach(oldScript => {
                const newScript = document.createElement("script");
                // Copy all attributes from the old script to the new one
                Array.from(oldScript.attributes).forEach(attr => {
                    newScript.setAttribute(attr.name, attr.value);
                });
                // Copy the content of the script
                newScript.textContent = oldScript.textContent;
                // Replace the old script tag with the new one to trigger execution
                oldScript.parentNode.replaceChild(newScript, oldScript);
            });
        } else {
            console.error(`Element with ID '${elementId}' not found.`);
        }
    } catch (error) {
        console.error("Error during fetch:", error);
    }
};

/**
 * Function to update the clock in real-time.
 */
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const clockElement = document.getElementById('horloge');
    if (clockElement) {
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
}
<!-- Script for interactivity -->
<script>
  const display = document.getElementById('display');
  const dialButtons = document.querySelectorAll('.dial-button');
  const callButton = document.getElementById('callButton');
  const callIcon = document.getElementById('call-icon');
  const hangupIcon = document.getElementById('hangup-icon');
  const speakerButton = document.getElementById('speakerButton');
  const contactItems = document.querySelectorAll('.contact-item');
  const compositionBar = document.getElementById('composition-bar');

  let inCall = false;
  let speakerOn = false;

  function updateCompositionBar() {
      if (display.value) {
          compositionBar.textContent = display.value;
      } else {
          compositionBar.textContent = 'En attente de la composition...';
      }
  }

  dialButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      display.value += btn.textContent.trim().charAt(0);
      updateCompositionBar();
    });
  });

  contactItems.forEach(item => {
    item.addEventListener('click', () => {
      display.value = item.dataset.ext || '';
      updateCompositionBar();
    });
  });

  callButton.addEventListener('click', () => {
    inCall = !inCall;
    callIcon.classList.toggle('hidden', inCall);
    hangupIcon.classList.toggle('hidden', !inCall);

    if (inCall) {
      console.log(`Appel en cours vers : ${display.value}`);
    } else {
      console.log('Appel terminé.');
      display.value = '';
      updateCompositionBar();
    }
  });

  speakerButton.addEventListener('click', () => {
    speakerOn = !speakerOn;
    speakerButton.classList.toggle('active', speakerOn);
    console.log(`Haut-parleur: ${speakerOn ? 'Activé' : 'Désactivé'}`);
  });
</script>



// Event triggered when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', async () => {
    // Await each loadContent call to ensure they load sequentially
    await loadContent('./element/header.html', 'header-container');
    await loadContent('./element/hero.html', 'hero-container');
    await loadContent('./element/page.html', 'page-container');

    // Start the clock after all content has been loaded
    setInterval(updateClock, 1000);
    // Call it once immediately to prevent a 1-second delay on first load
    updateClock();
});
