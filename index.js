
//imports:
//For reading ASCII:
const fs = require("fs"),
    //For System information:
    os = require("os"),
    //For write to console:
    write = require("./lib/print"),
    //For colors of terminal:
    { main, second, back, blue } = require("./lib/colors");

//System infos:
const build = os.release(),//Build name
    ram = (os.totalmem() / 2 ** 20).toFixed(0), //Total RAM
    usedmem = ram - (os.freemem() / 2 ** 20).toFixed(0),//Used RAM
    type = os.platform(),//win32 or linux or darwin
    cpu = os.cpus()[0].model;//CPU 

//ASCII and OS NAME:
var ascii = "not", version = os.version();

if (type === "win32") {
    switch (build.substring(0, 3)) {
        case "10.":
            ascii = "w10";
            break;
        case "6.3":
            ascii = "w10";
            break;
        case "6.2":
            ascii = "w10";
            break;
        case "6.1":
            ascii = "w7";
            break;
        case "5.2":
            ascii = "w7";
            break;
        case "5.1":
            ascii = "w7";
            break;
        default:
            ascii = "not";
            break;
    };
}

//Add arch to version:
version += " " + os.arch();

//Writing Main title:
write("SYSTEM", "INFORMATION:");

//Write ASCII Blue:
console.log(blue, fs.readFileSync(`./ascii/${ascii}.txt`, "utf-8"));

//General Information:
write("General", "Information:");

console.log()//Blank

write("Username:", os.userInfo().username);
write("OS:", version);
write("Build:", build);
write("Host:", os.hostname());
write("Uptime:", require("./lib/uptime.js")(os.uptime()));
write("CPU:", cpu);
write("RAM:", usedmem + "MB / " + ram + "MB");

console.log()//Blank

//Screen Information:
write("Screen", "Information:");
require("./lib/resolution.js")(main, second, back);

switch (type) {
    case "win32":
        require("./lib/gpu")(main, second, back);
        break;

    default:
        write("GPU:", "Not supported in your platform.");
        break;
}

//RESET:
console.log("\x1b[0m");