// preload.js

// Ce script agit comme un pont sécurisé. Il ne faut pas exposer
// directement les API puissantes de Node.js (comme `require` ou `process`)
// au script de votre page web (renderer.js) pour des raisons de sécurité.

const { contextBridge, ipcRenderer } = require('electron');

// On expose une API personnalisée et sûre à notre page web via l'objet `window`.
contextBridge.exposeInMainWorld('electronAPI', {
  // Exemple d'une fonction que l'on pourra appeler depuis renderer.js
  // pour obtenir la version de Node.js, Chrome et Electron.
  getVersions: () => ipcRenderer.invoke('get-versions')
});
