var i=0;
while(true){
    sleep(2000)
    i++
    log(i)
    if(className("android.view.View").id("comment_icon").exists()){
        log('评论存在，可以点击')
        className("android.view.View").id("comment_icon").click()
    }
    if(id("comment_count_view").className("android.widget.TextView").text("1082").exists()){
        log('评论存在1082，可以点击')
    }

    if(textContains("@").exists()){
        if(textContains("@").findOnce()){
            log(textContains("@").findOnce().text())
        }
    }

    if(i%5==0){
        log('i%5'+i+':'+i%5)
    }
    if(i%20==0){
        log('开始点赞')
        log('i%20'+i+':'+i%20)
    }

}
// for(var i=0;i<20;i++){
//     log('主进程：'+i)
//     if(i>5){log('结算第1个子线程');threads1.interrupt();}
//     if(i>8){log('结算第2个子线程');点赞线程.interrupt();}
//     sleep(2000)
// }

