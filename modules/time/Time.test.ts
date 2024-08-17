import moment from "moment";

import { Time } from "@/modules/time/Time";
import { Unix } from "@/modules/time/Time";

describe("Time", () => {
  describe("1723895522", () => {
    const tim: Time = new Time(moment.unix(1723895522));

    test("allDays", () => {
      const day: string[] = tim.allDays();
      expect(day).toHaveLength(31);
      expect(day).toEqual(["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th", "21st", "22nd", "23rd", "24th", "25th", "26th", "27th", "28th", "29th", "30th", "31st"]);
    });

    test("allMonths", () => {
      const mon: string[] = tim.allMonths();
      expect(mon).toHaveLength(12);
      expect(mon).toEqual(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);
    });

    test("allYears", () => {
      const yea: string[] = tim.allYears();
      expect(yea).toHaveLength(11);
      expect(yea).toEqual(["2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033", "2034"]);
    });

    test("currentDay", () => {
      const day: string = tim.currentDay();
      expect(day).toEqual("17th");
    });

    test("currentMonth", () => {
      const mon: string = tim.currentMonth();
      expect(mon).toEqual("Aug");
    });

    test("currentYear", () => {
      const yea: string = tim.currentYear();
      expect(yea).toEqual("2024");
    });
  });
});

describe("Unix", () => {
  test(`""`, () => {
    const uni: number = Unix("");
    expect(uni).toEqual(0);
  });

  test("17th", () => {
    const uni: number = Unix("17th");
    expect(uni).toEqual(0);
  });

  test("Aug", () => {
    const uni: number = Unix("Aug");
    expect(uni).toEqual(0);
  });

  test("2024", () => {
    const uni: number = Unix("2024");
    expect(uni).toEqual(0);
  });

  test("Aug 2024", () => {
    const uni: number = Unix("Aug 2024");
    expect(uni).toEqual(0);
  });

  test("17th 2024", () => {
    const uni: number = Unix("17th 2024");
    expect(uni).toEqual(0);
  });

  test("17th Aug", () => {
    const uni: number = Unix("17th Aug");
    expect(uni).toEqual(0);
  });

  test("17th Aug 2024", () => {
    const uni: number = Unix("17th Aug 2024");
    expect(uni).toEqual(1723845600);
  });
});
