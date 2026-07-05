/*
🧠 API REST => Une API permet à un client de demander des données à un serveur via HTTP.

📍 params = l'identifiant dans l'URL
Ex : /pizza/42 → "42 = quelle ressource"
🔎 query  = options après ?
Ex : /pizza/42?size=large → filtres / options
📦 body   = données envoyées (POST/PUT)
Ex : { size: "large" } → création / modification
*/

const Link = require('../models/Link');
const Comment = require('../models/Comment');


// GET /
exports.getAllLinks = async (req, res) => {
    try {
        // .sort() => trie les résultats (ici, les plus récents en premier ( -1 ), en mettant 1, on aurait fait l'inverse. c'est une convention. )
        const links = await Link.find()
            .populate('user', 'email')
            .sort({ createdAt: -1 });
        res.status(200).json(links);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur : ' + error.message });
    }
};

// GET /:id -> je veux le link avec l'id 1
exports.getLinkById = async (req, res) => {
    // Express met les paramètres d'URL dans req.params
    // Exemple si URL = /1 → req.params = { id: "1" }
    try {
        const link = await Link.findById(req.params.id)
            .populate('user', 'email'); 
        if (!link) {
            return res.status(404).json({ message: 'Link not found '})
        }
        res.status(200).json(link)
        }catch (error) {
        res.status(500).json({ message: 'Erreur serveur : ' + error.message });
    }

};

// POST = Création d'un link
exports.createLink = async (req, res) => {
    try {
        // Création directe du document MongoDB avec Mongoose
        const newLink = await Link.create({
            // ...req.body => récupère automatiquement tous les champs envoyés par le client
            // (ex: title, url, description)
            // ⚠️ attention : tout ce que le client envoie est inclus ici
            ...req.body,

            // Ajout manuel du user connecté (sécurisé via middleware auth)
            // req.user vient du JWT middleware
            // req.user.id = id de l'utilisateur connecté
            user: req.user.id
        });

        // Réponse HTTP 201 = ressource créée avec succès
        // On renvoie le document créé en base
        res.status(201).json(newLink);

    } catch (error) {
        // Gestion des erreurs (validation Mongoose, champs manquants, etc.)
        // 401 = normalement "unauthorized", ici utilisé pour erreur (pas idéal mais courant en apprentissage)
        res.status(401).json({
            message: 'Erreur de validation : ' + error.message
        });
    }
}

// PUT = Modification d'un link /:id
exports.updateLinkById = async (req, res) => {
    try {
        const updatedLink = await Link.findByIdAndUpdate(
            req.params.id, // ID du document a mettre a jour
            req.body, // Données à mettre à jour
            {
                new: true,
                runValidators: true
            });
        if (!updatedLink) {
            return res.status(404).json({ message: 'Link not found' });
        }
        res.status(200).json(updatedLink);
    } catch {
        res.status(400).json({ message: 'Erreur de validation : + error.message' });
    }


}

// DELETE /:id
exports.deleteLinkById = async (req, res) => {
    try {
        const link = await Link.findByIdAndDelete(req.params.id)
        if (!link) {
            return res.status(404).json({ message: 'Link not found' });
        }
        await Comment.deleteMany({link: req.params.id})
        res.status(204).send();
    } catch (error) {
        res.status(500).json({message: "Erreur serveur : " + error.messsage})
    }
}



