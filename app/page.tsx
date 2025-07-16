"use client";

import { useEffect, useState } from 'react';

type Todo = {
  _id: string;
  titre: string;
  description?: string;
  statut: string;
  dateEcheance?: string;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [form, setForm] = useState({
    titre: '',
    description: '',
    statut: 'en attente',
  });
  const [editId, setEditId] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatut, setFilterStatut] = useState('');

  const fetchTodos = async () => {
    const res = await fetch('/api/todos');
    const data = await res.json();
    setTodos(data);
  };

  const handleSubmit = async () => {
    if (!form.titre.trim()) return;

    if (editId) {
      await fetch(`/api/todos/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setEditId(null);
    } else {
      await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }

    setForm({ titre: '', description: '', statut: 'en attente' });
    fetchTodos();
  };

  const handleEdit = (todo: Todo) => {
    setEditId(todo._id);
    setForm({
      titre: todo.titre,
      description: todo.description || '',
      statut: todo.statut,
    });
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    fetchTodos();
  };

  const filteredTodos = todos.filter((todo) => {
    const matchSearch =
      todo.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatut = filterStatut ? todo.statut === filterStatut : true;
    return matchSearch && matchStatut;
  });

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <main className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">📝 Gestionnaire de Tâches</h1>

      {/* Formulaire */}
      <div className="bg-white rounded-xl shadow p-6 mb-8 space-y-4">
        <input
          type="text"
          value={form.titre}
          onChange={(e) => setForm({ ...form, titre: e.target.value })}
          placeholder="Titre de la tâche"
          className="w-full border p-2 rounded border-black placeholder:text-gray-500 text-black"
        />
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Description"
          className="w-full border p-2 rounded border-black placeholder:text-gray-500 text-black"
        />
        <select
          value={form.statut}
          onChange={(e) => setForm({ ...form, statut: e.target.value })}
          className="w-full border p-2 rounded border-black text-black"
        >
          <option value="en attente" className="text-black">⏳ En attente</option>
          <option value="en cours" className="text-black">🚧 En cours</option>
          <option value="terminé" className="text-black">✅ Terminé</option>
        </select>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {editId ? '✅ Mettre à jour' : '➕ Ajouter'}
        </button>
      </div>

      {/* Zone de recherche + filtre */}
      <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="🔍 Rechercher une tâche"
          className="w-full sm:flex-1 border p-2 rounded border-white placeholder:text-gray-500 text-white"
        />

        <select
          value={filterStatut}
          onChange={(e) => setFilterStatut(e.target.value)}
          className="w-full sm:w-48 border p-2 rounded border-black text-white"
        >
          <option value="">📂 Tous les statuts</option>
          <option value="en attente" className="text-black">⏳ En attente</option>
          <option value="en cours" className="text-black">🚧 En cours</option>
          <option value="terminé" className="text-black">✅ Terminé</option>
        </select>
      </div>

      {/* Liste des tâches */}
      <ul className="space-y-4">
        {filteredTodos.map((todo) => (
          <li
            key={todo._id}
            className="bg-white shadow rounded-xl p-4 flex justify-between items-start"
          >
            <div>
              <h2 className="text-black font-semibold text-lg">{todo.titre}</h2>
              {todo.description && <p className="text-sm text-gray-600">{todo.description}</p>}
              <span
                className={`inline-block mt-2 text-xs font-semibold px-2 py-1 rounded ${todo.statut === 'terminé'
                  ? 'bg-green-100 text-green-700'
                  : todo.statut === 'en cours'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-200 text-gray-700'
                  }`}
              >
                {todo.statut}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(todo)}
                className="text-blue-500 hover:text-blue-700 text-sm"
              >
                ✏️
              </button>
              <button
                onClick={() => handleDelete(todo._id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
        {filteredTodos.length === 0 && (
          <li className="text-center text-gray-500">Aucune tâche trouvée.</li>
        )}
      </ul>
    </main>
  );
}

