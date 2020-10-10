
/***更新部分代码 */



var 热更新={};
热更新.测试="测试";
// 热更新.更新 =function(str,jsName) {
//     threads.start(function() {
//         var a = jsName
//         // var a =engines.myEngine().getSource();
//         // log(http.get(url).body.string())
//         files.write(a, str,encoding = "utf-8");  
//         //运行刚才更新好的脚本
//         log("已经写入"+a);
//         //不是主窗口，不需要运行
//         // engines.execScriptFile(a);  
//         // alert("更新成功，请退出脚本，重新运行!!");
//     });
// }



/***更新部分代码 */
热更新.更新 =function(url,jsFile,jsName) {
    threads.start(function() {
        if(jsFile==""){
            var a = engines.myEngine().cwd()+'/'+jsName
            // var a =engines.myEngine().getSource();
            // alert('更新目标:'+a+url)
            files.write(a, http.get(url).body.string());  
            //运行刚才更新好的脚本
            log(a+"已经写入");
            engines.execScriptFile(a);
            log("主窗口更新成功，请退出脚本，重新运行!!");
        }else{
            var a = engines.myEngine().cwd()+'/'+jsFile+'/'+jsName
            // var a =engines.myEngine().getSource();
            // alert('更新目标:'+a+url)
            files.write(a, http.get(url).body.string());  
            //运行刚才更新好的脚本
            log(a+"已经写入");
            // engines.execScriptFile(a);
            log("辅助文件 ， 更新成功！");}
    });
}

热更新.测试模块是否可用='热更新,模块可用'
module.exports=热更新;
