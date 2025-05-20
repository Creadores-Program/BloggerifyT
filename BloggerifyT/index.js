module.exports = function transpile(pathToTranspile, pathDestinity){
    const prefix = "[BloggerifyT] ";
    console.info(prefix+"Transpiling Blogger theme...");
    console.info(prefix+"Powered by Creadores Program");
    const cheerio = require('cheerio');
    const fs = require('fs');
    const path = require('path');
    let ScriptB = "";
    function loadCarpet(dire){
        const files = fs.readdirSync(dire);
        for(let file of files){
            let rutacomp = path.join(dire, file);
            let stats = fs.statSync(rutacomp);
            if(stats.isDirectory()){
                loadCarpet(rutacomp);
                continue;
            }
            //archivo
            if(path.extname(rutacomp) == '.js'){
                let script = fs.readFileSync(rutacomp, 'utf8');
                ScriptB += "require.register('"+path.relative(pathToTranspile, rutacomp)+"', function(module, exports, require){\n"+script.replaceAll(/<\/script>/gi, "<\\/script>")+"\n});\n";
            }else if(path.extname(rutacomp) == '.json'){
                let script = fs.readFileSync(rutacomp, 'utf8');
                ScriptB += "require.register('"+path.relative(pathToTranspile, rutacomp)+"', function(module){\n module.exports = "+script.replaceAll(/<\/script>/gi, "<\\/script>")+";\n});\n";
            }else if(path.extname(rutacomp) == '.css'){
                let script = fs.readFileSync(rutacomp, 'utf8');
                ScriptB += "require.register('"+path.relative(pathToTranspile, rutacomp)+"', function(module){\n module.exports = "+JSON.stringify(script.replaceAll(/<\/script>/gi, "<\\/script>"))+";\n});\n";
            }else if(path.extname(rutacomp) == '.html'){
                let script = fs.readFileSync(rutacomp, 'utf8');
                ScriptB += "require.register('"+path.relative(pathToTranspile, rutacomp)+"', function(module){\n module.exports = "+JSON.stringify(script.replaceAll(/<\/script>/gi, "<\\/script>")).replaceAll("$>", "$$&gt;").replaceAll("<$", "&lt;$")+";\n});\n";
            }else{
                let script = fs.readFileSync(rutacomp);
                let base64 = script.toString('base64');
                ScriptB += "require.register('"+path.relative(pathToTranspile, rutacomp)+"', function(module){\n module.exports = '"+base64+"';\n});\n";
            }
        }
    }
    function transpileHtml($){
        $("div").each(function(i, elem){
            if($(this).attr("src")){
                $(this).append(fs.readFileSync(pathToTranspile + "/" + $(this).attr("src"), 'utf8'));
                if($(this).find("div").length > 0){
                    transpileHtml($(this));
                }
                $(this).removeAttr("src");
            }
        });
    }
    loadCarpet(pathToTranspile);
    let $ = cheerio.load(fs.readFileSync(pathToTranspile+'/index.html', 'utf8'), { decodeEntities: false });
    if($.find("div").length > 0){
        transpileHtml($);
    }
    $('head').append("<style>\n"+fs.readFileSync(pathToTranspile+"/main.css", "utf8")+"\n</style>\n");
    $("body").append("<script src='https://cdn.jsdelivr.net/npm/simple-browser-require@1.0.0/require.min.js'></script>\n");
    $("body").append("<script>\n"+ScriptB+"\nlet manifest = require('package.json');\nlet mod = require(manifest.main);\nmod.load();\n</script>\n");
    let output = $.html();
    output = output.replace(/&lt;\$(.*?)\$&gt;/g, function(_, tag){
        return  '<$' + tag + '$>';
    });
    fs.writeFileSync(pathDestinity+"/theme_Blogger_"+(Math.floor(Math.random() * 9999999))+".txt", output, 'utf8');
    console.info(prefix+"Done! Transpiled Blogger theme saved in "+pathDestinity+"/theme_Blogger_XXXXXXX.txt");
};
