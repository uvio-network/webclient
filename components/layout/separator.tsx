import moment from "moment";

import * as Separator from "@radix-ui/react-separator";

import { RadioCheckedIcon } from "../icon/RadioCheckedIcon";
import { Tooltip } from "@/components/tooltip/Tooltip";
import { TrimWhitespace } from "@/modules/string/TrimWhitespace";

interface Props {
  margin?: string;
  progress?: number;
  remaining?: moment.Moment;
}

export const Claim = (props: Props) => {
  return (
    <>
      {props.progress !== undefined && props.progress >= 0 && props.progress < 100 ? (
        <div className="relative flex w-full h-6 mt-2">
          <div
            className="flex my-auto"
            style={{ width: `${props.progress}%` }}
          >
            <Separator.Root
              className={TrimWhitespace(`
                border-t-[1px] border-color
                data-[orientation=horizontal]:h-px
                data-[orientation=horizontal]:w-full
              `)}
              decorative
              orientation="horizontal"
            />
          </div>

          <div className="flex w-fit my-auto">
            <Tooltip
              content={
                <>
                  {durStr(props.remaining!)}
                </>
              }
              trigger={
                <RadioCheckedIcon className="text-blue-400" />
              }
            />
          </div>

          <div
            className="flex my-auto"
            style={{ width: `${100 - props.progress}%` }}
          >
            <Separator.Root
              className={TrimWhitespace(`
                border-t-[1px] border-blue-400
                data-[orientation=horizontal]:h-px
                data-[orientation=horizontal]:w-full
              `)}
              decorative
              orientation="horizontal"
            />
          </div>

        </div >
      ) : (
        <div className="flex w-full h-6 mt-2">
          <Separator.Root
            className={TrimWhitespace(`
              w-full my-auto border-t-[1px] border-color
              data-[orientation=horizontal]:h-px
              data-[orientation=horizontal]:w-full
            `)}
            decorative
            orientation="horizontal"
          />
        </div>
      )}
    </>
  );
};

export const Horizontal = (props: Props) => {
  return (
    <Separator.Root
      className={TrimWhitespace(`
        border-t-[1px] border-color
        ${props.margin ? props.margin : "my-4"}
        data-[orientation=horizontal]:h-px
        data-[orientation=horizontal]:w-full
      `)}
      decorative
      orientation="horizontal"
    />
  );
};

export const Vertical = (props: Props) => {
  return (
    <Separator.Root
      className="mx-auto border-r-[1px] border-color border-dashed data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
      decorative
      orientation="vertical"
    />
  );
};

const durStr = (rem: moment.Moment): string => {
  const dur = moment.duration(rem.diff(moment()));

  const yea = dur.asYears();
  const mon = dur.asMonths();
  const wee = dur.asWeeks();
  const day = dur.asDays();
  const hou = dur.asHours();
  const min = dur.asMinutes();

  if (yea >= 1) {
    return `${Math.floor(yea)} ${uniStr(yea, "year")} left`;
  } else if (mon >= 1) {
    return `${Math.floor(mon)} ${uniStr(mon, "month")} left`;
  } else if (wee >= 1) {
    return `${Math.floor(wee)} ${uniStr(wee, "week")} left`;
  } else if (day >= 1) {
    return `${Math.floor(day)} ${uniStr(day, "day")} left`;
  } else if (hou >= 1) {
    return `${Math.floor(hou)} ${uniStr(hou, "hou")} left`;
  } else if (min >= 1) {
    return `${Math.floor(min)} ${uniStr(min, "min")} left`;
  } else {
    return `less than a minute left`;
  }

  return "";
};

const uniStr = (dur: number, uni: string): string => {
  if (Math.floor(dur) === 1) {
    return uni;
  }

  return uni + "s";
};
