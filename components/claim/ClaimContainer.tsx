import * as Separator from "@/components/layout/separator";

import { ClaimHeader } from "@/components/claim/ClaimHeader";
import { ClaimObject } from "@/modules/claim/object/ClaimObject";
import { LabelList } from "@/components/claim/LabelList";
import { RenderMarkdown } from "@/components/markdown/RenderMarkdown";

interface Props {
  claim: ClaimObject;
}

export const ClaimContainer = (props: Props) => {
  return (
    <div className="mb-8 p-2 rounded sm:border border-gray-200 dark:border-gray-700">
      <ClaimHeader claim={props.claim} />

      <div className="">
        <RenderMarkdown
          text={props.claim.markdown()}
        />
      </div>

      <div className="">
        <LabelList
          labels={props.claim.labels()}
          lifecycle={props.claim.lifecycle()}
        />
      </div>

      <Separator.Horizontal />

      <div className="flex">
        <div className="w-full mr-1">
          <button
            className="p-4 w-full rounded text-black bg-emerald-400 hover:bg-emerald-500"
            type="button"
          >
            yay
          </button>
        </div>
        <div className="w-full ml-1">
          <button
            className="p-4 w-full text-black rounded bg-red-400 hover:bg-red-500"
            type="button"
          >
            nay
          </button>
        </div>
      </div>

      <div className="flex mt-2">
        <div className="w-full text-left">
          up 7 ETH
        </div>

        <div className="w-full text-center text-green-700 font-bold">
          +35%
        </div>

        <div className="w-full text-right">
          2 ETH down
        </div>
      </div>
    </div >
  );
};
