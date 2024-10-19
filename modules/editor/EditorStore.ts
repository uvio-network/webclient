import { Address } from "viem";
import { ChainStore } from "@/modules/chain/ChainStore";
import { ClaimObject } from "@/modules/claim/ClaimObject";
import { combine } from "zustand/middleware";
import { ContractConfig } from "@/modules/contract/ContractConfig";
import { create } from "zustand";
import { parseUnits } from "viem";
import { EmptyClaimObject } from "@/modules/claim/ClaimObject";
import { EmptyContractConfig } from "@/modules/contract/ContractConfig";
import { EmptyPostCreateResponse } from "@/modules/api/post/create/Response";
import { EmptyReceipt } from "@/modules/wallet/WalletInterface";
import { EmptyVoteCreateResponse } from "@/modules/api/vote/create/Response";
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
  patch: boolean;   // whether the vote must be patched
  pending: boolean; // whether the claim is pending
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
        // Note that we store transaction hashes temporarily on the user's local
        // storage for us to guarantee the reconciliation between onchain and
        // offchain resources. Before we delete all editor state we want to
        // ensure that we do not clutter the user's system with temporary state.
        // That is why we have to remove this temporary state before deleting
        // the editor state.

        const pos = get().post;
        if (pos !== undefined && pos.id !== "") {
          localStorage.removeItem(posKey(pos.id));
        }

        const vot = get().vote;
        if (vot !== undefined && vot.id !== "") {
          localStorage.removeItem(votKey(vot.id));
        }

        set(() => {
          return {
            claims: EmptyContractConfig(),
            day: 0,
            from: "0x0",
            kind: "",
            labels: "",
            markdown: "",
            month: 0,
            option: false,
            overlay: false,
            parent: EmptyClaimObject(),
            pending: false,
            post: EmptyPostCreateResponse(),
            propose: EmptyClaimObject(),
            receipt: EmptyReceipt(),
            reference: "",
            resolve: EmptyClaimObject(),
            stake: "",
            vote: EmptyVoteCreateResponse(),
            year: 0,
          };
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
      getPostHash: (): string => {
        const pos = get().post;

        if (pos !== undefined && pos.id !== "") {
          return localStorage.getItem(posKey(pos.id)) || "";
        }

        return "";
      },
      getSymbol: (): string => {
        return tokStr(getStk(get().stake, get().propose));
      },
      getToken: (): TokenConfig => {
        return tokCon(getStk(get().stake, get().propose));
      },
      getVoteHash: (): string => {
        const vot = get().vote;

        if (vot !== undefined && vot.id !== "") {
          return localStorage.getItem(votKey(vot.id)) || "";
        }

        return "";
      },
      updateClaims: (c: ContractConfig) => {
        set((state: EditorMessage) => {
          return {
            ...state,
            claims: c,
          };
        });
      },
      isDispute: (): boolean => {
        return exiCla(get().propose) && exiCla(get().resolve);
      },
      isPropose: (): boolean => {
        return (!exiCla(get().propose) && !exiCla(get().resolve)) || (exiCla(get().propose) && !exiCla(get().resolve));
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
      updatePatch: (p: boolean) => {
        set((state: EditorMessage) => {
          return {
            ...state,
            patch: p,
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
        if (get().kind === "stake" || get().kind === "truth") {
          localStorage.setItem(votKey(get().vote.id), r.hash);
        }

        if (get().kind === "claim") {
          localStorage.setItem(posKey(get().post.id), r.hash);
        }

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

const exiCla = (cla: ClaimObject): boolean => {
  if (cla === undefined) {
    return false;
  }

  if (cla.id() === "") {
    return false;
  }

  return true;
};

const getAmo = (stk: string): number => {
  const spl = stk.split(" ");

  if (!spl || spl.length !== 2) {
    return 0;
  }

  const str = TrimWhitespace(spl[0]);

  if (str === "") {
    return 0;
  }

  const num = Number(str);

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

const posKey = (oid: string): string => {
  return oid + ".post.uvio.network/hash";
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

const votKey = (oid: string): string => {
  return oid + ".vote.uvio.network/hash";
};
