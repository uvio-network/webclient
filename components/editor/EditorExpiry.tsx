import moment from "moment";

import * as React from "react";

import { EditorStore } from "@/modules/editor/EditorStore";
import { SelectBox } from "@/components/select/SelectBox";
import { SelectItem } from "@/components/select/SelectBox";
import { Time } from "@/modules/time/Time";
import { useShallow } from "zustand/react/shallow";

export const EditorExpiry = () => {
  const { day, mon, yea } = EditorStore(useShallow((state) => ({
    day: state.day,
    mon: state.month,
    yea: state.year,
  })));

  const edi = EditorStore.getState();
  const tim = new Time(moment());

  React.useEffect(() => {
    if (!day) {
      edi.updateDay(tim.nextDay());
    }
  }, [day]);

  React.useEffect(() => {
    if (!mon) {
      edi.updateMonth(tim.currentMonth());
    }
  }, [mon]);

  React.useEffect(() => {
    if (!yea) {
      edi.updateYear(tim.currentYear());
    }
  }, [yea]);

  return (
    <div className="h-full grid grid-cols-12 gap-2">
      <div className="col-span-3">
        <SelectBox
          onSelect={edi.updateDay}
          selected={sinSel(day ? day.toString() : tim.nextDay())}
          values={strSel(tim.allDays())}
        />
      </div>
      <div className="col-span-3">
        <SelectBox
          onSelect={edi.updateMonth}
          selected={sinSel(mon ? mon.toString() : tim.currentMonth())}
          values={strSel(tim.allMonths())}
        />
      </div>
      <div className="col-span-6">
        <SelectBox
          onSelect={edi.updateYear}
          selected={sinSel(yea ? yea.toString() : tim.currentYear())}
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
