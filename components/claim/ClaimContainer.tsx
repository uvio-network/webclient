import * as Separator from "@/components/layout/separator";

import { ClaimObject } from "@/modules/claim/object/ClaimObject";
import { LabelList } from "@/components/claim/LabelList";
import { RenderMarkdown } from "@/components/markdown/RenderMarkdown";

interface Props {
  claim: ClaimObject;
}

export const ClaimContainer = (props: Props) => {
  return (
    <div className="mb-8 p-2 rounded sm:border border-gray-300 dark:border-gray-600">
      <div className="flex">
        <div className="flex-none bg-green-200">
          image
        </div>
        <div className="flex-1 w-full bg-red-200">
          <div>
            name
          </div>
          <div>
            expiry
          </div>
        </div>
        <div className="flex-none bg-blue-200">
          <div>
            menu
          </div>
          <div>
            star
          </div>
        </div>
      </div>

      <div className="bg-gray-300">
        <RenderMarkdown
          text={props.claim.markdown()}
        />
      </div>

      <div className="bg-orange-100">
        <LabelList
          labels={props.claim.labels()}
          lifecycle={props.claim.lifecycle()}
        />
      </div>

      <Separator.Horizontal />

      <div className="flex">
        <div className="w-full mr-1">
          <button
            className="p-4 w-full rounded bg-green-500"
            type="button"
          >
            yay
          </button>
        </div>
        <div className="w-full ml-1">
          <button
            className="p-4 w-full rounded bg-red-500"
            type="button"
          >
            nay
          </button>
        </div>
      </div>

      <div className="flex mt-2">
        <div className="w-full text-left bg-green-100">
          up 7 ETH
        </div>

        <div className="w-full text-center text-green-700 font-bold bg-green-300">
          +35%
        </div>

        <div className="w-full text-right bg-red-100">
          2 ETH down
        </div>
      </div>
    </div>
  );
};
