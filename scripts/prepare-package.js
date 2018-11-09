/**
 * prepare-package.js
 *
 * This prepares a copy of package.json for npm packaging. This strips out extraneous nodes
 * from package.json for the prepared copy.
 */
const fs = require("fs");
const path = require("path");
const jsonfile = require("jsonfile");

const origPackageJson = path.resolve(__dirname, "../package.json");
jsonfile.readFile(origPackageJson, function(err, obj) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    obj.main = "lib";
    delete obj.scripts;
    delete obj.devDependencies;
    const packageDir = path.resolve(__dirname, "../build/npm");
    if (!fs.existsSync(packageDir)){
        fs.mkdirSync(packageDir);
    }
    jsonfile.writeFile(path.resolve(__dirname, "../build/npm/package.json"), obj, { spaces: 2 }, function (err) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
    });
});