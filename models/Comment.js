const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = ({
    text: {
        type: String,
        required: [true, "Le texte du commentaire est obligatoire"],
    },
    link: {
        type: Schema.Types.ObjectId, // stocke l'ID d'un objet Link
        ref: 'Link', // Fait référence au modèle 'Link'
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.modele('Modele', ModeleSchema);