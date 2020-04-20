import React from "react";
import database from "../database";
import "./TimeClock.css";

function Clock() {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="TimeClock-time">{time && time.toLocaleTimeString()}</div>
  );
}

function TimeClock({ employeeId = 1 }) {
  const [project, setProject] = React.useState("Standard Work");
  const [working, setWorking] = React.useState(false);

  function handleClockOut() {
    database.clockOut(employeeId);
    setWorking(false);
    console.log(database.getAllTimeClockData());
  }

  function handleClockIn() {
    database.clockIn(employeeId);
    setWorking(true);
    console.log(database.getAllTimeClockData());
  }

  return (
    <div className="TimeClock">
      <Clock />
      <select
        onChange={(e) => setProject(e.target.value)}
        value={project}
        className="TimeClock-project-select"
        disabled={working}
      >
        <option>Select project...</option>
        <option>Standard Work</option>
        <option>Maintanence</option>
      </select>
      <div className="TimeClock-controls">
        <button
          onClick={handleClockIn}
          className="TimeClock-btn"
          disabled={working}
        >
          Clock In
        </button>
        <button
          onClick={handleClockOut}
          className="TimeClock-btn"
          disabled={!working}
        >
          Clock Out
        </button>
      </div>
    </div>
  );
}

export default TimeClock;
