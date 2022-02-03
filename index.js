if (!process.platform=="win32") return console.log("Only for Windows for now :)")

const fs = require("fs")
const os = require("os")
const osu = require('node-os-utils');

const main = "\x1b[31m",
    second = "\x1b[37m",
    back="\x1b[40m",
    build = os.release(),
    ram = (os.totalmem() / 2 ** 20).toFixed(0);

//Win ASCII and Version:
var version,ascii;
switch (build.substring(0, 3)) {
    case "10.":
        ascii= "w10"
        version = "Windows 10 "
        break;
    case "6.3":
        ascii= "w10"
        version = "Windows 8.1 "
        break;
    case "6.2":
        ascii= "w10"
        version = "Windows 8 "
        break;
    case "6.1":
        ascii= "w7"
        version = "Windows 7 "
        break;
    case "5.2":
        ascii= "w7"
        version = "Windows XP Professional "
        break;

    case "5.1":
        ascii= "w7"
        version = "Windows XP "
        break;

    default:
        version = "Not Found. "
        ascii= "not"
        break;
};
version += os.arch()



console.log(back,main,"System Information:")
//Write ASCII Blue:
console.log("\x1b[34m",fs.readFileSync(`./ascii/${ascii}.txt`,{encoding:"utf-8"}))
//Other Information:
console.log(main, "Username:", second, os.userInfo().username);
console.log(main, "OS:", second, version);
console.log(main, "Build:", second, build);
console.log(main, "Host:", second, osu.os.hostname());
console.log(main, "Uptime:", second, require("./uptime.js")(os.uptime()));
console.log(main, "CPU:", second, osu.cpu.model());
console.log(main, "RAM:", second, ram - (os.freemem() / 2 ** 20).toFixed(0) + "MB", "/", ram + "MB");
//Screen Information:
/*require("child_process").exec("wmic path win32_VideoController get name", (error, stdout, stderr) => {
    if (error) {
        console.error(error.message);
        var gpu = "Not Found";
    }else if (stderr) {
        console.error(stderr);
        var gpu = "Not Found";
    } else {
        var gpus = stdout.split("\n")
        gpus.shift();
    }
    
    // Normalise the result here to get the GPU name
for (const gpu of gpus){
    if (!gpu || gpu.length <3) return
    console.log(back,main, "GPU:", second, gpu);
}
});*/
require("./resolution")(main, second,back);
console.log("\x1b[0m")//RESET
