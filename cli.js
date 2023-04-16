const time = "\x1b[40m\x1b[31mFetched In\x1b[37m"
console.time(time);
const fs = require("fs");
const infs = require(".")();

infs.GPUS = infs.GPUS.join(", ") || "N/A";
const ascii = process.platform === "win32" ?
    Number(infs.Build.substring(5, 7)) < 20 ?
        (["10.", "6.3", "6.2"].includes(infs.Build.substring(0, 3)) ? "w10" : "w7")
        : "w11"
    : process.platform === "darwin" ?
        "mac" : "not";

console.log(fs.readFileSync(`./ascii/${ascii}.txt`, "utf-8")
    .replaceAll("RED", "\x1b[31m").replaceAll("GREEN", "\x1b[32m").replaceAll("YELLOW", "\x1b[33m").replaceAll("RESET", "\x1b[0m")
    .replaceAll("BLUE", ["6.2", "6.3"].includes(infs.Build.slice(0, 3)) ? "\x1b[35m" : "\x1b[34m")// 8 & 8.1
);

for (const inf in infs)
    console.log("\x1b[40m\x1b[31m%s\x1b[37m:  %s", inf, infs[inf]);

console.timeEnd(time);
console.log("\x1b[0m");