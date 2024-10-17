import { Address } from "viem";
import { ChainStore } from "@/modules/chain/ChainStore";
import { ClaimObject } from "@/modules/claim/ClaimObject";
import { combine } from "zustand/middleware";
import { ContractConfig } from "@/modules/contract/ContractConfig";
import { create } from "zustand";
import { parseUnits } from "viem";
import { PostCreateResponse } from "@/modules/api/post/create/Response";
import { Receipt } from "@/modules/wallet/WalletInterface";
import { TokenConfig } from "@/modules/token/TokenConfig";
import { TrimWhitespace } from "@/modules/string/TrimWhitespace";
import { Unix } from "@/modules/time/Time";
import { VoteCreateResponse } from "@/modules/api/vote/create/Response";

export interface EditorMessage {
  claims: ContractConfig;
  day: number | string;
  from: Address;
  kind: string;
  labels: string;
  markdown: string;
  month: number | string;
  option: boolean;
  overlay: boolean;
  parent: ClaimObject;
  pending: boolean;
  post: PostCreateResponse;
  propose: ClaimObject;
  receipt: Receipt;
  reference: string;
  resolve: ClaimObject;
  stake: string;
  vote: VoteCreateResponse;
  year: number | string;
};

export const EditorStore = create(
  combine(
    {} as EditorMessage,
    (set, get) => ({
      delete: () => {
        set(() => {
          return {};
        });
      },
      getAmount: (): { num: number; big: bigint; } => {
        const stk = getStk(get().stake, get().propose);
        const amo = getAmo(stk);
        const tok = tokCon(stk);

        return {
          num: amo,
          big: parseUnits(String(amo), tok ? tok.decimals : 2),
        };
      },
      getExpiry: (): number => {
        return Unix(`${get().day} ${get().month} ${get().year}`);
      },
      getLabels: (): string => {
        return getLab(get().labels, get().propose);
      },
      getSymbol: (): string => {
        return tokStr(getStk(get().stake, get().propose));
      },
      getToken: (): TokenConfig => {
        return tokCon(getStk(get().stake, get().propose));
      },
      updateClaims: (c: ContractConfig) => {
        set((state: EditorMessage) => {
          return {
            ...state,
            claims: c,
          };
        });
      },
      updateDay: (d: number | string) => {
        set((state: EditorMessage) => {
          return {
            ...state,
            day: d,
          };
        });
      },
      updateKind: (k: string) => {
        set((state: EditorMessage) => {
          return {
            ...state,
            kind: k,
          };
        });
      },
      updateLabels: (l: string) => {
        set((state: EditorMessage) => {
          return {
            ...state,
            labels: l,
          };
        });
      },
      updateMarkdown: (m: string) => {
        set((state: EditorMessage) => {
          return {
            ...state,
            markdown: m,
          };
        });
      },
      updateMonth: (m: number | string) => {
        set((state: EditorMessage) => {
          return {
            ...state,
            month: m,
          };
        });
      },
      updateOption: (o: boolean) => {
        set((state: EditorMessage) => {
          return {
            ...state,
            option: o,
          };
        });
      },
      updateOverlay: (o: boolean) => {
        set((state: EditorMessage) => {
          return {
            ...state,
            overlay: o,
          };
        });
      },
      updateParent: (p: ClaimObject) => {
        set((state: EditorMessage) => {
          return {
            ...state,
            parent: p,
          };
        });
      },
      updatePending: (p: boolean) => {
        set((state: EditorMessage) => {
          return {
            ...state,
            pending: p,
          };
        });
      },
      updatePost: (p: PostCreateResponse) => {
        set((state: EditorMessage) => {
          return {
            ...state,
            post: p,
          };
        });
      },
      updatePropose: (p: ClaimObject) => {
        set((state: EditorMessage) => {
          return {
            ...state,
            propose: p,
          };
        });
      },
      updateReceipt: (r: Receipt) => {
        set((state: EditorMessage) => {
          return {
            ...state,
            receipt: r,
          };
        });
      },
      updateReference: (r: string) => {
        set((state: EditorMessage) => {
          return {
            ...state,
            reference: r,
          };
        });
      },
      updateResolve: (r: ClaimObject) => {
        set((state: EditorMessage) => {
          return {
            ...state,
            resolve: r,
          };
        });
      },
      updateStake: (s: string) => {
        set((state: EditorMessage) => {
          return {
            ...state,
            stake: s,
          };
        });
      },
      updateVote: (v: VoteCreateResponse) => {
        set((state: EditorMessage) => {
          return {
            ...state,
            vote: v,
          };
        });
      },
      updateYear: (y: number | string) => {
        set((state: EditorMessage) => {
          return {
            ...state,
            year: y,
          };
        });
      },
    })
  )
);

const getAmo = (stk: string): number => {
  const spl = stk.split(" ");

  if (!spl || spl.length !== 2) {
    return 0;
  }

  const str = TrimWhitespace(spl[0]);

  if (str === "") {
    return 0;
  }

  const num = parseFloat(str);

  return isNaN(num) ? 0 : num;
};

const getLab = (lab: string, pro: ClaimObject): string => {
  if (lab !== "") {
    return TrimWhitespace(lab);
  }

  if (pro !== undefined) {
    return pro.labels().join(",");
  }

  return "";
};

const getStk = (stk: string, pro: ClaimObject): string => {
  if (stk !== undefined && stk !== "") {
    return TrimWhitespace(stk);
  }

  if (pro !== undefined) {
    return `${pro.summary().post.minimum * 2} ${pro.token}`;
  }

  return "";
};

const tokCon = (stk: string): TokenConfig => {
  return ChainStore.getState().getActive().tokens[tokStr(stk)];
};

const tokStr = (stk: string): string => {
  const spl = stk.split(" ");

  if (!spl || spl.length !== 2) {
    return "";
  }

  return TrimWhitespace(spl[1]);
};
