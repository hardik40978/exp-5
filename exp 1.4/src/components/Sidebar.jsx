import React from "react";

const categories = [
  {
    name: "Work",
    color: "blue"
  },
  {
    name: "Research",
    color: "purple"
  },
  {
    name: "Development",
    color: "orange"
  },
  {
    name: "Study",
    color: "cyan"
  },
  {
    name: "Personal",
    color: "green"
  }
];

function Sidebar({
  newEvent,
  setNewEvent,
  handleAddEvent,
  selectedCategory,
  setSelectedCategory,
  events
}) {
  return (
    <aside className="sidebar">

      <button
        className="add-button"
        onClick={() =>
          document
            .getElementById("event-title")
            ?.focus()
        }
      >
        <span>+</span>
        Create new event
      </button>

      <div className="side-section">

        <h3>WORKSPACE</h3>

        <button className="side-link active">
          <span>⌂</span>
          Dashboard
        </button>

        <button className="side-link">
          <span>□</span>
          My Calendar
        </button>

        <button className="side-link">
          <span>◷</span>
          Upcoming
        </button>

        <button className="side-link">
          <span>✓</span>
          Completed
        </button>

      </div>

      <div className="side-section">

        <div className="section-heading">
          <h3>MY CALENDARS</h3>
          <button>+</button>
        </div>

        <button
          className={`category-link ${
            selectedCategory === "All"
              ? "selected"
              : ""
          }`}
          onClick={() =>
            setSelectedCategory("All")
          }
        >
          <span className="dot all" />
          <span>All events</span>

          <small>{events.length}</small>
        </button>

        {categories.map((category) => (
          <button
            key={category.name}
            className={`category-link ${
              selectedCategory === category.name
                ? "selected"
                : ""
            }`}
            onClick={() =>
              setSelectedCategory(category.name)
            }
          >
            <span
              className={`dot ${category.color}`}
            />

            <span>{category.name}</span>

            <small>
              {
                events.filter(
                  (event) =>
                    event.category ===
                    category.name
                ).length
              }
            </small>
          </button>
        ))}

      </div>

      <div className="quick-add">

        <div className="quick-add-header">

          <div>
            <span>QUICK ADD</span>
            <strong>Create event</strong>
          </div>

          <div className="plus-circle">
            +
          </div>

        </div>

        <form onSubmit={handleAddEvent}>

          <input
            id="event-title"
            type="text"
            placeholder="What are you planning?"
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({
                ...newEvent,
                title: e.target.value
              })
            }
          />

          <div className="form-row">

            <input
              type="date"
              value={newEvent.date}
              onChange={(e) =>
                setNewEvent({
                  ...newEvent,
                  date: e.target.value
                })
              }
            />

            <input
              type="time"
              value={newEvent.time}
              onChange={(e) =>
                setNewEvent({
                  ...newEvent,
                  time: e.target.value
                })
              }
            />

          </div>

          <select
            value={newEvent.category}
            onChange={(e) =>
              setNewEvent({
                ...newEvent,
                category: e.target.value
              })
            }
          >
            <option>Work</option>
            <option>Research</option>
            <option>Development</option>
            <option>Study</option>
            <option>Personal</option>
          </select>

          <button
            className="quick-add-button"
            type="submit"
          >
            Add to calendar
          </button>

        </form>

      </div>

      <div className="sidebar-profile">

        <div className="profile-avatar">
          A
        </div>

        <div>
          <strong>Alex</strong>
          <span>Personal workspace</span>
        </div>

        <button>•••</button>

      </div>

    </aside>
  );
}

export default React.memo(Sidebar);