import moment from "moment";

import * as React from "react";

import { EditorStore } from "@/modules/editor/EditorStore";
import { SelectBox } from "@/components/select/SelectBox";
import { SelectItem } from "@/components/select/SelectBox";
import { Time } from "@/modules/time/Time";
import { TimeItem } from "@/modules/time/Time";
import { useShallow } from "zustand/react/shallow";

export const EditorExpiry = () => {
  const tim = React.useMemo(() => new Time(moment().add(2, "days")), []);

  const { day, mon, yea } = EditorStore(useShallow((state) => ({
    day: state.day || tim.getDay(),
    mon: state.month || tim.getMonth(),
    yea: state.year || tim.getYear(),
  })));

  React.useEffect(() => {
    EditorStore.getState().updateDay(day);
    EditorStore.getState().updateMonth(mon);
    EditorStore.getState().updateYear(yea);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-full grid grid-cols-12 gap-2">
      <div className="col-span-4">
        <SelectBox
          onSelect={(key: string) => {
            tim.setDay(key);
            EditorStore.getState().updateDay(key);
            EditorStore.getState().updateMonth(tim.getMonth());
            EditorStore.getState().updateYear(tim.getYear());
          }}
          selected={curSel(day)}
          values={allSel(tim.allDays())}
        />
      </div>
      <div className="col-span-4">
        <SelectBox
          onSelect={(key: string) => {
            tim.setMonth(key);
            EditorStore.getState().updateDay(tim.getDay());
            EditorStore.getState().updateMonth(key);
            EditorStore.getState().updateYear(tim.getYear());
          }}
          selected={curSel(mon)}
          values={allSel(tim.allMonths())}
        />
      </div>
      <div className="col-span-4">
        <SelectBox
          onSelect={(key: string) => {
            tim.setYear(key);
            EditorStore.getState().updateDay(tim.getDay());
            EditorStore.getState().updateMonth(tim.getMonth());
            EditorStore.getState().updateYear(key);
          }}
          selected={curSel(yea)}
          values={allSel(tim.allYears())}
        />
      </div>
    </div>
  );
};

const allSel = (itm: TimeItem[]): SelectItem[] => {
  return itm.map((x) => {
    return { act: x.act, key: x.val, val: <div className="pl-2">{x.val}</div> };
  });
};

const curSel = (str: string): SelectItem => {
  return { act: true, key: str, val: <div className="p-2">{str}</div> };
};
