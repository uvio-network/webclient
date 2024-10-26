import moment from "moment";

const format = "Do MMM YYYY";
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export interface TimeItem {
  act: boolean;
  val: string;
}

export class Time {
  private mom: moment.Moment;
  private sel: moment.Moment;

  constructor(mom: moment.Moment) {
    this.mom = mom.clone().utc();
    this.sel = mom.clone().utc();
  }

  //
  //
  //

  allDays = (): TimeItem[] => {
    return Array.from({ length: this.mom.daysInMonth() }, (_, i) => {
      const day = FormatDay(i + 1);
      const mom = moment.utc(`${day} ${this.getMonth()} ${this.getYear()}`, format, true);
      const act = mom.isValid() && mom.isSameOrAfter(this.mom, "day");

      return {
        act: act,
        val: day,
      };
    });
  };

  allMonths = (): TimeItem[] => {
    return months.map((x, _) => {
      const act = this.newMonth(x).isSameOrAfter(this.mom, "month");

      return {
        act: act,
        val: x,
      };
    });
  };

  allYears = (): TimeItem[] => {
    return Array.from({ length: 11 }, (_, i) => {
      const yea = (this.mom.year() + i).toString();
      const act = this.newYear(yea).isSameOrAfter(this.mom, "year");

      return {
        act: act,
        val: yea,
      };
    });
  };

  //
  //
  //

  getDay = (mom?: moment.Moment): string => {
    if (mom) {
      return FormatDay(mom.date());
    }

    return FormatDay(this.sel.date());
  };

  getMonth = (mom?: moment.Moment): string => {
    if (mom) {
      return mom.format("MMM");
    }

    return this.sel.format("MMM");
  };

  getYear = (mom?: moment.Moment): string => {
    if (mom) {
      return mom.year().toString();
    }

    return this.sel.year().toString();
  };

  //
  //
  //

  newDay = (day: string): moment.Moment => {
    const mom = moment.utc(`${day} ${this.getMonth()} ${this.getYear()}`, format, true);

    if (mom.isValid()) {
      return mom;
    }

    return moment.utc(`1st ${this.getMonth()} ${this.getYear()}`, format).endOf("month");
  };

  newMonth = (mon: string): moment.Moment => {
    const mom = moment.utc(`${this.getDay()} ${mon} ${this.getYear()}`, format, true);

    if (mom.isValid()) {
      return mom;
    }

    return moment.utc(`1st ${mon} ${this.getYear()}`, format).endOf("month");
  };

  newYear = (yea: string): moment.Moment => {
    const sel = moment.utc(`${this.getDay()} ${this.getMonth()} ${yea}`, format, true);

    if (sel.isValid() && sel.isSameOrAfter(this.mom, "day")) {
      return sel;
    }

    const end = moment.utc(`1st ${this.getMonth()} ${yea}`, format).endOf("month");

    if (end.isValid() && end.isSameOrAfter(this.mom, "day")) {
      return end;
    }

    return this.mom.clone();
  };

  //
  //
  //

  setDay = (day: string) => {
    this.sel = this.newDay(day);
  };

  setMonth = (mon: string) => {
    this.sel = this.newMonth(mon);
  };

  setYear = (yea: string) => {
    this.sel = this.newYear(yea);
  };
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
  const num: number = moment.utc(str, format, true).unix();

  if (isNaN(num)) {
    return 0;
  }

  return num;
};
