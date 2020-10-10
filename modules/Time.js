
function getTime () {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    };
    var day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    };
    var hour = date.getHours();
    if (hour < 10) {
        hour = "0" + hour;
    };
    var minute = date.getMinutes();
    if (minute < 10) {
        minute = "0" + minute;
    };
    return year +"-"+ month +"-"+ day +" "+ hour +":"+ minute+":"+ "0";
};

var curTime = new Date(); //获取时间比实际时间少一个月

var currentTime = new Date(parseInt(curTime.getFullYear()), parseInt(curTime.getMonth() + 1), parseInt(curTime.getDate()), parseInt(curTime.getHours()), parseInt(curTime.getMinutes()), parseInt(curTime.getSeconds()));

var appInstallDateTime = getTime()

var appInstallDate = appInstallDateTime.toString().split("-");


var getDay = appInstallDate[2].split(" ")[0]; //天
var hourMM = appInstallDate[2].split(" ")[1];//时分秒

var appInstallTime = new Date(appInstallDate[0], appInstallDate[1], parseInt(getDay), hourMM.split(":")[0], hourMM.split(":")[1], parseInt(0));
// var appInstallTime = new Date(parseInt(appInstallDate[0]), parseInt(1), parseInt(getDay), parseInt(1), parseInt(1), parseInt(0));

var zdyday= new Date(parseInt(2020), parseInt(8), parseInt(26), parseInt(3), parseInt(35), parseInt(00));

var Time={};
Time.getTime= getTime();
Time.时间=curTime;
Time.客户端时间=currentTime
Time.app安装时间=appInstallTime
Time.自定义时间=zdyday;
Time.倒计时毫秒=currentTime-appInstallTime;
Time.倒计时秒=(currentTime-appInstallTime)/1000;
Time.测试模块是否可用='Time,模块可用'
module.exports=Time;

// 调用
// var Time = require('./Time.js');
// log(Time.getFullYear)
// log("时间"+Time.时间)
// log("时间"+Time.时间.getFullYear())
// log("时间"+Time.时间.getMonth())
// log("时间"+Time.时间.getDate())
// log("客户端时间"+Time.客户端时间)
// log("客户端时间"+Time.客户端时间.getFullYear())
// log("客户端时间"+Time.客户端时间.getMonth())
// log("客户端时间"+Time.客户端时间.getDate())
// // log(Time.getTime())
// log("app安装时间"+Time.app安装时间)
// log("app安装时间"+Time.app安装时间.getFullYear())
// log("app安装时间"+Time.app安装时间.getMonth())
// log("app安装时间"+Time.app安装时间.getDate())
// log(Time.appInstallDate[0])
// log(Time.appInstallDate[1])
// log(Time.appInstallDate[2])
// log(Time.倒计时秒+"秒")
// log(Time.倒计时毫秒+"毫秒")