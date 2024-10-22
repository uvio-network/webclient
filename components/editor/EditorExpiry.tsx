import moment from "moment";

import * as React from "react";

import { EditorStore } from "@/modules/editor/EditorStore";
import { SelectBox } from "@/components/select/SelectBox";
import { SelectItem } from "@/components/select/SelectBox";
import { Time } from "@/modules/time/Time";
import { useShallow } from "zustand/react/shallow";

export const EditorExpiry = () => {
  const tim = new Time(moment());

  const { day, mon, yea } = EditorStore(useShallow((state) => ({
    day: state.day || tim.nextDay(),
    mon: state.month || tim.currentMonth(),
    yea: state.year || tim.currentYear(),
  })));

  React.useEffect(() => {
    EditorStore.getState().updateDay(day);
    EditorStore.getState().updateMonth(mon);
    EditorStore.getState().updateYear(yea);
  }, [day, mon, yea]);

  return (
    <div className="h-full grid grid-cols-12 gap-2">
      <div className="col-span-3">
        <SelectBox
          onSelect={EditorStore.getState().updateDay}
          selected={sinSel(day.toString())}
          values={strSel(tim.allDays())}
        />
      </div>
      <div className="col-span-3">
        <SelectBox
          onSelect={EditorStore.getState().updateMonth}
          selected={sinSel(mon.toString())}
          values={strSel(tim.allMonths())}
        />
      </div>
      <div className="col-span-6">
        <SelectBox
          onSelect={EditorStore.getState().updateYear}
          selected={sinSel(yea.toString())}
          values={strSel(tim.allYears())}
        />
      </div>
    </div>
  );
};

const sinSel = (str: string): SelectItem => {
  return { key: str, val: <>{str}</> };
};

const strSel = (str: string[]): SelectItem[] => {
  return str.map((x) => sinSel(x));
};
