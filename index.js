const express = require('express');
const app = express();

//import des routes
const linkRoutes = require('./routes/links');

// Logger (middleware : effectué avant le traitement de la requête reçue en back end) -- ici, on va printer en console pour savoir ce qui se passe (je pense juste en production pour le dev)
// on va pouvoir savoir "quand" quelle requête a été effectué, avec quelle méthode (get put post delete )et sur quelle URL, pour des notions de traçabilité

app.use(
    (req, res, next) => {
        console.log(`[${new Date().toISOString}] ${req.method} ${req.url}`);
        next();
    });

// Routes de base
app.get('/', (req, res) => {
    res.send("Bienvenue sur le mini-reddit !")
});

// "Monter" les routes des liens (3 : pour les posts, pour les connections, et pour les commentaires)
app.use('/api/links', linkRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Le serveur a démarré sur le port ${PORT}`)
});