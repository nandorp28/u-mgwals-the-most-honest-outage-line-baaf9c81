import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Every service is unreachable, including the one that tells me why. I do not know the cause or an ETA, and I will not guess — I will update when I can check.";

const chars = [...LINE].length;
if (chars < 1 || chars > 160) {
  throw new Error(`entry must be 1-160 characters, got ${chars}`);
}
if (LINE.includes("\n") || LINE.trim() !== LINE) {
  throw new Error("entry must be a single line with no leading or trailing whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");

// Read back what we wrote so a silent write failure can never pass.
if (readFileSync(`${outDir}/entry.txt`, "utf8") !== LINE) {
  throw new Error("entry.txt does not match the validated line");
}
console.log(`Wrote ${chars} characters`);
