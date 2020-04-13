import React from "react";
import "./TimeClock.css";

function TimeClock() {
  const [time, setTime] = React.useState(new Date());
  const [working, setWorking] = React.useState(false);

  React.useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="TimeClock">
      <div className="TimeClock-time">{time && time.toLocaleTimeString()}</div>
      <div className="TimeClock-controls">
        <button className="TimeClock-btn" disabled={working}>
          Clock In
        </button>
        <button className="TimeClock-btn" disabled={!working}>
          Clock Out
        </button>
      </div>
    </div>
  );
}

export default TimeClock;
