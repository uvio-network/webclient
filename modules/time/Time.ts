import moment from "moment";

export class Time {
  private mom: moment.Moment;

  constructor(mom: moment.Moment) {
    this.mom = mom.utc();
  }

  allDays(): string[] {
    const day = this.mom.daysInMonth();
    return Array.from({ length: day }, (_, i) => format(i + 1));
  }

  allMonths(): string[] {
    return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  }

  allYears(): string[] {
    const yea = this.mom.year();
    return Array.from({ length: 11 }, (_, i) => String(yea + i));
  }

  currentDay(): string {
    return format(this.mom.date());
  }

  currentMonth(): string {
    return this.mom.format("MMM");
  }

  currentYear(): string {
    return this.allYears()[0];
  }
};

export const Unix = (str: string): number => {
  const num: number = moment(str, "Do MMM YYYY", true).utc().unix();

  if (isNaN(num)) {
    return 0;
  }

  return num;
};

const format = (day: number): string => {
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
