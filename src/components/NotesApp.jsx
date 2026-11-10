import { useState, useEffect } from "react";

export default function NotesApp() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    if (editId) {
      setNotes(notes.map(n => (n.id === editId ? { ...n, title, content } : n)));
      setEditId(null);
    } else {
      const newNote = {
        id: Date.now(),
        title,
        content,
        timestamp: new Date().toLocaleDateString()
      };
      setNotes([...notes, newNote]);
    }
    setTitle("");
    setContent("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  const startEdit = (note) => {
    setEditId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  return (
    <div className="app-card">
      <h2>Notes Application</h2>
      <form onSubmit={handleSubmit} className="note-form">
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Note Content"
          rows="3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">{editId ? "Update Note" : "Save Note"}</button>
      </form>

      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note.id} className="note-box">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <small>{note.timestamp}</small>
            <div className="btn-actions">
              <button onClick={() => startEdit(note)}>Edit</button>
              <button onClick={() => deleteNote(note.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}