if(模块是否存在('人工划屏')){var 人工划屏=模块导入('人工划屏')};
if(模块是否存在('funs')){var funs=模块导入('funs')};
if(模块是否存在('文本转语音')){var 说=模块导入('文本转语音')};



function 模块是否存在(jsname){
    return (files.isFile('./'+jsname+'.js'))
}
function 模块导入(jsname){
    var jsname = require('./'+jsname+'.js');
    log(jsname.测试模块是否可用)
    return jsname
}
/**
 * 薅羊毛
 * @param {应用列表} appArray 
 * @param {应用打开次数} foreach_count 
 * @param {屏幕滑动次数} see_count 
 * @param {是否显示控制台} isShowConsole 
 * @param {延迟时间} timesInterval 
 */
function woolfeel(appArray, foreach_count, see_count, isShowConsole, timesInterval) {
    threads.start(function () {
        if (isShowConsole) {
            console.show();
            console.setSize(device.width, device.height / 4);
        }
    });
    for (x = 1; x <= foreach_count; x++) {
        for (y = 0; y < appArray.length; y++) {
            let appName = appArray[y];
            toast("当前薅羊毛程序" + appName);
            console.log("当前薅羊毛程序" + appName);
            
            // log(funs.测试模块是否可用);
            // funs.清理应用();
            
            app.launchApp(appName);
            sleep(10000);//目前无法判断网速和splash时间，只能延迟久一点。10秒延迟。
            


            for (z = 1; z <= see_count; z++) {
                var curDateTimes = new Date();
                let currentDateTime = curDateTimes.getFullYear() + "-" + (curDateTimes.getMonth() + 1) + "-" + curDateTimes.getDate() + " " + curDateTimes.getHours() + ":" + curDateTimes.getMinutes() + ":" + curDateTimes.getSeconds();
                var messagge = 
                /**开始时间 */
                currentDateTime + " " + 
                /**打开的APP */
                appName + "被打开第" + x + "次一共" + 
                /**当前循环次数 */
                foreach_count + "次。" + "本次打开滑动" + z + '次,' + "总计:" + 
                /**总共循环次数 */
                see_count + "次"                
                /**每个视频间隔秒数 */
                +'间隔：'+timesInterval

                toast(messagge);
                console.info(messagge);
                if (appName == "抖音极速版") {
                    log('判断是什么APP:'+appName)
                    人工划屏.划屏操作("上", timesInterval)
                    continue;
                } else if (appName == '快手极速版') {
                    log('判断是什么APP:'+appName)


                    if(foreach_count==z){
                        //快手短视频的金币数量
                    var 金币收益 = className("android.view.View").text("金币收益").findOne()
                    var target = 金币收益.parent().parent().child(0).text()              
                    var kuaishoujb=target
                    说.说('app金币数量'+target)
                    var woolStorage = storages.create("huangshao_yi@163.com");//创建本地存储
                    var kuaishoujb=woolStorage.put("kuaishoujb",kuaishoujb);

                    说.说('本地存储金币数量'+kuaishoujb)
                    }
                    人工划屏.划屏操作("上", timesInterval)
                    continue;
                }

                console.log("没有进入随机，默认下滑")
                人工划屏.划屏操作("上", timesInterval)
            }
            console.clear();//
        }
    }
    toast("薅羊毛程序执行完毕3秒后即将关闭...");
    console.error("薅羊毛程序执行完毕3秒后即将关闭...");
    for (let i = 3; i >= 1; i--) {
        console.error(i);
        sleep(1000);
        if (i == 1) {
            console.hide()
            home();//返回主页面
            return;
        }
    }
}



var woolfeels={};
woolfeels.woolfeel=woolfeel
woolfeels.测试模块是否可用='woolfeel,模块可用'
module.exports=woolfeels;