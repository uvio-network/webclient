import { ClaimObject } from "@/modules/claim/object/ClaimObject";

interface Props {
  claim: ClaimObject;
}

export const ClaimButtons = (props: Props) => {
  return (
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
  );
};
