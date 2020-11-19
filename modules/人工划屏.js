var 人工划屏={};
人工划屏.测试模块是否可用='人工划屏,模块可用'
/**
 * 
 * @param {倒计时时间} 随机间隔时间 
 */
人工划屏.间隔倒计时=function(随机间隔时间,strsmsg){
    // log(随机间隔时间,strsmsg)
    let min随机间隔时间=parseInt(随机间隔时间);
    let max随机间隔时间=parseInt(随机间隔时间)+3;
    let sj随机间隔时间=random(min随机间隔时间,max随机间隔时间)
    // log('间隔倒计时:',随机间隔时间)
    // log('min随机间隔时间:',min随机间隔时间)
    // log('max随机间隔时间:',max随机间隔时间)
    // log('最终确定随机间隔时间:',sj随机间隔时间)
    for(var 间隔倒计时=sj随机间隔时间;间隔倒计时>0;间隔倒计时--){
        sleep(1000)
        log(strsmsg+';下个视频：'+间隔倒计时)
    }
}


/**
 * 
 * @param {滑动的方位} strs 
 */
人工划屏.划屏操作 = function(strs,timesInterval){
    if(strs=="上"){
        log('进入了上滑的位置')
        x1=random(device.width*0.4,device.width*0.5);
        y1=random(device.height*0.8,device.height*0.9);
        x2=random(device.width*0.6,device.width*0.8);
        y2=random(device.height*0.1,device.height*0.2);
        this.sml_move(x1,y1,x2,y2,random(500,700));
        // log('timesInterval,参数间隔时间：',timesInterval)
        this.间隔倒计时(timesInterval,'上划屏操作');
    }
    if(strs=="下"){
        x1=random(device.width*0.7,device.width*0.8);
        y1=random(device.height*0.1,device.height*0.2);
        x2=random(device.width*0.4,device.width*0.5);
        y2=random(device.height*0.8,device.height*0.9);
        this.sml_move(x1,y1,x2,y2,random(500,700));
        this.间隔倒计时(random(timesInterval, timesInterval+3),'下划屏操作');
    }
    
    if(strs=="左"){
        x1=random(device.width*0.8,device.width*0.9);
        y1=random(device.height*0.5,device.height*0.6);
        x2=random(device.width*0.1,device.width*0.2);
        y2=random(device.height*0.7,device.height*0.9);
        this.sml_move(x1,y1,x2,y2,random(500,700));
        this.间隔倒计时(random(timesInterval, timesInterval+3),'左划屏操作');
    }
    if(strs=="右"){
        x1=random(device.width*0.1,device.width*0.2);
        y1=random(device.height*0.7,device.height*0.9);
        x2=random(device.width*0.8,device.width*0.9);
        y2=random(device.height*0.5,device.height*0.6);
        this.sml_move(x1,y1,x2,y2,random(500,700));
        this.间隔倒计时(random(timesInterval, timesInterval+3),'右划屏操作');
    }
    if(strs=="左窗口"){
        x1=random(device.width*0,device.width*0.1);
        y1=random(device.height*0.7,device.height*0.9);
        x2=random(device.width*0.8,device.width*0.9);
        y2=random(device.height*0.5,device.height*0.6);
        this.sml_move(x1,y1,x2,y2,random(500,700));
        this.间隔倒计时(random(timesInterval, timesInterval+3),'左窗口划屏操作');
    }
}



//此代码由飞云脚本圈整理提供（www.feiyunjs.com）
人工划屏.bezier_curves=function(cp, t) {
    cx = 3.0 * (cp[1].x - cp[0].x); 
    bx = 3.0 * (cp[2].x - cp[1].x) - cx; 
    ax = cp[3].x - cp[0].x - cx - bx; 
    cy = 3.0 * (cp[1].y - cp[0].y); 
    by = 3.0 * (cp[2].y - cp[1].y) - cy; 
    ay = cp[3].y - cp[0].y - cy - by; 
    
    tSquared = t * t; 
    tCubed = tSquared * t; 
    result = {
        "x": 0,
        "y": 0
    };
    result.x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x; 
    result.y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y; 
    return result; 
};

//仿真随机带曲线滑动  
//qx, qy, zx, zy, time 代表起点x,起点y,终点x,终点y,过程耗时单位毫秒
人工划屏.sml_move=function(qx, qy, zx, zy, time) {
    var xxy = [time];
    var point = [];
    var dx0 = {
        "x": qx,
        "y": qy
    };

    var dx1 = {
        "x": random(qx - 100, qx + 100),
        "y": random(qy , qy + 50)
    };
    var dx2 = {
        "x": random(zx - 100, zx + 100),
        "y": random(zy , zy + 50),
    };
    var dx3 = {
        "x": zx,
        "y": zy
    };
    for (var i = 0; i < 4; i++) {

        eval("point.push(dx" + i + ")");

    };
    // log(point[3].x)

    for (let i = 0; i < 1; i += 0.08) {
        xxyy = [parseInt(this.bezier_curves(point, i).x), parseInt(this.bezier_curves(point, i).y)]

        xxy.push(xxyy);

    }

    // log(xxy);
    gesture.apply(null, xxy);
};



module.exports=人工划屏;
