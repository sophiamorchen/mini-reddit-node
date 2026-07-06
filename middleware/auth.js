const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        /** 
        * extraire le token après Bearer : 
        * exemple de token : Bearer <token>
        * // ça donne ceci : Bearer[]bdfjovbdqmnbjajf
        * le split prend tout ce qu'il y a après l'espace
        **/
        token = req.headers.authorization.split('')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Ajoute l'utilisateur à la requête (sans le mot de passe -
        // pour rappel on l'avait deja enlevé avec le select: false (User.js), mais on le rajoute quand meme )
        req.user = await User.findById(decoded.id).select('-password');
        next();
    }
    } catch(error) {
        res.status(401).json({ message: "Non autorisé, token invalide" });
    }
    
    if (!token) {
        res.status(400).json({message: 'Non autorisé, pas de token'});
    }
};

module.exports = protect;