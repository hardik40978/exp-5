import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const limits = {
    Twitter: 280,
    LinkedIn: 3000,
    Instagram: 2200,
  };

  const icons = {
    Twitter: "🐦",
    LinkedIn: "💼",
    Instagram: "📸",
  };

  const [platform, setPlatform] = useState("Twitter");
  const [post, setPost] = useState("");
  const [drafts, setDrafts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const limit = limits[platform];
  const progress = (post.length / limit) * 100;

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("drafts"));
    if (saved) setDrafts(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("drafts", JSON.stringify(drafts));
  }, [drafts]);

  const saveDraft = () => {
    if (!post.trim()) return;

    if (editingId) {
      setDrafts(
        drafts.map((d) =>
          d.id === editingId
            ? { ...d, platform, content: post }
            : d
        )
      );
      setEditingId(null);
    } else {
      setDrafts([
        ...drafts,
        {
          id: Date.now(),
          platform,
          content: post,
        },
      ]);
    }

    setPost("");
  };

  const editDraft = (draft) => {
    setPlatform(draft.platform);
    setPost(draft.content);
    setEditingId(draft.id);
  };

  const deleteDraft = (id) => {
    setDrafts(drafts.filter((d) => d.id !== id));
  };

  return (
    <div className="app">

      <div className="container">

        <h1>Social Media Post Composer</h1>

        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <option>Twitter</option>
          <option>LinkedIn</option>
          <option>Instagram</option>
        </select>

        <textarea
          placeholder="Write your amazing post here..."
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />

        <div className="progress">
          <div
            className="progress-fill"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>

        <p className="counter">
          {post.length} / {limit}
        </p>

        <button onClick={saveDraft}>
          {editingId ? "Update Draft" : "Save Draft"}
        </button>

        <h2>Saved Drafts</h2>

        {drafts.length === 0 ? (
          <div className="empty">
            No Drafts Yet
          </div>
        ) : (
          drafts.map((draft) => (
            <div className="card" key={draft.id}>
              <div className="card-top">
                <h3>
                  {icons[draft.platform]} {draft.platform}
                </h3>
              </div>

              <p>{draft.content}</p>

              <div className="actions">
                <button
                  className="edit"
                  onClick={() => editDraft(draft)}
                >
                  ✏ Edit
                </button>

                <button
                  className="delete"
                  onClick={() => deleteDraft(draft.id)}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;