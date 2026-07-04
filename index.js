const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db');

//import des routes
const linkRoutes = require('./routes/links');

// Logger (middleware : effectué avant le traitement de la requête reçue en back end) -- ici, on va printer en console pour savoir ce qui se passe (en production(espace réel d'application) pour les developpeur)
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

// "Monter" les routes des liens (3 : pour les posts, pour les connections et pour les commentaires)
app.use('/api/links', linkRoutes);

dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Le serveur a démarré sur le port ${PORT}`)
    // ou bien : console.log("Le serveur a démarré sur le port " + PORT); -> moins efficace au niveau performance
});