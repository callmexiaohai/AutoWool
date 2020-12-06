var 划 = require('././modules/人工划屏.js');
划.测试()
truemun=2
var i=0
while(truemun==2){
    i++
    var truemun=text('看直播').find().size()
    log('进入循环次数：'+i+'直播控件个数：'+truemun)
    if(!text('看直播').exists()){
        sleep(500)
        划.

    }
    if(truemun==2){
        var truekj=text('看直播').find().get(1)
        truekj.click
        sleep((40*1000))
    }else{
        log('第二个直播，不存在了')
    }
    sleep(1000)
}
exit()