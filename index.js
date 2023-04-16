const fs = require("fs"), os = require("os"),
    { execSync } = require("child_process"),
    PLATFORM = process.platform,
    IMAGE_PATH = "./lib/ss.png",
    RES_CMD = {
        darwin: "screencapture -x",
        linux: "./lib/scrot",
        win32: ".\\lib\\nircmd savescreenshot"
    },
    build = os.release(),
    totalmem = parseInt(os.totalmem() / 2 ** 20),
    usedmem = parseInt(totalmem - os.freemem() / 2 ** 20),
    ascii = PLATFORM === "win32" ?
        Number(build.substring(5, 7)) < 20 ?
            (["10.", "6.3", "6.2"].includes(build.substring(0, 3)) ? "w10" : "w7")
            : "w11"
        : PLATFORM === "darwin" ?
            "mac" : "not";

let seconds = os.uptime();
const days = Math.floor(seconds / 86400);
seconds -= days * 86400;
const hours = Math.floor(seconds / 3600);
seconds -= hours * 3600;
const minutes = Math.floor(seconds / 60);
seconds -= minutes * 60;

const infs = {
    'General': 'Information:',
    'Username:': os.userInfo().username,
    'Host:': os.hostname(),
    'OS:': `${os.version()} ${os.arch()}`,
    'Build:': build,
    'Uptime:': `${days} Days, ${hours} Hours, ${minutes} Mins, ${seconds} Secs`,
    'CPU:': os.cpus()[0].model,
    'RAM:': `${usedmem}MB / ${totalmem}MB (${parseInt(usedmem / totalmem * 100)}%)\n`,
    'Screen': 'Information:'
}

if (PLATFORM === "win32")
    execSync("wmic path win32_VideoController get name").toString().trim()
        .split(/\r?\n/g).slice(1).forEach((gpu, i) => infs[`GPU${i}:`] = gpu);
else
    infs["GPU:"] = (PLATFORM === "darwin") ?
        execSync("system_profiler SPDisplaysDataType | grep Chipset").toString()
        : "N/A";

if (PLATFORM in RES_CMD) {
    execSync(`${RES_CMD[PLATFORM]} ${IMAGE_PATH}`);
    const filec = fs.readFileSync(IMAGE_PATH);
    infs["Resolution:"] = `${filec.readUInt32BE(16)}x${filec.readUInt32BE(20)}`;
}

console.log(fs.readFileSync(`./ascii/${ascii}.txt`, "utf-8")
    .replaceAll("RED", "\x1b[31m").replaceAll("GREEN", "\x1b[32m").replaceAll("YELLOW", "\x1b[33m").replaceAll("RESET", "\x1b[0m")
    .replaceAll("BLUE", ["6.2", "6.3"].includes(build.slice(0, 3)) ? "\x1b[35m" : "\x1b[34m")// 8 & 8.1
);

for (const inf in infs)
    console.log("\x1b[40m\x1b[31m", inf, "\x1b[37m", infs[inf]);

console.log("\x1b[0m"); 