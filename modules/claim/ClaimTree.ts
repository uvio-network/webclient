import { ClaimObject } from "@/modules/claim/ClaimObject";

export const NewClaimTree = (cla: ClaimObject[]): ClaimTree[] => {
  const grp = cla.reduce(
    (g, x) => {
      const t = x.tree();

      if (!g[t]) {
        g[t] = [];
      }

      g[t].push(x);

      return g;
    },
    {} as Record<string, ClaimObject[]>,
  );

  return Object.values(grp).map((x) => new ClaimTree(x));
};

export class ClaimTree {
  private all: ClaimObject[];
  private cur: ClaimObject;

  private pro: ClaimObject;
  private res: ClaimObject[];
  private dis: ClaimObject[];
  private set: ClaimObject[];

  private cla: ClaimObject[];
  private com: ClaimObject[];

  constructor(cla: ClaimObject[]) {
    this.all = cla.sort((x, y) => x.created().diff(y.created()));

    this.cla = this.all.filter((x) => x.kind() === "claim");
    this.com = this.all.filter((x) => x.kind() === "comment");
    this.cur = this.cla[this.cla.length - 1];

    this.pro = this.cla[0];
    this.res = this.cla.filter((x) => x.kind() === "claim" && x.isResolve());
    this.dis = this.cla.filter((x) => x.kind() === "claim" && x.isDispute());
    this.set = this.cla.filter((x) => x.kind() === "claim" && x.isSettled());
  }

  settled(): ClaimObject[] {
    return this.set;
  }

  claims(): ClaimObject[] {
    return this.cla;
  }

  comment(): ClaimObject[] {
    return this.com;
  }

  current(cur?: string): ClaimObject {
    if (cur && cur !== "") {
      return this.cla.find((x) => x.id() === cur)!;
    }

    return this.cur;
  }

  disputes(): ClaimObject[] {
    return this.dis;
  }

  instance(): number {
    return this.dis.length;
  }

  latest(): ClaimObject {
    if (this.dis.length === 0) {
      return this.pro;
    }

    return this.dis[this.dis.length - 1];
  }

  propose(): ClaimObject {
    return this.pro;
  }

  resolves(): ClaimObject[] {
    return this.res;
  }
};
