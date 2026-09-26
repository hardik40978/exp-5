import React, {
  useMemo,
  useState,
  useCallback
} from "react";

import EventCard from "./EventCard";

const days = [
  {
    date: "2026-08-17",
    name: "MON",
    number: "17"
  },
  {
    date: "2026-08-18",
    name: "TUE",
    number: "18"
  },
  {
    date: "2026-08-19",
    name: "WED",
    number: "19"
  },
  {
    date: "2026-08-20",
    name: "THU",
    number: "20"
  },
  {
    date: "2026-08-21",
    name: "FRI",
    number: "21"
  },
  {
    date: "2026-08-22",
    name: "SAT",
    number: "22"
  },
  {
    date: "2026-08-23",
    name: "SUN",
    number: "23"
  }
];

const hours = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00"
];

function Calendar({
  events,
  onEventMove,
  onDeleteEvent
}) {
  const [draggedEvent, setDraggedEvent] =
    useState(null);

  const eventsBySlot = useMemo(() => {
    const map = {};

    events.forEach((event) => {
      const key =
        `${event.date}-${event.time}`;

      if (!map[key]) {
        map[key] = [];
      }

      map[key].push(event);
    });

    return map;
  }, [events]);

  const handleDragStart = useCallback(
    (eventId) => {
      setDraggedEvent(eventId);
    },
    []
  );

  const handleDrop = useCallback(
    (date, time) => {
      if (draggedEvent === null) return;

      onEventMove(
        draggedEvent,
        date,
        time
      );

      setDraggedEvent(null);
    },
    [draggedEvent, onEventMove]
  );

  return (
    <section className="calendar-wrapper">

      <div className="calendar-toolbar">

        <div className="calendar-left">

          <button className="today-button">
            Today
          </button>

          <button className="arrow-button">
            ‹
          </button>

          <button className="arrow-button">
            ›
          </button>

        </div>

        <div className="calendar-title">
          <strong>
            August 17 – 23
          </strong>
          <span>2026</span>
        </div>

        <select className="view-select">
          <option>Week</option>
          <option>Day</option>
          <option>Month</option>
        </select>

      </div>

      <div className="calendar">

        <div className="calendar-head">

          <div className="time-head">
            GMT +5:30
          </div>

          {days.map((day) => (
            <div
              className="day-head"
              key={day.date}
            >
              <span>{day.name}</span>

              <strong
                className={
                  day.number === "17"
                    ? "today-circle"
                    : ""
                }
              >
                {day.number}
              </strong>
            </div>
          ))}

        </div>

        <div className="calendar-body">

          <div className="time-column">

            {hours.map((hour) => (
              <div
                className="time-label"
                key={hour}
              >
                {hour}
              </div>
            ))}

          </div>

          <div className="days-grid">

            {days.map((day) => (
              <div
                className="day-column"
                key={day.date}
              >

                {hours.map((hour) => {

                  const slotEvents =
                    eventsBySlot[
                      `${day.date}-${hour}`
                    ] || [];

                  return (
                    <div
                      className="time-slot"
                      key={`${day.date}-${hour}`}
                      onDragOver={(e) =>
                        e.preventDefault()
                      }
                      onDrop={() =>
                        handleDrop(
                          day.date,
                          hour
                        )
                      }
                    >
                      {slotEvents.map(
                        (event) => (
                          <EventCard
                            key={event.id}
                            event={event}
                            onDragStart={
                              handleDragStart
                            }
                            onDelete={
                              onDeleteEvent
                            }
                          />
                        )
                      )}
                    </div>
                  );
                })}

              </div>
            ))}

          </div>

        </div>

      </div>

      <div className="drag-hint">
        <span>↕</span>
        Drag and drop events to reschedule
      </div>

    </section>
  );
}

export default React.memo(Calendar);