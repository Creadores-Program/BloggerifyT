const prefix = "[BloggerifyT GitHub Action] ";
console.info(prefix + "Starting Bloggerify GitHub Action...");
console.info(prefix + "Loading dependencies...");
try{
    const { execSync } = require("child_process");
    let rute = __dirname.replaceAll("\\", "/")+"/";
    execSync("npm install https://github.com/Creadores-Program/BloggerifyT/releases/download/v1.0.1/BloggerifyT-1.0.0.tgz", { stdio: "inherit", cwd: rute });
    execSync("npm install", { stdio: "inherit", cwd: rute });
    var core = require('@actions/core');
    var github = require('@actions/github');
    var fs = require("fs");
    var Bloggerify = require("BloggerifyT");
}catch(e){
    console.error(e.stack || e.message);
    core.setFailed(e.stack || e.message);
}
console.info(prefix + "Dependencies loaded.");
console.info(prefix + "Starting Bloggerify...");
let pathToTranspile = core.getInput("path");
if(!fs.existsSync(pathToTranspile+"/BloggerifyT")){
    fs.mkdirSync(pathToTranspile+"/BloggerifyT");
}
Bloggerify(pathToTranspile, pathToTranspile+"/BloggerifyT");
