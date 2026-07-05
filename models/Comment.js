const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema ({
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
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    }
});

module.exports = mongoose.model('Comment', CommentSchema);