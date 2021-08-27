// function IntTime() {
//     try {
//         var recode_suning = http.get("http://quan.suning.com/getSysTime.do");
//         var suningTime = recode_suning.body.json();
//         return suningTime.sysTime1;
//     } catch (e) {}
// }
// let ntime = 20190301211327;
// if (toTime() < ntime || IntTime() < ntime) {
//     toastLog("正常");
// } else {
//     toastLog(IntTime())
//     toastLog("已过期");
// }



// if (toTime() < ntime || IntTime() < ntime) {
//     toastLog("正常");
// } else {
//     toastLog(toTime())
//     // toastLog(IntTime())
//     toastLog("已过期");
// }

toastLog(toTime())
function toTime() {
    return new java.text.SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
}