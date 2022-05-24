const ss = require("desktop-screenshot")

module.exports = new Promise((r, j) => ss("./lib/screen-shoot.png", err => {
    if (err) return j(err);

    const res = require('image-size')('./lib/screen-shoot.png');
    r(res)


}));
