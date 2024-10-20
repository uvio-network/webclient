import { SplitList } from "@/modules/string/SplitList";

export class LifecycleObject {
  private phs: string;
  private sta: string;
  private val: boolean;

  constructor(lif: string, val: boolean) {
    const spl = SplitList(lif, ":");

    this.phs = spl.length === 2 ? spl[0].toLowerCase() : "";
    this.sta = spl.length === 2 ? spl[1].toLowerCase() : "";

    if (this.phs === "balance") {
      this.phs = "settled";
    }

    this.val = val;
  }

  color(): "gray" | "green" | "blue" | "rose" {
    if (this.phs === "dispute") return "rose";
    if (this.phs === "propose") return "blue";
    if (this.phs === "resolve") return "blue";
    if (this.phs === "settled" && this.val === true) return "green";
    if (this.phs === "settled" && this.val === false) return "rose";

    return "gray";
  }

  // phase can either be "dispute", "propose", "resolve" or "settled".
  phase(): string {
    return this.phs;
  }

  // state can either be "pending" or "onchain".
  state(): string {
    return this.sta;
  }
}
