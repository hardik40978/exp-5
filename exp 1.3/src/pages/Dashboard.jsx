import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { permissions } from "../utils/roles";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const username = localStorage.getItem("username") || "Guest";
  const role = localStorage.getItem("role") || "viewer";

  const userPermissions = permissions[role] || [];

  const [showPostForm, setShowPostForm] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState([]);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const createPost = () => {
    if (!postTitle.trim() || !postContent.trim()) {
      alert("Please enter post title and content");
      return;
    }

    const newPost = {
      id: Date.now(),
      title: postTitle,
      content: postContent,
      author: username,
    };

    setPosts([newPost, ...posts]);

    setPostTitle("");
    setPostContent("");
    setShowPostForm(false);

    alert("Post created successfully!");
  };

  const cards = [
    {
      key: "read",
      title: "View Content",
      description: "Access available workspace content.",
      icon: "◉",
    },
    {
      key: "create",
      title: "Create Content",
      description: "Add new content to the workspace.",
      icon: "+",
    },
    {
      key: "edit",
      title: "Edit Content",
      description: "Update existing workspace content.",
      icon: "✎",
    },
    {
      key: "delete",
      title: "Delete Content",
      description: "Remove content when authorized.",
      icon: "⌫",
    },
  ];

  return (
    <div className="app-dashboard">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="sidebar-brand">
          <div className="brand-mini">J</div>

          <div>
            <strong>
              JWT<span>Flow</span>
            </strong>

            <small>ACCESS CONSOLE</small>
          </div>
        </div>

        <nav>

          <div className="nav-label">
            WORKSPACE
          </div>

          <button className="nav-item active">
            <span>⌂</span>
            Overview
          </button>

          {/* POSTS OPTION */}
          <button
            className="nav-item"
            onClick={() => setShowPostForm(true)}
          >
            <span>📝</span>
            Posts
          </button>

          <button
            className="nav-item"
            onClick={() =>
              alert("Your permissions are shown below.")
            }
          >
            <span>◈</span>
            Permissions
          </button>

        </nav>

        <div className="sidebar-footer">

          <div className="mini-avatar">
            {username[0]?.toUpperCase()}
          </div>

          <div>
            <strong>{username}</strong>
            <small>{role}</small>
          </div>

          <button onClick={logout}>
            ↗
          </button>

        </div>

      </aside>


      {/* MAIN CONTENT */}
      <main className="main-content">

        <header className="topbar">

          <div>
            <p className="eyebrow">
              OVERVIEW
            </p>

            <h1>
              Good to see you, {username}.
            </h1>

            <p className="muted">
              Here's a quick look at your account access.
            </p>
          </div>

          <button
            className="top-logout"
            onClick={logout}
          >
            Log out ↗
          </button>

        </header>


        {/* STATS */}
        <section className="stats-grid">

          <div className="stat-card">
            <span>ACCOUNT</span>

            <strong>
              {username}
            </strong>

            <small>
              Currently signed in
            </small>
          </div>


          <div className="stat-card">
            <span>ROLE</span>

            <strong className="capitalize">
              {role}
            </strong>

            <small>
              Assigned access level
            </small>
          </div>


          <div className="stat-card">
            <span>POSTS</span>

            <strong>
              {posts.length}
            </strong>

            <small>
              Posts created this session
            </small>
          </div>

        </section>


        {/* CREATE POST BUTTON */}
        <section className="posts-section">

          <div className="section-heading">

            <div>
              <p className="eyebrow">
                CONTENT
              </p>

              <h2>
                Posts
              </h2>
            </div>

            <button
              className="create-post-button"
              onClick={() => setShowPostForm(true)}
            >
              + Create Post
            </button>

          </div>


          {/* POST FORM */}
          {showPostForm && (
            <div className="post-form">

              <div className="form-header">
                <div>
                  <h3>Create a new post</h3>

                  <p>
                    Share something with your workspace.
                  </p>
                </div>

                <button
                  className="close-button"
                  onClick={() => setShowPostForm(false)}
                >
                  ×
                </button>
              </div>


              <label>
                Post Title
              </label>

              <input
                type="text"
                placeholder="Enter post title"
                value={postTitle}
                onChange={(e) =>
                  setPostTitle(e.target.value)
                }
              />


              <label>
                Post Content
              </label>

              <textarea
                placeholder="Write your post here..."
                value={postContent}
                onChange={(e) =>
                  setPostContent(e.target.value)
                }
                rows="6"
              />


              <div className="form-actions">

                <button
                  className="cancel-button"
                  onClick={() =>
                    setShowPostForm(false)
                  }
                >
                  Cancel
                </button>

                <button
                  className="publish-button"
                  onClick={createPost}
                >
                  Publish Post
                </button>

              </div>

            </div>
          )}


          {/* POSTS */}
          <div className="posts-list">

            {posts.length === 0 ? (

              <div className="empty-posts">

                <div className="empty-icon">
                  📝
                </div>

                <h3>
                  No posts yet
                </h3>

                <p>
                  Create your first post to see it here.
                </p>

                <button
                  className="create-post-button"
                  onClick={() => setShowPostForm(true)}
                >
                  + Create your first post
                </button>

              </div>

            ) : (

              posts.map((post) => (

                <article
                  className="post-card"
                  key={post.id}
                >

                  <div className="post-card-top">

                    <div>
                      <h3>
                        {post.title}
                      </h3>

                      <small>
                        Posted by {post.author}
                      </small>
                    </div>

                    <span className="post-status">
                      Published
                    </span>

                  </div>

                  <p>
                    {post.content}
                  </p>

                </article>

              ))

            )}

          </div>

        </section>


        {/* PERMISSIONS */}
        <section className="permissions-section">

          <div className="section-heading">

            <div>
              <p className="eyebrow">
                ACCESS CONTROL
              </p>

              <h2>
                Your permissions
              </h2>
            </div>

            <span className="permission-count">
              {userPermissions.length} enabled
            </span>

          </div>


          <div className="permission-grid">

            {cards.map((card) =>
              userPermissions.includes(card.key) ? (

                <article
                  className="permission-card"
                  key={card.key}
                >

                  <div className="permission-icon">
                    {card.icon}
                  </div>

                  <div className="permission-copy">

                    <div className="enabled">
                      ENABLED
                    </div>

                    <h3>
                      {card.title}
                    </h3>

                    <p>
                      {card.description}
                    </p>

                  </div>

                  <span className="card-arrow">
                    →
                  </span>

                </article>

              ) : null
            )}

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;