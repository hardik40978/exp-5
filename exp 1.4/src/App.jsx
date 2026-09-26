import React, {
  useState,
  useMemo,
  useCallback,
  Suspense,
  lazy
} from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Calendar from "./components/Calendar";

const AnalyticsPanel = lazy(
  () => import("./components/AnalyticsPanel")
);

const initialEvents = [
  {
    id: 1,
    title: "Team Meeting",
    date: "2026-08-17",
    time: "09:00",
    duration: 60,
    category: "Work",
    color: "blue",
    description: "Weekly project discussion"
  },
  {
    id: 2,
    title: "AI/ML Research",
    date: "2026-08-18",
    time: "11:00",
    duration: 90,
    category: "Research",
    color: "purple",
    description: "Research paper analysis"
  },
  {
    id: 3,
    title: "Lunch Break",
    date: "2026-08-19",
    time: "13:00",
    duration: 60,
    category: "Personal",
    color: "green",
    description: "Lunch with friends"
  },
  {
    id: 4,
    title: "React Development",
    date: "2026-08-20",
    time: "10:00",
    duration: 120,
    category: "Development",
    color: "orange",
    description: "Frontend development"
  },
  {
    id: 5,
    title: "Project Presentation",
    date: "2026-08-21",
    time: "15:00",
    duration: 60,
    category: "Work",
    color: "pink",
    description: "Final project presentation"
  },
  {
    id: 6,
    title: "DSA Practice",
    date: "2026-08-17",
    time: "16:00",
    duration: 60,
    category: "Study",
    color: "cyan",
    description: "Practice coding problems"
  }
];

function App() {
  const [events, setEvents] = useState(initialEvents);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");
  const [showAnalytics, setShowAnalytics] =
    useState(false);

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "2026-08-17",
    time: "10:00",
    category: "Work"
  });

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        event.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [events, search, selectedCategory]);

  const upcomingEvents = useMemo(() => {
    return [...filteredEvents]
      .sort((a, b) =>
        `${a.date}${a.time}`.localeCompare(
          `${b.date}${b.time}`
        )
      )
      .slice(0, 5);
  }, [filteredEvents]);

  const handleEventMove = useCallback(
    (eventId, newDate, newTime) => {
      setEvents((current) =>
        current.map((event) =>
          event.id === eventId
            ? {
                ...event,
                date: newDate,
                time: newTime
              }
            : event
        )
      );
    },
    []
  );

  const handleDeleteEvent = useCallback(
    (eventId) => {
      setEvents((current) =>
        current.filter(
          (event) => event.id !== eventId
        )
      );
    },
    []
  );

  const handleAddEvent = useCallback(
    (e) => {
      e.preventDefault();

      if (!newEvent.title.trim()) {
        alert("Please enter an event title.");
        return;
      }

      const colors = {
        Work: "blue",
        Research: "purple",
        Development: "orange",
        Study: "cyan",
        Personal: "green"
      };

      const event = {
        id: Date.now(),
        title: newEvent.title,
        date: newEvent.date,
        time: newEvent.time,
        duration: 60,
        category: newEvent.category,
        color:
          colors[newEvent.category] || "blue",
        description: "New calendar event"
      };

      setEvents((current) => [
        ...current,
        event
      ]);

      setNewEvent({
        title: "",
        date: "2026-08-17",
        time: "10:00",
        category: "Work"
      });
    },
    [newEvent]
  );

  const todayEvents = events.filter(
    (event) => event.date === "2026-08-17"
  );

  return (
    <div className="app">

      <Header
        search={search}
        setSearch={setSearch}
        showAnalytics={showAnalytics}
        setShowAnalytics={setShowAnalytics}
      />

      <div className="layout">

        <Sidebar
          newEvent={newEvent}
          setNewEvent={setNewEvent}
          handleAddEvent={handleAddEvent}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          events={events}
        />

        <main className="main-content">

          <section className="dashboard-hero">

            <div>
              <div className="welcome-label">
                MONDAY · AUGUST 17, 2026
              </div>

              <h1>
                Good morning, <span>Alex</span> 👋
              </h1>

              <p>
                Manage your schedule and stay
                productive throughout the week.
              </p>
            </div>

            <div className="hero-actions">
              <button
                className="secondary-action"
                onClick={() =>
                  setSelectedCategory("All")
                }
              >
                View all
              </button>

              <button
                className="primary-action"
                onClick={() =>
                  document
                    .getElementById("event-title")
                    ?.focus()
                }
              >
                + New event
              </button>
            </div>

          </section>

          <section className="overview-grid">

            <div className="overview-card purple-card">
              <div className="overview-icon">
                ◷
              </div>

              <div>
                <span>Today's events</span>
                <strong>{todayEvents.length}</strong>
                <small>Scheduled today</small>
              </div>
            </div>

            <div className="overview-card blue-card">
              <div className="overview-icon">
                ✓
              </div>

              <div>
                <span>Total events</span>
                <strong>{events.length}</strong>
                <small>This week</small>
              </div>
            </div>

            <div className="overview-card green-card">
              <div className="overview-icon">
                ↗
              </div>

              <div>
                <span>Focus time</span>
                <strong>6.5h</strong>
                <small>Estimated this week</small>
              </div>
            </div>

            <div className="overview-card orange-card">
              <div className="overview-icon">
                !
              </div>

              <div>
                <span>Upcoming</span>
                <strong>
                  {filteredEvents.length}
                </strong>
                <small>Events remaining</small>
              </div>
            </div>

          </section>

          <section className="dashboard-grid">

            <div className="calendar-section">

              <div className="section-title">
                <div>
                  <span>YOUR SCHEDULE</span>
                  <h2>Weekly Calendar</h2>
                </div>

                <div className="calendar-summary">
                  {filteredEvents.length} events
                </div>
              </div>

              <Calendar
                events={filteredEvents}
                onEventMove={handleEventMove}
                onDeleteEvent={handleDeleteEvent}
              />

            </div>

            <aside className="upcoming-panel">

              <div className="upcoming-header">

                <div>
                  <span>PLANNER</span>
                  <h2>Upcoming</h2>
                </div>

                <button
                  onClick={() =>
                    setSelectedCategory("All")
                  }
                >
                  View all
                </button>

              </div>

              <div className="upcoming-list">

                {upcomingEvents.length === 0 ? (
                  <div className="empty-state">
                    <div>○</div>
                    <strong>No events found</strong>
                    <p>
                      Try another search or filter.
                    </p>
                  </div>
                ) : (
                  upcomingEvents.map((event) => (
                    <div
                      className="upcoming-item"
                      key={event.id}
                    >
                      <div
                        className={`upcoming-dot ${event.color}`}
                      />

                      <div className="upcoming-content">
                        <strong>
                          {event.title}
                        </strong>

                        <span>
                          {event.date} · {event.time}
                        </span>

                        <small>
                          {event.category}
                        </small>
                      </div>
                    </div>
                  ))
                )}

              </div>

              <div className="productivity-box">

                <div className="productivity-top">
                  <span>PRODUCTIVITY</span>
                  <strong>78%</strong>
                </div>

                <div className="productivity-bar">
                  <div />
                </div>

                <p>
                  You're having a productive week.
                </p>

              </div>

            </aside>

          </section>

          {showAnalytics && (
            <Suspense
              fallback={
                <div className="loading">
                  Loading analytics...
                </div>
              }
            >
              <AnalyticsPanel events={events} />
            </Suspense>
          )}

        </main>
      </div>
    </div>
  );
}

export default App;