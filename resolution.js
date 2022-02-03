var PNG = require('pngjs').PNG;
const fs =require("fs")
module.exports = (main,second,back) => {
    
    require("desktop-screenshot")("./a.png", err => {
        if (err) console.error(err);
        fs.createReadStream("./a.png").pipe(new PNG())
        .on("parsed", function() {
            console.log(back,main,"Resolution:",second,this.width+"x"+this.height)
          //fs.unlinkSync("./a.png");
        })
        .on("error", console.error);
            
    });
};
