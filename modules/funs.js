var 划 = require('./人工划屏.js');

var funs={};


/**
 * 
 * @param {*} msg toastAt('sdfsfdsdfs',300,300)
 * @param {*} x 重新定义toast的x坐标
 * @param {*} y 重新定义toast的y坐标
 */
funs.toastAt0=function(msg, x, y) {
    importClass(android.widget.Toast);
    importClass(android.view.Gravity);
    var toast = Toast.makeText(context, msg, Toast.LENGTH_SHORT);
    toast.setGravity(Gravity.TOP | Gravity.LEFT, x, y);
    toast.show();
  }
  
funs.toastAt=function(msg, x, y) {
    ui.run(() => this.toastAt0(msg, x, y));
  }
  


// 返回 true 表示锁定
funs.屏幕是否锁屏=function() {
    let km = context.getSystemService("keyguard");
    return km.inKeyguardRestrictedInputMode();
  };
// log(isScreenLocked())


funs.切换指针=function(){
    app.startActivity({
        action: "android.intent.action.VIEW", //此处可为其他值
        packageName: "com.android.settings",
        className: "com.android.settings.Settings$DevelopmentSettingsActivity"
        //此处可以加入其他内容，如data、extras
    });
    sleep(200);
    while (!textContains("指针位置").exists()) {
        //sleep(50);
        scrollDown();
        sleep(100);
    }
    var zz = textContains("指针位置").findOne(5000);
    if (zz) {
        log('发现指针')
        sleep(8000)
    }
    
    
}
funs.存=function(stostr,stostrs){
    var woolStorage = storages.create("huangshao_yi@163.com");//创建本地存储
    woolStorage.put(stostr,stostrs);
}
funs.取=function(stostr){
    var woolStorage = storages.create("huangshao_yi@163.com");//创建本地存储
    return woolStorage.get(stostr);
}

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
var dzmun=0
funs.点赞=function(strmun){
                    
    if(strmun%20==0){//整除20，除尽，进入0:0 20:0 40:0 60:0 80:0      
        划.划("下", 0.8)                    
        划.划("下", 0.8)
        if(textContains('点击进入直播间')){
            划.划("下", 0.8)
        }
        var gesturesAry=[[[0,151,[510,764],[510,764],[510,764],[510,764]]],[[0,101,[510,764],[510,764],[510,764]]]]
        for(let i=0;i<gesturesAry.length;i++){
            if(i==0){sleep(500);};
            if(i==1){sleep(0*1000);};

            gestures.apply(null, gesturesAry[i]);
        };
        log('点赞'+dzmun+'次')
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
 funs.IntTime=function() {
     //网络北京时间
    try {
        var recode_suning = http.get("http://quan.suning.com/getSysTime.do");
        var suningTime = recode_suning.body.json();
        return suningTime.sysTime1;
    } catch (e) {}
}

 funs.toTime=function() {
     //手机本地时间
    return new java.text.SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
}
module.exports=funs;