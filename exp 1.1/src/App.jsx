import { useState } from "react";
import "./App.css";

function App() {
  const [post, setPost] = useState("");
  const [platform, setPlatform] = useState("Twitter");
  const [drafts, setDrafts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const MAX_CHARACTERS = 280;

  // Save or update a draft
  function saveDraft() {
    if (post.trim() === "") {
      alert("Please write something before saving!");
      return;
    }

    if (post.length > MAX_CHARACTERS) {
      alert(`Post cannot exceed ${MAX_CHARACTERS} characters.`);
      return;
    }

    if (editingId !== null) {
      setDrafts(
        drafts.map((draft) =>
          draft.id === editingId
            ? {
                ...draft,
                platform,
                post,
              }
            : draft
        )
      );

      setEditingId(null);
    } else {
      const newDraft = {
        id: Date.now(),
        platform,
        post,
        createdAt: new Date().toLocaleString(),
      };

      setDrafts([...drafts, newDraft]);
    }

    clearComposer();
  }

  // Edit a draft
  function editDraft(draft) {
    setPlatform(draft.platform);
    setPost(draft.post);
    setEditingId(draft.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Delete a draft
  function deleteDraft(id) {
    setDrafts(drafts.filter((draft) => draft.id !== id));

    if (editingId === id) {
      clearComposer();
    }
  }

  // Delete all drafts
  function clearAllDrafts() {
    if (drafts.length === 0) {
      alert("There are no drafts to delete.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete all drafts?"
    );

    if (confirmDelete) {
      setDrafts([]);
      clearComposer();
    }
  }

  // Cancel editing
  function cancelEdit() {
    clearComposer();
  }

  // Clear composer
  function clearComposer() {
    setEditingId(null);
    setPost("");
    setPlatform("Twitter");
  }

  // Dashboard counts
  const twitterCount = drafts.filter(
    (draft) => draft.platform === "Twitter"
  ).length;

  const linkedinCount = drafts.filter(
    (draft) => draft.platform === "LinkedIn"
  ).length;

  const instagramCount = drafts.filter(
    (draft) => draft.platform === "Instagram"
  ).length;

  const totalDrafts = drafts.length;

  // Word count
  const wordCount =
    post.trim() === "" ? 0 : post.trim().split(/\s+/).length;

  // Search drafts
  const filteredDrafts = drafts.filter((draft) =>
    draft.post.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>🌐 Social Media Post Composer</h1>

      <p>
        Create, edit and manage your social media post drafts in one place.
      </p>

      {/* Dashboard */}
      <div className="dashboard">
        <div className="dashboard-card">
          <h3>🐦 Twitter</h3>
          <h2>{twitterCount}</h2>
        </div>

        <div className="dashboard-card">
          <h3>💼 LinkedIn</h3>
          <h2>{linkedinCount}</h2>
        </div>

        <div className="dashboard-card">
          <h3>📷 Instagram</h3>
          <h2>{instagramCount}</h2>
        </div>

        <div className="dashboard-card total">
          <h3>📄 Total Drafts</h3>
          <h2>{totalDrafts}</h2>
        </div>
      </div>

      {/* Composer */}
      <div className="composer">
        <label>Select Platform</label>

        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <option value="Twitter">Twitter</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Instagram">Instagram</option>
        </select>

        <textarea
          rows="8"
          placeholder="Write your post here..."
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />

        <div className="counter">
          <span>
            Characters: <b>{post.length}</b> / {MAX_CHARACTERS}
          </span>

          <span>
            Words: <b>{wordCount}</b>
          </span>
        </div>

        {post.length > MAX_CHARACTERS && (
          <p className="warning">
            ⚠️ Your post is too long. Please reduce the number of characters.
          </p>
        )}

        <div className="composer-actions">
          <button onClick={saveDraft}>
            {editingId !== null ? "💾 Update Draft" : "💾 Save Draft"}
          </button>

          {editingId !== null && (
            <button className="btn-cancel" onClick={cancelEdit}>
              ❌ Cancel
            </button>
          )}
        </div>
      </div>

      {/* Saved Drafts */}
      <div className="draft-header">
        <h2>📂 Saved Drafts</h2>

        {drafts.length > 0 && (
          <button className="btn-delete-all" onClick={clearAllDrafts}>
            🗑 Clear All
          </button>
        )}
      </div>

      {/* Search */}
      {drafts.length > 0 && (
        <input
          type="text"
          className="search-box"
          placeholder="🔍 Search your drafts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}

      {drafts.length === 0 ? (
        <p className="empty">No drafts available. Create your first post!</p>
      ) : filteredDrafts.length === 0 ? (
        <p className="empty">No drafts match your search.</p>
      ) : (
        filteredDrafts.map((draft, index) => (
          <div className="card" key={draft.id}>
            <h3>📄 Draft {index + 1}</h3>

            <div className="platform">
              📱 {draft.platform}
            </div>

            <p className="draft-text">{draft.post}</p>

            <small>
              Created: {draft.createdAt}
            </small>

            <div className="card-actions">
              <button
                className="btn-edit"
                onClick={() => editDraft(draft)}
              >
                ✏️ Edit
              </button>

              <button
                className="btn-delete"
                onClick={() => deleteDraft(draft.id)}
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
