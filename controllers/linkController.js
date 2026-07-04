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


// GET /
exports.getAllLinks = async (req, res) => {
    try {
        // .sort() => trie les résultats (ici, les plus récents en premier ( -1 ), en mettant 1, on aurait fait l'inverse. c'est une convention. )
        const links = await Link.find().sort({createdAt: -1});
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
        const link = await Link.findById(req.params.id); 
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
    const { title, url, description } = req.body;
    const newLink = new Link({
        title: title,
        url: url,
        description: description
    });
    // maintenant que j'ai préparé mon information, je peux faire mon try et sauvegarder mon nouveau post
    try {
        const savedLink = await newLink.save();
        res.status(201).json(newLink);
    } catch (error) {
        res.status(401).json({ message: 'Erreur de validation : ' + error.message });
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
        res.status(204).send();
    } catch (error) {
        res.status(500).json({message: "Erreur serveur : " + error.messsage})
    }
}



