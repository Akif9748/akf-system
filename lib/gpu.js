const print = require("./print.js")

module.exports = () => {
    try {
        require("child_process").exec("wmic path win32_VideoController get name", (error, stdout, stderr) => {
            let gpus = ["Not Found"], count = 1;

            if (error)
                console.error(error.message);
            else if (stderr)
                console.error(stderr);
            else//Passing the "Name" string in stdout;
                gpus = stdout.split("\n").slice(1);


            for (const gpu of gpus) {//Pass blank:
                if (!gpu || gpu.length < 3) continue;
                print(`GPU${count}:`, gpu);
                count++;
            }
        });
    } catch (e) {
        print("GPU:", "Not Found");
    }
};
