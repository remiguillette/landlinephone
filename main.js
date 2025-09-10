<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- La Content-Security-Policy est ajustée pour permettre les styles et scripts locaux -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'">
    <title>Mon Application Electron</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Les conteneurs où le contenu sera injecté par renderer.js -->
    <header id="header-container"></header>
    <main>
        <section id="hero-container"></section>
        <section id="page-container"></section>
    </main>

    <!-- Script du processus de rendu -->
    <script src="renderer.js"></script>
</body>
</html>
