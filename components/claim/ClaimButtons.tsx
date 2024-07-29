import { ClaimObject } from "@/modules/claim/object/ClaimObject";

interface Props {
  claim: ClaimObject;
}

export const ClaimButtons = (props: Props) => {
  return (
    <div className="flex">
      <div className="w-full mr-2">
        <button
          className="p-4 w-full rounded text-gray-800 hover:text-black bg-emerald-400 hover:bg-emerald-500"
          type="button"
        >
          Agree
        </button>
      </div>
      <div className="w-full ml-2">
        <button
          className="p-4 w-full rounded text-gray-900 hover:text-black bg-rose-400 hover:bg-rose-500"
          type="button"
        >
          Disagree
        </button>
      </div>
    </div>
  );
};
