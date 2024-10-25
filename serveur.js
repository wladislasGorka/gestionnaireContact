const http = require('http');
const fs = require('fs');

// Fonction pour écrire le fichier XML
function writeXMLFile(content) {
  fs.writeFile('contacts.xml', content, (error) => {
    if (error) throw error;
    console.log('Écriture terminée');
  });
}

// Créer le serveur HTTP
const server = http.createServer((req, res) => {
  // Ajouter les en-têtes CORS pour autoriser les requêtes cross-origin
  res.setHeader('Access-Control-Allow-Origin', '*');  // Permet les requêtes provenant de n'importe quelle origine
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');  // Autoriser certaines méthodes HTTP
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');  // Autoriser certains en-têtes

  // Gérer les requêtes OPTIONS (préflight) utilisées par CORS
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Vérifier si la requête est une POST vers /write-xml
  if (req.method === 'POST' && req.url === '/write-xml') {
    let body = '';

    // Collecter les données envoyées par le client
    req.on('data', chunk => {
      body += chunk.toString();
    });

    // Une fois toutes les données reçues
    req.on('end', () => {
      writeXMLFile(body);
    });
  } else {
    // Si la requête ne correspond pas à POST /write-xml
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Route non trouvée');
  }
});

// Démarrer le serveur sur le port 3000
server.listen(3000, () => {
  console.log('Serveur à l’écoute sur http://localhost:3000');
});