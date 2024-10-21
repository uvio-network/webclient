import moment from "moment";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export class Time {
  private mom: moment.Moment;

  constructor(mom: moment.Moment) {
    this.mom = mom.utc();
  }

  allDays(): string[] {
    const day = this.mom.daysInMonth();
    return Array.from({ length: day }, (_, i) => FormatDay(i + 1));
  }

  allMonths(): string[] {
    return months;
  }

  allYears(): string[] {
    const yea = this.mom.year();
    return Array.from({ length: 11 }, (_, i) => String(yea + i));
  }

  currentDay(): string {
    return FormatDay(this.mom.date());
  }

  currentMonth(): string {
    return this.mom.format("MMM");
  }

  currentYear(): string {
    return this.allYears()[0];
  }

  nextDay(): string {
    return FormatDay(this.mom.add(1, "day").date());
  }
};

export const FormatDay = (day: number): string => {
  const j = day % 10;
  const k = day % 100;

  let suffix = "th";
  if (j === 1 && k !== 11) {
    suffix = "st";
  } else if (j === 2 && k !== 12) {
    suffix = "nd";
  } else if (j === 3 && k !== 13) {
    suffix = "rd";
  }

  return `${day}${suffix}`;
};

export const FormatMonth = (mon: number): string => {
  return months[mon];
};

export const Unix = (str: string): number => {
  const num: number = moment.utc(str, "Do MMM YYYY", true).unix();

  if (isNaN(num)) {
    return 0;
  }

  return num;
};
