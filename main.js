// Modules pour contrôler la vie de l'application et créer une fenêtre de navigateur native
const { app, BrowserWindow } = require('electron');
const path = require('path');

const createWindow = () => {
    // Créer la fenêtre du navigateur.
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            // __dirname pointe vers le répertoire du script actuel (racine du projet)
            // path.join est utilisé pour créer des chemins de fichiers multiplateformes
            preload: path.join(__dirname, 'preload.js'), // Optionnel mais bonne pratique
            contextIsolation: true, // Recommandé pour la sécurité
            nodeIntegration: false, // Recommandé pour la sécurité
        }
    });

    // et charger le fichier index.html de l'application.
    mainWindow.loadFile('index.html');

    // Ouvrir les outils de développement (DevTools).
    // mainWindow.webContents.openDevTools();
};

// Cette méthode sera appelée quand Electron aura fini
// de s'initialiser et sera prêt à créer des fenêtres de navigation.
// Certaines APIs peuvent être utilisées uniquement après cet événement.
app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        // Sur macOS, il est courant de recréer une fenêtre dans l'application quand
        // l'icône du dock est cliquée et qu'il n'y a pas d'autres fenêtres d'ouvertes.
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Quitter quand toutes les fenêtres sont fermées, sauf sur macOS. Sur macOS, il est courant
// pour les applications et leur barre de menu de rester actives jusqu’à ce que l’utilisateur quitte
// explicitement avec Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
