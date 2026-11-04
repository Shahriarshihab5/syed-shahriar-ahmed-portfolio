import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defaultContent } from "../src/data/defaultContent.js";

const target = resolve(process.cwd(), "public/content.json");

writeFileSync(target, `${JSON.stringify(defaultContent, null, 2)}\n`, "utf8");
console.log(`Wrote ${target}`);
