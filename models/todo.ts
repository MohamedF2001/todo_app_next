import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    description: String,
    statut: { type: String, enum: ['en attente', 'en cours', 'terminé'], default: 'en attente' },
    dateEcheance: Date,
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Todo || mongoose.model('Todo', TodoSchema);
