/**
 * Fonction pour charger du contenu HTML depuis un fichier et l'injecter dans un élément de la page.
 * @param {string} url - Le chemin vers le fichier HTML à charger.
 * @param {string} elementId - L'ID de l'élément où injecter le contenu.
 */
const loadContent = (url, elementId) => {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur de chargement de ${url}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = data;
            } else {
                console.error(`L'élément avec l'ID '${elementId}' n'a pas été trouvé.`);
            }
        })
        .catch(error => console.error("Erreur lors du fetch:", error));
};

// Événement déclenché lorsque le DOM est entièrement chargé
document.addEventListener('DOMContentLoaded', () => {
    // Charger les différents composants dans leurs conteneurs respectifs
    loadContent('./element/header.html', 'header-container');
    loadContent('./element/hero.html', 'hero-container');
    loadContent('./element/page.html', 'page-container');
});
