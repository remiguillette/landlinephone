// main.js

// Les modules `app` et `BrowserWindow` sont importés depuis la bibliothèque Electron.
// `app` contrôle le cycle de vie de votre application.
// `BrowserWindow` crée et gère les fenêtres de l'application.
// `path` est un module Node.js pour travailler avec les chemins de fichiers et de répertoires.
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// Cette fonction crée une nouvelle fenêtre de navigateur.
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Le script de préchargement est essentiel pour la sécurité.
      // Il s'exécute dans le contexte du rendu (la page web) mais a accès aux API Node.js.
      // Il permet de faire le pont entre le monde de Node.js (main.js) et le monde du web (renderer.js).
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Charge le fichier index.html dans la nouvelle fenêtre.
  win.loadFile('index.html');

  // Optionnel : Ouvre les outils de développement (comme dans Chrome).
  // win.webContents.openDevTools();
};

// Cette méthode sera appelée quand Electron aura fini
// de s'initialiser et sera prêt à créer des fenêtres de navigation.
// Certaines API ne peuvent être utilisées qu'après cet événement.
app.whenReady().then(() => {
  createWindow();

  // Spécifique à macOS : Recrée une fenêtre si l'icône du dock est cliquée
  // et qu'il n'y a pas d'autres fenêtres ouvertes.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quitte l'application lorsque toutes les fenêtres sont fermées,
// sauf sur macOS où il est courant que les applications restent actives.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
