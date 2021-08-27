// console.show();
// launchApp("动物星球");
// text("战利品").waitFor();
// sleep(5000);
// console.log("进入动物星球首页");



动物星球_翻倍()
function 动物星球_翻倍() {
    while (true) {
        log("进入 动物星球_翻倍");
        if (id("ll_speed_up").findOne()) {
            id("ll_speed_up").findOne().click();
            console.log("点击--翻倍")
            sleep(2000);
        } 

        if (id("ll_play").findOne()) {
            id("ll_play").findOne().click();
            console.log("点击观看")
            sleep(2000);
        } 


        
        //领取看视频
        if (text("距离下个礼包领取还有").findOnce()) {
            console.log("看视频需等待,跳出_翻倍_循环");
            sleep(2000);
            break;
        }
        //如果无任务就跳出循环，结束这个翻倍任务
        if (text("鸡血打多了会虚脱，休息一会吧！")) {
            console.log("暂无--翻倍");
            break;
        }
    }

}
动物星球_刷新()

// while (true) {
//     if (id("ll_play").findOnce()) {
//         id("ll_play").findOnce().click();
//         console.log("点击--领取看视频");
//         sleep(3000);
//     } else {
//         break;
//     }
//     动物星球_关闭广告();
//     textStr("动物星球_好的", "好的");


// }
//升级最大
// if (id("iv_feed_count").findOnce()) {
//     id("iv_feed_count").findOnce().click();
//     sleep(500);
//     id("iv_feed_count").findOnce().click();
//     sleep(500);
//     id("iv_feed_count").findOnce().click();
//     console.log("升级选择");
//     sleep(500);
// }

// var i = 0;
// while (true) {
//     i = i + 1;
//     sleep(1000);
//     log("进入循环", i, "次")
//     // textStr("动物星球_好的", "好的");
//     // if (text("翻倍").findOnce()) { 动物星球_翻倍(); }
//     // else {
//     //     动物星球_升级();
//     //     动物星球_突破();
//     //     动物星球_礼包();
//     //     动物星球_强化();
//     // }
// }

// function 动物星球_升级() {
//     var 宠物升级 = id("fl_feed_bt").find();
//     log("宠物升级.lenght :", 宠物升级.length);
//     宠物升级.forEach((升级, index) => {
//         升级.click();
//         sleep(1000);
//     });
//     log("完成一次升级")

// }

// function 动物星球_突破() {
//     while (true) {
//         log("进入 动物星球_突破");
//         idStr( "点击--突破" ,"fl_break");
//         idStr( "点击--加速","iv_speed_up");
//         idStr("点击--看视频/收下卡", "ll_play");
//         idStr( "关闭" ,"view_close",);
//         textStr( "点击--好的","好的",);
//         //有距离下次领取还有，跳出循环
//         if (text("加速成功").findOnce()) {
//             sleep(2000);
//             className("android.view.View").depth("8").drawingOrder("1").drawingOrder("1").findOnce().click();
//             console.log("加速成功，跳出_突破_循环");
//             break;
//         }
//         //有距离下次领取还有，跳出循环
//         if (text("距离下个礼包领取还有").findOnce()) {
//             console.log("看视频需等待，跳出_突破_循环");
//             sleep(2000);
//             idStr("view_close", "关闭");
//             break;
//         }
//     }

// }
// function 动物星球_礼包() {
//     while (true) {
//         log("进入 动物星球_礼包");
//         idStr( "点击--礼包","fl_gift");
//         // if (id("fl_gift").findOnce()) {
//         //     id("fl_gift").findOnce().click();
//         //     console.log("点击--礼包")
//         //     sleep(2000);
//         // }
//         idStr( "点击--看视频/收下卡" ,"ll_play",);
//         textStr("点击--好的", "好的", );
//         classNameStr("点击--关闭", "android.widget.ImageView", "5", "2", "1");

//         if (text("距离下个礼包领取还有").findOnce()) {
//             console.log("看视频需等待,跳出_礼包_循环");
//             sleep(2000);
//             break;
//         }
//     }

// }

// function 动物星球_强化() {
//     while (true) {
//         log("进入 动物星球_强化");
//         idStr("fl_streng_animal", "点击--强化");
//         textStr( "点击--一键强化","一键强化",);
//         if (text("一键强化").contextClickable(false).findOnce()) {
//             text("一键强化").findOnce().click();
//             console.log("暂无--一键强化")
//             sleep(2000);
//             idStr( "点击--关闭","view_close",);
//             break;
//         }

//     }
// }
// function 动物星球_关闭广告() {
//     var 动物星球_AD = className("android.widget.ImageView").depth(5).drawingOrder(2).indexInParent(1).findOnce();
//     if (动物星球_AD) {
//         动物星球_AD.click();
//         console.log("关闭关闭");
//         sleep(1000);
//     }

// }



// function idStr(str, str1) {
//     if (id(str1).findOnce().clickable() == true) {
//         id(str1).findOnce().click();
//     } else if (id(str1).findOnce().parent().clickable() == true) {
//         id(str1).findOnce().parent().click();
//     } else if (id(str1).findOnce().parent().parent().clickable() == true) {
//         id(str1).findOnce().parent().parent().click();
//     }
//     console.log(str)
//     sleep(2000);
// }

// function textStr(str, str1) {
//     if (text(str1).findOnce().clickable() == true) {
//         text(str1).findOnce().click();
//     } else if (text(str1).findOnce().parent().clickable() == true) {
//         text(str1).findOnce().parent().click();
//     } else if (text(str1).findOnce().parent().parent().clickable() == true) {
//         text(str1).findOnce().parent().parent().click();
//     }
//     console.log(str)
//     sleep(2000);
// }
// function classNameStr(str, str1, str2, str3, str4) {
//     log("进入");
//     var 动物星球_深度 =
//         className(str1)
//             .depth(str2)
//             .drawingOrder(str3)
//             .indexInParent(str4)
//             .findOnce();
//     log(动物星球_深度.length)
//     if (动物星球_深度) {
//         log("点击");
//         动物星球_深度.click();
//         console.log(str)
//         sleep(2000);
//     }
// }


function 动物星球_刷新() {
    notifications();
    sleep(3000)
    back();

}