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
