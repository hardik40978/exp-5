import React from "react";

function Header({
  search,
  setSearch,
  showAnalytics,
  setShowAnalytics
}) {
  return (
    <header className="header">

      <div className="brand">

        <div className="brand-icon">
          P
        </div>

        <div className="brand-text">
          <h2>Planora</h2>
          <span>Smart productivity</span>
        </div>

      </div>

      <nav className="top-navigation">

        <button className="nav-item active">
          Dashboard
        </button>

        <button className="nav-item">
          Calendar
        </button>

        <button className="nav-item">
          Tasks
        </button>

      </nav>

      <div className="header-actions">

        <div className="search-box">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <kbd>Ctrl K</kbd>
        </div>

        <button
          className={`analytics-btn ${
            showAnalytics ? "active" : ""
          }`}
          onClick={() =>
            setShowAnalytics(!showAnalytics)
          }
        >
          ◉ Analytics
        </button>

        <button className="notification">
          ♢
          <i />
        </button>

        <div className="avatar">
          A
        </div>

      </div>

    </header>
  );
}

export default React.memo(Header);