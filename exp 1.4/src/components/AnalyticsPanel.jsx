import React, { useMemo } from "react";

function AnalyticsPanel({ events }) {
  const analytics = useMemo(() => {
    const categories = {};

    events.forEach((event) => {
      categories[event.category] =
        (categories[event.category] || 0) + 1;
    });

    return categories;
  }, [events]);

  return (
    <div className="analytics-panel">
      <div className="analytics-header">
        <div>
          <p className="eyebrow">PERFORMANCE MONITOR</p>
          <h3>Calendar Analytics</h3>
        </div>

        <span className="performance-badge">
          ● Optimized
        </span>
      </div>

      <div className="analytics-grid">
        <div className="metric">
          <span>Total Events</span>
          <strong>{events.length}</strong>
          <small>calendar events</small>
        </div>

        <div className="metric">
          <span>Memoization</span>
          <strong>ON</strong>
          <small>React.memo</small>
        </div>

        <div className="metric">
          <span>Optimization</span>
          <strong>3</strong>
          <small>React hooks</small>
        </div>

        <div className="metric">
          <span>Lazy Loading</span>
          <strong>ON</strong>
          <small>code splitting</small>
        </div>
      </div>

      <div className="category-analysis">
        {Object.entries(analytics).map(
          ([category, count]) => (
            <div className="analysis-row" key={category}>
              <span>{category}</span>

              <div className="progress">
                <div
                  style={{
                    width: `${Math.min(count * 20, 100)}%`
                  }}
                />
              </div>

              <strong>{count}</strong>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default React.memo(AnalyticsPanel);