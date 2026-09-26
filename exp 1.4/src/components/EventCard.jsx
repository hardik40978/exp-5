import React, { useState } from "react";

function EventCard({
  event,
  onDragStart,
  onDelete
}) {
  const [showMenu, setShowMenu] =
    useState(false);

  return (
    <div
      className={`event-card ${event.color}`}
      draggable
      onDragStart={() =>
        onDragStart(event.id)
      }
    >

      <div className="event-accent" />

      <div className="event-card-content">

        <div className="event-top">

          <strong>
            {event.title}
          </strong>

          <button
            className="event-more"
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
          >
            •••
          </button>

        </div>

        <div className="event-time">
          ◷ {event.time}
        </div>

        <p>
          {event.description}
        </p>

        <span className="event-category">
          {event.category}
        </span>

      </div>

      {showMenu && (
        <div className="event-menu">

          <button
            onClick={() =>
              onDelete(event.id)
            }
          >
            Delete event
          </button>

        </div>
      )}

    </div>
  );
}

export default React.memo(EventCard);