import { mkdirSync } from "fs";
import { Level } from "level";
import { resolve } from "path";

mkdirSync(resolve("data"));
export const cache = new Level(resolve("data/cache.db"));
