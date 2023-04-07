const fs = require("fs");
const client = require("..");


const evcentFiles = fs.readdirSync("./events/");

evcentFiles.map((file) => {
    return require(`../events/${file}`);
});
