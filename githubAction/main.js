const prefix = "[BloggerifyT GitHub Action] ";
console.info(prefix + "Starting Bloggerify GitHub Action...");
console.info(prefix + "Loading dependencies...");
try{
    const { execSync } = require("child_process");
    let rute = __dirname.replaceAll("\\", "/")+"/";
    let ruteBloggerify = process.env.GITHUB_WORKSPACE + "/BloggerifyT/";
    execSync("npm install", { stdio: "inherit", cwd: ruteBloggerify });
    execSync("npm ci", { stdio: "inherit", cwd: ruteBloggerify });
    execSync("npm run build --if-present", { stdio: "inherit", cwd: ruteBloggerify });
    execSync("npm pack", { stdio: "inherit", cwd: ruteBloggerify });
    execSync("npm install "+ruteBloggerify+"BloggerifyT-1.0.0.tgz", { stdio: "inherit", cwd: rute });
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
