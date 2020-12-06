var Time = require('./Time.js');
var 版本 = require('./版本.js');

log('研发进度：将更新日志，放入版本模块中，读取array到app显示',获取版本.更新20201014) 
服务器版本更新('v1.0.9')  //每次研发都需要更换版本,同时修改  版本.js中的版本号

function 服务器版本更新(msg){
    threads.start(function () {
        var objectId= bmob.BQL("select * from vesionup where softName='辅助小管家'").results[0].objectId//获取objectId
        log('获取服务器版本objectId：',objectId)
        log(bmob.updateObject("vesionup",objectId,{"jsVesion":msg})) //更新数据
    });

}