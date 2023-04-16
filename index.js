const
    fs = require("fs"),
    os = require("os"),
    { execSync } = require("child_process"),
    PLATFORM = process.platform,
    IMAGE_PATH = "./lib/ss.png",
    RES_CMD = {
        darwin: "screencapture -x",
        linux: "./lib/scrot",
        win32: ".\\lib\\nircmd savescreenshot"
    }, // taken from image-size
    imagesize = buffer => [buffer.readUInt32BE(16), buffer.readUInt32BE(20)],
    write = (key, value) => console.log("\x1b[40m\x1b[31m", key, "\x1b[37m", value);

const
    build = os.release(),
    totalmem = parseInt(os.totalmem() / 2 ** 20),
    usedmem = parseInt(totalmem - os.freemem() / 2 ** 20),
    cpu = os.cpus()[0].model,
    version = `${os.version()} ${os.arch()}`,
    ascii = PLATFORM === "win32" ?
        Number(build.substring(5, 7)) < 20 ?
            {
                "10.": "w10",
                "6.3": "w10",
                "6.2": "w10",
                "6.1": "w7",
                "5.2": "w7",
                "5.1": "w7"
            }[build.substring(0, 3)] : "w11"
        : PLATFORM === "darwin" ? "mac" : "not";

let seconds = os.uptime();
const days = Math.floor(seconds / 86400);
seconds -= days * 86400;
const hours = Math.floor(seconds / 3600);
seconds -= hours * 3600;
const minutes = Math.floor(seconds / 60);
seconds -= minutes * 60;


write("SYSTEM", "INFORMATION:");

console.log(fs.readFileSync(`./ascii/${ascii}.txt`, "utf-8") // write ascii
    .replaceAll("RED", "\x1b[31m").replaceAll("GREEN", "\x1b[32m").replaceAll("YELLOW", "\x1b[33m").replaceAll("RESET", "\x1b[0m")
    .replaceAll("BLUE", ["6.2", "6.3"].includes(build.slice(0, 3)) ? "\x1b[35m" : "\x1b[34m")// 8 & 8.1
);


write("General", "Information:\n");

write("Username:", os.userInfo().username);
write("Host:", os.hostname());
write("OS:", version);
write("Build:", build);
write("Uptime:", `${days} Days, ${hours} Hours, ${minutes} Mins, ${seconds} Secs`);
write("CPU:", cpu);
write("RAM:", `${usedmem}MB / ${totalmem}MB (${parseInt(usedmem / totalmem * 100)}%)\n`);

write("Screen", "Information:");

if (PLATFORM === "win32")
    execSync("wmic path win32_VideoController get name").toString().trim()
        .split(/\r?\n/g).slice(1).forEach((gpu, i) => write(`GPU${i}:`, gpu));
else if (PLATFORM === "darwin")
    write(`GPU:`, execSync("system_profiler SPDisplaysDataType | grep Chipset").toString());
else
    write("GPU:", "N/A");

let res = "N/A";
if (PLATFORM in RES_CMD) {
    execSync(`${RES_CMD[PLATFORM]} ${IMAGE_PATH}`);
    res = imagesize(fs.readFileSync(IMAGE_PATH)).join("x");
}

write("Resolution:", res);

console.log("\x1b[0m"); // RESET CONSOLE