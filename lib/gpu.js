const { execSync } = require("child_process");

module.exports = () => {

    try {
        const stdout = execSync("wmic path win32_VideoController get name").toString()

        return stdout.split(/\r?\n/g).slice(1).filter(gpu => gpu.length > 3)

    } catch (e) {
        return null;
    }
};
