#Landline Phone ☎️
Ce projet est une simulation de téléphone fixe développée avec Electron. Il offre une interface utilisateur soignée pour simuler la numérotation, la gestion des appels et un répertoire de contacts.

🚀 Fonctionnalités
Clavier de numérotation interactif : Composez des numéros avec un clavier numérique complet, incluant les lettres correspondantes.

Formatage automatique : Le numéro composé est automatiquement formaté au fur et à mesure de la saisie pour une meilleure lisibilité.

Gestion des appels : Simulez le début et la fin d'un appel grâce à un bouton dynamique qui change d'état et de couleur.

Fonctionnalités d'appel :

Mise en attente (Hold)

Haut-parleur (Speaker)

Correction du dernier chiffre (Erase)

Liste de contacts : Affiche une liste de contacts pré-enregistrés avec leurs extensions pour une numérotation rapide.

Horloge en temps réel : Une horloge est affichée dans l'en-tête et se met à jour chaque seconde.

Interface dynamique : Le contenu de l'application est chargé dynamiquement à partir de fragments HTML, ce qui permet de garder le code organisé.

🛠️ Technologies utilisées
Framework : Electron

Langages : HTML, CSS, JavaScript

Dépendances :

electron : Utilisé pour créer l'application de bureau.

📁 Structure du projet
/
|-- Contact/                # Images des contacts
|-- element/                # Fragments HTML (en-tête, page principale)
|-- index.html              # Fichier HTML principal (point d'entrée)
|-- main.js                 # Processus principal d'Electron (création de la fenêtre)
|-- package.json            # Métadonnées du projet et dépendances
|-- preload.js              # Script de préchargement pour la sécurité
|-- renderer.js             # Logique du processus de rendu (interface utilisateur)
|-- style.css               # Feuille de style unifiée pour l'application
|-- README.md               # Ce fichier
⚙️ Démarrage
Prérequis
Node.js et npm (inclus avec Node.js) doivent être installés sur votre machine.

Installation
Clonez ce dépôt sur votre machine locale.

Ouvrez un terminal à la racine du projet et installez les dépendances :

Bash

npm install
Lancement de l'application
Pour démarrer l'application, exécutez la commande suivante à la racine du projet :

Bash

npm start
📜 Licence
Ce projet est sous licence MIT.
