

// function 切换指针(){
//     app.startActivity({
//         action: "android.intent.action.VIEW", //此处可为其他值
//         packageName: "com.android.settings",
//         className: "com.android.settings.Settings$DevelopmentSettingsActivity"
//         //此处可以加入其他内容，如data、extras
//     });
//     sleep(200);
//     while (!textContains("指针位置").exists()) {
//         //sleep(50);
//         scrollDown();
//         sleep(100);
//     }
//     var zz = textContains("指针位置").findOne(5000);
//     if (zz) {
//         log('发现指针')
//         sleep(8000)
//         // a = click("指针位置");
//         // toastLog("指针位置切换成功：" + a);
//         // sleep(3000)
//         // back();
//     }
    
    
// }
var funs={};
funs.测试模块是否可用='funs,模块可用';
// funs.切换指针=切换指针();
// funs.清理通知栏=清理通知栏();

funs.清理通知栏=function(){
    // notifications()  //拉出通知栏。返回是否执行成功。 此函数依赖于无障碍服务
    quickSettings()//显示快速设置(下拉通知栏到底)。返回是否执行成功
    sleep(2000)
    if(device.model=='Redmi Note 4X'){
        log('这是：Redmi Note 4X   手机')
        // click((409+671)/2,1(598+1860)/2);
        id("com.android.systemui:id/dismiss_view").findOne().click()
    }
    if(device.model=='KSA-AL10'){
        log('这是：KSA-AL10   手机')
        // id("clear_all_recents_image_button").findOne().click()
        click(363,1345)

    }
    if(device.model=='M5 Note'){  
        log('这是：meizu_M5 Note   手机')
        sleep(3000)
        //不关闭当前APP
        click(530,1700)
    }

    if(device.model=='HM NOTE 1S'){  
        log('这是：HM NOTE 1S   手机')
        sleep(3000)
        //不关闭当前APP
        click(device.width*0.96,device.height*0.9)        
    }

}

funs.清理应用=function(){
    sleep(2000)
    // 先进入Auto.js ,在关闭应用，meizu_M5 Note 就用这种情况
    home()
    sleep(2000)
    recents()  //显示最近任务。返回是否执行成功。 此函数依赖于无障碍服务。
    sleep(2000)
    // 清理应用
    if(device.model=='Redmi Note 4X'){
        log('这是：Redmi Note 4X   手机')
        id("clearAnimView").findOne().click()
    }
    if(device.model=='KSA-AL10'){
        log('这是：KSA-AL10   手机')
        id("clear_all_recents_image_button").findOne().click()
    }
    if(device.model=='M5 Note'){  
        log('这是：meizu_M5 Note   手机')
        sleep(5000)
        //不关闭当前APP
        click(530,1700)
    }

    if(device.model=='HM NOTE 1S'){  
        log('这是：HM NOTE 1S   手机')
        sleep(3000)
        //不关闭当前APP
        click(530,1700)
    }

}



module.exports=funs;