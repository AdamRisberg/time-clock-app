import round from "round-time";
import settings from "./settings";

const MILLISECONDS_IN_HOUR = 3600000;

let timeClockData = [];

function ClockData(employeeId, employeeName, clockIn, clockInAdj) {
  this.id = ClockData.getNextId();
  this.employeeId = employeeId;
  this.employeeName = employeeName;
  this.clockIn = clockIn;
  this.clockInAdj = clockInAdj;
  this.clockOut = null;
  this.clockOutAdj = null;
  this.hours = null;
}

ClockData.nextId = 0;
ClockData.getNextId = () => ClockData.nextId++;

function clockIn(employeeId, employeeName, date) {
  const roundingMethodName = "minutes" + settings.roundIn.rounding;
  let dateAdj;

  if (!date) {
    date = new Date();
  }

  if (settings.roundIn.active) {
    dateAdj = round[roundingMethodName](date, settings.roundIn.increment);
  } else {
    dateAdj = round.secondsDown(date, 60);
  }

  const clockData = Object.assign(
    {},
    new ClockData(employeeId, employeeName, date, dateAdj)
  );
  timeClockData.push(clockData);
}

function clockOut(employeeId, date) {
  const roundingMethodName = "minutes" + settings.roundOut.rounding;
  let dateAdj;

  if (!date) {
    date = new Date();
  }

  if (settings.roundOut.active) {
    dateAdj = round[roundingMethodName](date, settings.roundOut.increment);
  } else {
    dateAdj = round.secondsDown(date, 60);
  }

  const clockData = timeClockData.filter(
    (data) => data.employeeId === employeeId && data.clockOut === null
  )[0];

  clockData.clockOut = date;
  clockData.clockOutAdj = dateAdj;

  calculateHours(clockData);
}

function calculateHours(clockData) {
  const timeSpan =
    clockData.clockOutAdj.getTime() - clockData.clockInAdj.getTime();
  clockData.hours = roundToHundredths(timeSpan / MILLISECONDS_IN_HOUR);
}

function roundToHundredths(num) {
  return Math.round(num * 100) / 100;
}

function getAll(page, perPage = 10) {
  const startIdx = (page - 1) * perPage;
  const endIdx = startIdx + perPage;
  const pages = Math.ceil(timeClockData.length / perPage);

  return {
    hours: timeClockData.slice(startIdx, endIdx),
    pages,
  };
}

function remove(id) {
  timeClockData = timeClockData.filter((t) => t.id !== id);
}

function getOne(id) {
  return timeClockData.filter((t) => t.id === id)[0] || null;
}

function getByEmployee(employeeId) {
  return timeClockData.filter((t) => t.employeeId === employeeId);
}

function update(hours) {
  const found = timeClockData.filter((t) => t.id === hours.id)[0];

  if (!found) return;

  for (let key in hours) {
    if (key === "id") continue;

    found[key] = hours[key];
  }
}

export default {
  getAll,
  getOne,
  getByEmployee,
  update,
  clockIn,
  clockOut,
  remove,
};
