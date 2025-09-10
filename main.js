<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <meta http-equiv="X-Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>Mon App Electron Simple</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Mon Application</h1>
    </header>

    <main>
        <h1>👋 Bonjour depuis Electron !</h1>
        <p>Ceci est une application de bureau simple construite avec des technologies web.</p>
        
        <div id="versions">
            Nous utilisons Node.js <span id="node-version"></span>,
            Chromium <span id="chrome-version"></span>,
            et Electron <span id="electron-version"></span>.
        </div>
    </main>

    <!-- Le script qui s'exécutera dans cette page -->
    <script src="./renderer.js"></script>
</body>
</html>
