/* import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
 */

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
          <option value="en attente">⏳ En attente</option>
          <option value="en cours">🚧 En cours</option>
          <option value="terminé">✅ Terminé</option>
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
          <option value="en attente">⏳ En attente</option>
          <option value="en cours">🚧 En cours</option>
          <option value="terminé">✅ Terminé</option>
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

