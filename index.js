//For reading ASCII:
const fs = require("fs"),
    os = require("os"),    //For System information:
    { execSync } = require("child_process"),
    //For write to console:
    write = (key, value) => console.log("\x1b[40m\x1b[31m", key, "\x1b[37m", value);


//System infos:
const build = os.release(),//Build name
    ram = (os.totalmem() / 2 ** 20).toFixed(0), //Total RAM
    usedmem = ram - (os.freemem() / 2 ** 20).toFixed(0),//Used RAM
    type = os.platform(),//win32 or linux or darwin
    cpu = os.cpus()[0].model,//CPU 
    version = `${os.version()} ${os.arch()}`,//OS NAME
    ascii = type === "win32" ? {
        "10.": "w10",
        "6.3": "w10",
        "6.2": "w10",
        "6.1": "w7",
        "5.2": "w7",
        "5.1": "w7"
    }[build.substring(0, 3)] || "not" : type === "darwin" ? "mac" : "not";

// Uptime
let seconds = os.uptime();
const days = Math.floor(seconds / 86400);
seconds -= days * 86400;
const hours = Math.floor(seconds / 3600);
seconds -= hours * 3600;
const minutes = Math.floor(seconds / 60);
seconds -= minutes * 60;

//Writing Main title:
write("SYSTEM", "INFORMATION:");

//Write ASCII:
console.log(fs.readFileSync(`./ascii/${ascii}.txt`, "utf-8")
    .replaceAll("RED", "\x1b[31m").replaceAll("GREEN", "\x1b[32m").replaceAll("YELLOW", "\x1b[33m").replaceAll("RESET", "\x1b[0m")
    .replaceAll("BLUE", ["6.2", "6.3"].includes(build.slice(0, 3)) ? "\x1b[35m" : "\x1b[34m")// 8 & 8.1
);

// General Information:
write("General", "Information:\n");

write("Username:", os.userInfo().username);
write("OS:", version);
write("Build:", build);
write("Host:", os.hostname());
write("Uptime:", `${days} Days, ${hours} Hours, ${minutes} Mins, ${seconds} Secs`);
write("CPU:", cpu);
write("RAM:", `${usedmem}MB / ${ram}MB\n`);

// Screen Information:
write("Screen", "Information:");

if (type === "win32") {
    const stdout = execSync("wmic path win32_VideoController get name").toString()
    const gpus = stdout.trim().split(/\r?\n/g).slice(1);

    for (let i = 0; i < gpus.length; i++)
        write(`GPU${i}:`, gpus[i]);

} else if (type === "darwin")
    write(`GPU:`, execSync("system_profiler SPDisplaysDataType | grep Chipset").toString());
else
    write("GPU:", "Not supported in your platform.");


// Resolution information:
const resolutions = {
    darwin: "screencapture -x ./lib/ss.png",
    linux: "./lib/scrot ./lib/ss.png",
    win32: `.\\lib\\nircmd savescreenshot ./lib/ss.png`
}


if (Object.keys(resolutions).includes(type))
    execSync(resolutions[type]);

const { width, height } = require('image-size')('./lib/ss.png');
write("Resolution:", `${width}x${height}`);

//RESET:
console.log("\x1b[0m");