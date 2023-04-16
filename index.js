const fs = require("fs"),
    os = require("os"),
    { execSync } = require("child_process"),
    { resolve } = require("path"),
    PLATFORM = process.platform,
    IMAGE_PATH = resolve(__dirname, "ss.png"),
    RES_CMD = {
        darwin: "screencapture -x",
        linux: resolve(__dirname, "./lib/scrot"),
        win32: `${resolve(__dirname, "./lib/nircmd")} savescreenshot`
    };

module.exports = () => {
    const build = os.release(),
        totalmem = parseInt(os.totalmem() / 2 ** 20),
        usedmem = parseInt(totalmem - os.freemem() / 2 ** 20);

    let seconds = os.uptime();
    const days = Math.floor(seconds / 86400);
    seconds -= days * 86400;
    const hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;

    const infs = {
        Username: os.userInfo().username,
        Host: os.hostname(),
        OS: `${os.version()} ${os.arch()}`,
        Build: build,
        Uptime: `${days} Days, ${hours} Hours, ${minutes} Mins, ${seconds} Secs`,
        CPU: os.cpus()[0].model,
        RAM: `${usedmem}MB / ${totalmem}MB (${parseInt(usedmem / totalmem * 100)}%)`,
        GPUS: []
    }

    if (PLATFORM === "win32") {
        infs.Motherboard = execSync("wmic path win32_BaseBoard get Manufacturer,Product").toString().split("\n")[1].trim();
        infs.GPUS = execSync("wmic path win32_VideoController get name").toString().trim().split(/\r?\n/g).slice(1);
    }

    if (PLATFORM === "darwin")
        infs.GPUS = execSync("system_profiler SPDisplaysDataType | grep Chipset").toString();


    if (PLATFORM in RES_CMD) {
        execSync(`${RES_CMD[PLATFORM]} ${IMAGE_PATH}`);
        const filec = fs.readFileSync(IMAGE_PATH);
        fs.unlinkSync(IMAGE_PATH);
        infs.Resolution = `${filec.readUInt32BE(16)}x${filec.readUInt32BE(20)}`;
    }
    return infs;
}