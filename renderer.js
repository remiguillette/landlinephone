/**
 * Asynchronously loads HTML content from a file and injects it into a page element.
 * Ensures that any <script> tags in the loaded content are executed.
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

            // Re-execute <script> tags inside loaded content
            const scripts = element.querySelectorAll("script");
            scripts.forEach(oldScript => {
                const newScript = document.createElement("script");
                Array.from(oldScript.attributes).forEach(attr => {
                    newScript.setAttribute(attr.name, attr.value);
                });
                newScript.textContent = oldScript.textContent;
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

/**
 * Phone dialer logic
 */
function setupDialer() {
    // --- 1. SÉLECTION DE TOUS LES ÉLÉMENTS (une seule fois au début) ---
    const display = document.getElementById('display');
    const dialButtons = document.querySelectorAll('.dial-button');
    const contactItems = document.querySelectorAll('.contact-item');
    const compositionBar = document.getElementById('composition-bar');
    
    // Boutons d'action
    const callButton = document.getElementById('callButton');
    const callIcon = document.getElementById('call-icon');
    const hangupIcon = document.getElementById('hangup-icon');
    const speakerButton = document.getElementById('speakerButton');
    
    // AJOUT : Les boutons manquants doivent être déclarés
    const eraseButton = document.getElementById('eraseButton'); // Assurez-vous que cet ID existe dans votre HTML
    const holdButton = document.getElementById('holdButton');   // Assurez-vous que cet ID existe dans votre HTML

    // --- 2. VARIABLES D'ÉTAT ---
    let inCall = false;
    let speakerOn = false;
    let onHold = false; // AJOUT : Variable manquante pour la mise en attente

    // --- 3. FONCTIONS UTILITAIRES ---
    function updateCompositionBar() {
        if (display.value) {
            compositionBar.textContent = display.value;
        } else {
            compositionBar.textContent = 'En attente de la composition...';
        }
    }

    // --- 4. ÉCOUTEURS D'ÉVÉNEMENTS ---

    // Clic sur les touches du clavier numérique
    dialButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            display.value += btn.textContent.trim().charAt(0);
            updateCompositionBar();
        });
    });

    // Clic sur un contact
    contactItems.forEach(item => {
        item.addEventListener('click', () => {
            display.value = item.dataset.ext || '';
            updateCompositionBar();
        });
    });

    // Clic sur le bouton Appeler / Raccrocher (CORRIGÉ ET FUSIONNÉ)
    callButton.addEventListener('click', () => {
        // On inverse l'état de l'appel
        inCall = !inCall;

        // On bascule l'UI (couleur du bouton et icônes)
        callButton.classList.toggle('in-call', inCall);
        callIcon.classList.toggle('hidden', inCall);
        hangupIcon.classList.toggle('hidden', !inCall);

        // On exécute la logique d'appel
        if (inCall) {
            console.log(`Appel en cours vers : ${display.value}`);
        } else {
            console.log('Appel terminé.');
            display.value = ''; // On vide le champ après avoir raccroché
            updateCompositionBar();
        }
    });

    // Clic sur le haut-parleur
    speakerButton.addEventListener('click', () => {
        speakerOn = !speakerOn;
        speakerButton.classList.toggle('active', speakerOn);
        console.log(`Haut-parleur: ${speakerOn ? 'Activé' : 'Désactivé'}`);
    });

    // Clic sur le bouton Effacer (AJOUT)
    eraseButton.addEventListener('click', () => {
        display.value = display.value.slice(0, -1);
        updateCompositionBar();
    });

    // Clic sur le bouton Mettre en attente (AJOUT)
    holdButton.addEventListener('click', () => {
        if (!inCall) {
            console.log("Impossible de mettre en attente : aucun appel en cours.");
            return;
        }
        onHold = !onHold;
        holdButton.classList.toggle('active', onHold);
        console.log(`Appel ${onHold ? 'mis en attente' : 'repris'}.`);
    });
}


// Event triggered when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', async () => {
    await loadContent('./element/header.html', 'header-container');
    await loadContent('./element/hero.html', 'hero-container');
    await loadContent('./element/page.html', 'page-container');

    // Start the clock
    setInterval(updateClock, 1000);
    updateClock();

    // Initialize dialer AFTER page.html is injected
    setupDialer();
});
