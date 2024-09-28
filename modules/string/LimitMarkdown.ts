export const LimitMarkdown = (txt: string, lim: number): { txt: string; cut: boolean } => {
  let tot = 0;
  let out = "";

  for (const x of txt.split("\n")) {
    const spl = x.trim().split(/\s+/);

    if (tot + spl.length > lim) {
      out += spl.slice(0, lim - tot).join(" ") + "\n";
      return { txt: out.trim(), cut: true };
    }

    out += x + "\n";
    tot += spl.length;
  }

  return { txt: out.trim(), cut: false };
};
