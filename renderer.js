// renderer.js

// Ce script s'exécute côté "client", dans la page web (index.html).
// Il n'a pas accès directement aux API de Node.js par défaut pour des raisons de sécurité.

// On récupère les éléments HTML pour afficher les versions
const nodeVersion = document.getElementById('node-version');
const chromeVersion = document.getElementById('chrome-version');
const electronVersion = document.getElementById('electron-version');

// On utilise la fonction `getVersions` que nous avons exposée
// de manière sécurisée dans le script `preload.js`.
const displayVersions = async () => {
  // Ici, nous simulons que la récupération des versions est asynchrone
  // pour montrer comment gérer les promesses.
  // En réalité, `process.versions` est synchrone.
  nodeVersion.innerText = process.versions.node;
  chromeVersion.innerText = process.versions.chrome;
  electronVersion.innerText = process.versions.electron;
};

displayVersions();

document.addEventListener("DOMContentLoaded", function() {
  const loadHTML = (elementId, filePath) => {
    fetch(filePath)
      .then(response => {
        if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
        return response.text();
      })
      .then(data => {
        document.getElementById(elementId).innerHTML = data;
      })
      .catch(error => console.error('Erreur de chargement du fichier:', error));
  };

  loadHTML('main-header', './element/header.html');
  loadHTML('hero-section', './element/hero.html');
  loadHTML('bloc-section', './element/bloc.html');
  loadHTML('bouton-container', './element/bouton.html');
});

