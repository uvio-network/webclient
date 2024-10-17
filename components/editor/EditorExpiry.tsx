import moment from "moment";

import { EditorStore } from "@/modules/editor/EditorStore";
import { SelectBox } from "@/components/select/SelectBox";
import { Time } from "@/modules/time/Time";

export const EditorExpiry = () => {
  const editor = EditorStore.getState();

  const time: Time = new Time(moment());

  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-3">
        <SelectBox
          onSelect={editor.updateDay}
          selected={time.currentDay()}
          values={time.allDays()}
        />
      </div>
      <div className="col-span-3">
        <SelectBox
          onSelect={editor.updateMonth}
          selected={time.currentMonth()}
          values={time.allMonths()}
        />
      </div>
      <div className="col-span-6">
        <SelectBox
          onSelect={editor.updateYear}
          selected={time.currentYear()}
          values={time.allYears()}
        />
      </div>
    </div>
  );
};
