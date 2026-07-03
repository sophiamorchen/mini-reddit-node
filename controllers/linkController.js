/*
🧠 API REST

Une API permet à un client de demander des données à un serveur via HTTP.

-------------------------------------------------

📍 params = l'identifiant dans l'URL
Ex : /pizza/42 → "42 = quelle ressource"

🔎 query  = options après ?
Ex : /pizza/42?size=large → filtres / options

📦 body   = données envoyées (POST/PUT)
Ex : { size: "large" } → création / modification

-------------------------------------------------

🧠 Résumé :
params = quoi je veux
query  = comment je le veux
body   = ce que j’envoie
*/

let links = [
    { id: 1, title: 'Super article sur Node.js', url: 'https://exemple.com/node', description: 'Un bon tuto.' },
    { id: 2, title: 'React Hooks', url: 'https://exemple.com/react', description: 'Tout sur les hooks.' }
];
let nextId = 3;

// /!\ /!\ /!\ /!\ /!\
// EXPORTS. = signifie qu'on exporte les fonctions pour les réutiliser


// GET /
exports.getAllLinks = (req, res) => {
    res.status(200).json(links);
};

// GET /:id -> je veux le link avec l'id 1
exports.getLinkById = (req, res) => {
    // Express met les paramètres d'URL dans req.params
    // Exemple si URL = /1 → req.params = { id: "1" }
    const link = links.find(l => l.id === parseInt(req.params.id)); 
    if (!link) {
        return res.status(404).json({ message: 'Link not found '})
    }
    res.status(200).json(link)

};

// POST = Création d'un link
exports.createLink = (req, res) => {
    const { title, url, description } = req.body;
    if (!title || !url) {
        return res.status(400).json({message : 'Title and URL are required'})
    }
    const newLink = {
        // ici, nous avons l'affection de id = 3 , et à la porchaine, on aura 4. 
        // À l'inverse, l'expression : " ++nextId "  aurait incrémenté tout de suite et on aurait eu 4, et 3 n'aura jamais été affecté  
        id: nextId++,
        // ou : id: links.length + 1 (et on supprime nextId crée plus haut)
        title: title,
        url: url,
        description : description
    }
    links.push(newLink);
    res.status(201).json(newLink);
}

// PUT = Modification d'un link /:id
exports.updateLinkById = (req, res) => {
    const link = links.find(l => l.id === parseInt(req.params.id));
    if (!link) {
        return res.status(404).json({ message: 'Link not found' });
    }
    // ici, le || link.title sert à ré affecter l'ancien titre, dans le cas ou la personne n'avait en fait modifié que la description et pas le titre
    // en gros, si dans la requête que j'ai reçu, j'ai un titre dans mon body, je l'utilise, mais si je n'en ai pas, je remet l'ancien.
    link.title = req.body.title || link.title;

    link.description = req.body.descritpion || link.description;

    res.status(200).json(link);

}

// DELETE /:id
exports.deleteLinkById = (req, res) => {
    // ici on met "index" car en javascript, pour supprimer un élément dans un tableau, il faut l'index)
    const linkIndex = links.findIndex(l => l.id === parseInt(req.params.id));
    if (linkIndex === -1) {
        return res.status(404).json({ message: 'Link nor found' });
    }
    links.splice(linkIndex, 1);
    res.status(204).send();

}



