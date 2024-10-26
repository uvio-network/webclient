import moment from "moment";

import { Time } from "@/modules/time/Time";
import { TimeItem } from "@/modules/time/Time";
import { Unix } from "@/modules/time/Time";

describe("Time", () => {
  describe("1723895522", () => {
    const tim: Time = new Time(moment.unix(1723895522));

    test("allDays", () => {
      const day: TimeItem[] = tim.allDays();
      expect(day).toHaveLength(31);
      expect(day).toEqual([
        { "act": false, "val": "1st" },
        { "act": false, "val": "2nd" },
        { "act": false, "val": "3rd" },
        { "act": false, "val": "4th" },
        { "act": false, "val": "5th" },
        { "act": false, "val": "6th" },
        { "act": false, "val": "7th" },
        { "act": false, "val": "8th" },
        { "act": false, "val": "9th" },
        { "act": false, "val": "10th" },
        { "act": false, "val": "11th" },
        { "act": false, "val": "12th" },
        { "act": false, "val": "13th" },
        { "act": false, "val": "14th" },
        { "act": false, "val": "15th" },
        { "act": false, "val": "16th" },
        { "act": true, "val": "17th" },
        { "act": true, "val": "18th" },
        { "act": true, "val": "19th" },
        { "act": true, "val": "20th" },
        { "act": true, "val": "21st" },
        { "act": true, "val": "22nd" },
        { "act": true, "val": "23rd" },
        { "act": true, "val": "24th" },
        { "act": true, "val": "25th" },
        { "act": true, "val": "26th" },
        { "act": true, "val": "27th" },
        { "act": true, "val": "28th" },
        { "act": true, "val": "29th" },
        { "act": true, "val": "30th" },
        { "act": true, "val": "31st" },
      ]);
    });

    test("allMonths", () => {
      const mon: TimeItem[] = tim.allMonths();
      expect(mon).toHaveLength(12);
      expect(mon).toEqual([
        { "act": false, "val": "Jan" },
        { "act": false, "val": "Feb" },
        { "act": false, "val": "Mar" },
        { "act": false, "val": "Apr" },
        { "act": false, "val": "May" },
        { "act": false, "val": "Jun" },
        { "act": false, "val": "Jul" },
        { "act": true, "val": "Aug" },
        { "act": true, "val": "Sep" },
        { "act": true, "val": "Oct" },
        { "act": true, "val": "Nov" },
        { "act": true, "val": "Dec" },
      ]);
    });

    test("allYears", () => {
      const yea: TimeItem[] = tim.allYears();
      expect(yea).toHaveLength(11);
      expect(yea).toEqual([
        { "act": true, "val": "2024" },
        { "act": true, "val": "2025" },
        { "act": true, "val": "2026" },
        { "act": true, "val": "2027" },
        { "act": true, "val": "2028" },
        { "act": true, "val": "2029" },
        { "act": true, "val": "2030" },
        { "act": true, "val": "2031" },
        { "act": true, "val": "2032" },
        { "act": true, "val": "2033" },
        { "act": true, "val": "2034" },
      ]);
    });

    test("getDay", () => {
      const day: string = tim.getDay();
      expect(day).toEqual("17th");
    });

    test("getMonth", () => {
      const mon: string = tim.getMonth();
      expect(mon).toEqual("Aug");
    });

    test("getYear", () => {
      const yea: string = tim.getYear();
      expect(yea).toEqual("2024");
    });
  });
});

describe("Unix", () => {
  test(`""`, () => {
    const uni: number = Unix("");
    expect(uni).toEqual(0);
  });

  test(`"  "`, () => {
    const uni: number = Unix("  ");
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
    expect(uni).toEqual(1723852800);
  });
});
