const print = require("./print.js");

module.exports = () => {
    return require("desktop-screenshot")("./lib/screen-shoot.png", err => {
        if (err) return console.error(err);

        const res = require('image-size')('./lib/screen-shoot.png');
        print("Resolution:", res.width + "x" + res.height);


    });
};
