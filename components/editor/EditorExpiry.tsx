import moment from "moment";

import { EditorStore } from "@/modules/editor/EditorStore";
import { SelectBox, SelectItem } from "@/components/select/SelectBox";
import { Time } from "@/modules/time/Time";

export const EditorExpiry = () => {
  const editor = EditorStore.getState();

  const time: Time = new Time(moment());

  return (
    <div className="h-full grid grid-cols-12 gap-2">
      <div className="col-span-3">
        <SelectBox
          onSelect={editor.updateDay}
          selected={sinSel(time.currentDay())}
          values={strSel(time.allDays())}
        />
      </div>
      <div className="col-span-3">
        <SelectBox
          onSelect={editor.updateMonth}
          selected={sinSel(time.currentMonth())}
          values={strSel(time.allMonths())}
        />
      </div>
      <div className="col-span-6">
        <SelectBox
          onSelect={editor.updateYear}
          selected={sinSel(time.currentYear())}
          values={strSel(time.allYears())}
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
