const ROUNDING = {
  UP: "Up",
  DOWN: "Down",
  NEAREST: "Nearest",
};

const DATE_FORMAT = {
  MONTH_FIRST: "month_first",
  DAY_FIRST: "day_first",
};

const TIME_FORMAT = {
  STANDARD: 12,
  MILITARY: 24,
};

export default {
  lunch: {
    active: true,
    startTime: "",
    endTime: "",
  },
  roundIn: {
    active: true,
    increment: 5,
    rounding: ROUNDING.NEAREST,
  },
  roundOut: {
    active: true,
    increment: 5,
    rounding: ROUNDING.NEAREST,
  },
  dateFormat: DATE_FORMAT.DAY_FIRST,
  timeFormat: TIME_FORMAT.STANDARD,
  timeZone: "",
};
