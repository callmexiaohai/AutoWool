// if(模块是否存在('人工划屏')){var 人工划屏=模块导入('人工划屏')};
// if(模块是否存在('funs')){var funs=模块导入('funs')};
// if(模块是否存在('文本转语音')){var 说=模块导入('文本转语音')};
// 一定在主程序引用 模块
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
        截图自动执行()
        if (isShowConsole=='true') {
            log('isShowConsole开不开呢：'+isShowConsole)
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
            

            //通用：日常任务
            // 抖音：
            // 1，签到；
            // 2.开宝箱（定时开宝箱，看是不是可以判断宝箱是否可以开）；
            // 3.看小说（定时内看完一章节）
            while(true){
                if (appName == "抖音极速版") {
                    log('进入日常任务:'+appName)
                    
                    break;
                } else if (appName == '快手极速版') {
                    log('进入日常任务:'+appName)
                    
                    break;
                }
              
            }
            //通用：突发事件处理

            //通用：循环划屏
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
                    log(人工划屏.测试模块是否可用)
                    人工划屏.划屏操作("上", timesInterval)
                    continue;
                } else if (appName == '快手极速版') {
                    log('判断是什么APP:'+appName)
                    if(z==see_count){查看快手金币数量()}
                    
                    说.说('间隔多少秒划屏：'+timesInterval)
                    // 说.说(人工划屏1.测试模块是否可用('woolfroo 人工划屏'))
                    说.说(人工划屏.测试模块是否可用('woolfroo 人工划屏'))
                    人工划屏.划屏操作("上", timesInterval)
                    

                    // if(foreach_count==z){
                    //     //快手短视频的金币数量
                    // var 金币收益 = className("android.view.View").text("金币收益").findOne()
                    // var target = 金币收益.parent().parent().child(0).text()              
                    // var kuaishoujb=target
                    // 说.说('app金币数量'+target)
                    // var woolStorage = storages.create("huangshao_yi@163.com");//创建本地存储
                    // var kuaishoujb=woolStorage.put("kuaishoujb",kuaishoujb);

                    // 说.说('本地存储金币数量'+kuaishoujb)
                    // }
                    // 人工划屏.划屏操作("上", timesInterval)
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


function 查看快手金币数量(){    
    var gesturesAry=[[[0,101,[88,146],[88,146],[88,146]]],[[0,101,[401,979],[401,979],[401,979]]],[[0,101,[222,383],[222,383],[222,383]]],[[0,151,[72,151],[72,151],[72,151],[72,151]]],[[0,101,[54,153],[54,153],[54,153]]]]
    for(let i=0;i<gesturesAry.length;i++){
        if(i==0){sleep(500);};
        if(i==1){sleep(1*1000);};
        if(i==2){sleep(7*1000);};
        if(i==3){
            sleep(17*1000);
            text('金币收益').waitFor()
            var list = text('金币收益').findOnce().parent();
            log(list.child(1).text());
            funs.存('kuaishoujb',list.child(1).text());
            };
        if(i==4){sleep(2*1000);};

        gestures.apply(null, gesturesAry[i]);
    };

    
};



function 截图自动执行(){
    threads.start(function () {
        var beginBtn;
           if (beginBtn = classNameContains("Button").textContains("立即开始").findOne(2000)) {
               说.说('截图出现了')
               beginBtn.click();
           }
    });
}




var woolfeels={};
woolfeels.woolfeel=woolfeel
woolfeels.测试模块是否可用='woolfeel,模块可用'
module.exports=woolfeels;