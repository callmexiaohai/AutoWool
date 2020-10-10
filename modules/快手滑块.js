var 快手滑块={};
//-------------------------拖动滑块-----------------------------//
/**
 * 拖动滑块
 */
快手滑块.首滑块偏移动=0
快手滑块.滑块偏移动=100
快手滑块.DragSlider=function() {
    for (var i = 0; i < 0; i++) { sleep(1000); log(i); }
    while (true) {
        img = images.captureScreen();
        if (img) {
            console.log("截图成功。进行识别滑块！");
            break;
        } else {
            console.log('截图失败,重新截图');
        }
    }
    var zx = this.discernSlidingblock(img, device.width) + 65+parseInt(this.滑块偏移动)
    console.info("识别结果滑块X坐标：" + zx);
    if (zx > -1) {
        //计算拖到滑块坐标
        console.log('开始滑动，滑块');

        var text向右拖动滑块填充拼图 = text("向右拖动滑块填充拼图").findOnce();
        var desc向右拖动滑块填充拼图 = desc("向右拖动滑块填充拼图").findOnce();
        if(text向右拖动滑块填充拼图){
            var qx = text向右拖动滑块填充拼图.bounds().left + (text向右拖动滑块填充拼图.bounds().width() * 0.15) / 2+parseInt(this.首滑块偏移动);
            var qy = text向右拖动滑块填充拼图.bounds().centerY();            
            var zy = qy;
            console.log(qx);
            console.log(qy);            
        }else if(desc向右拖动滑块填充拼图){
            var qx = (desc向右拖动滑块填充拼图.bounds().left + (desc向右拖动滑块填充拼图.bounds().width() * 0.15))  / 2+parseInt(this.首滑块偏移动);
            var qy = desc向右拖动滑块填充拼图.bounds().centerY();            
            var zy = qy;
            console.log(qx);
            console.log(qy);            
        }
        this.DragSliderSwipe(qx, qy, zx, zy)
        return true;
    } else {
        console.log("识别有误，请确认是否在滑块界面");
        return false;
    }
}
/**
 * 计算滑块位置
 * @param {图片} img 
 * @param {分辨率} ratio 
 */
快手滑块.discernSlidingblock=function(img, ratio) {
    //创建识别变量
    var temp, temp2, x, y, num, color, p, temp3, arr1;
    //分析设备分辨率
    if (ratio == 720) {
        var tb = [348, 253, 691, 638, 81]
        log("您的设备分辨率为：720p");
    } else if (ratio == 1080) {
        var tb = [463, 387, 912, 831, 125]
        log("您的设备分辨率为：1080p");
    } else {
        log("当前设备分辨率不符合规范")
        return -2
    }
    num = Math.ceil(tb[4] / 3.3 - 4);

    //计算滑块位置
    for (var k = 29; k <= 40; k++) {
        temp2 = "";
        color = "#" + k + "" + k + "" + k + "";
        for (var i = 1; i <= num; i++) {
            temp2 = temp2 + "0|" + i + "|" + color + ",";
            temp2 = temp2 + i + "|0|" + color + ",";
            temp2 = temp2 + "1|" + i + "|" + color + ",";
            temp2 = temp2 + i + "|1|" + color + ",";
            temp2 = temp2 + "2|" + i + "|" + color + ",";
            temp2 = temp2 + i + "|2|" + color + ",";
        }
        x = 0;
        while (x > -2) {
            y = 0;
            while (y > -2) {
                temp = "";
                for (var i = 1; i <= num; i += 2) {
                    temp = temp + "0|" + (tb[4] + y - i - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x) + "|" + i + "|" + color + ",";
                    temp = temp + (tb[4] + x) + "|" + (tb[4] + y - i - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x - i - 1) + "|0|" + color + ",";
                    temp = temp + i + "|" + (tb[4] + y) + "|" + color + ",";
                    temp = temp + (tb[4] + x - i - 1) + "|" + (tb[4] + y) + "|" + color + ",";
                    temp = temp + "1|" + (tb[4] + y - i - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x - 1) + "|" + i + "|" + color + ",";
                    temp = temp + (tb[4] + x - 1) + "|" + (tb[4] + y - i - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x - i - 1) + "|1|" + color + ",";
                    temp = temp + i + "|" + (tb[4] + y - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x - i - 1) + "|" + (tb[4] + y - 1) + "|" + color + ",";
                }
                temp = temp + temp2 + "0|0|" + color;
                arr1 = temp.split(",");
                var arr2 = new Array();
                for (var i = 0; i < arr1.length - 1; i++) {
                    arr2[i] = new Array();
                    temp3 = arr1[i].split("|");
                    arr2[i] = [Number(temp3[0]), Number(temp3[1]), temp3[2]];
                }
                try {
                    p = images.findMultiColors(img, color, arr2, {
                        region: [tb[0], tb[1], tb[2] - tb[0], tb[3] - tb[1]],
                        threshold: (Math.floor(k / 10) * 16 + k % 10)
                    });
                    if (p) {
                        img.recycle();
                        return p.x
                    }
                } catch (error) {
                    //出错
                    console.log("识别失败，错误原因：" + error);
                    return -1;
                }
                y = --y;
            }
            x = --x;
        }
    }
    try {
        img.recycle();
    } catch (error) {
        console.log("识别失败，错误原因：" + error);
    }
    return -1;
}
/**
 * 真人模拟滑动函数 （滑块滑动）
 * @param {起点x} sx 
 * @param {起点y} sy 
 * @param {终点x} ex 
 * @param {终点y} ey 
 */
快手滑块.DragSliderSwipe=function(sx, sy, ex, ey) {
    //设置随机滑动时长范围
    var timeMin = 1000
    var timeMax = 3000
    //设置控制点极限距离
    var leaveHeightLength = 500

    //根据偏差距离，应用不同的随机方式
    if (Math.abs(ex - sx) > Math.abs(ey - sy)) {
        var my = (sy + ey) / 2
        var y2 = my + random(0, leaveHeightLength)
        var y3 = my - random(0, leaveHeightLength)

        var lx = (sx - ex) / 3
        if (lx < 0) { lx = -lx }
        var x2 = sx + lx / 2 + random(0, lx)
        var x3 = sx + lx + lx / 2 + random(0, lx)
    } else {
        var mx = (sx + ex) / 2
        var y2 = mx + random(0, leaveHeightLength)
        var y3 = mx - random(0, leaveHeightLength)

        var ly = (sy - ey) / 3
        if (ly < 0) { ly = -ly }
        var y2 = sy + ly / 2 + random(0, ly)
        var y3 = sy + ly + ly / 2 + random(0, ly)
    }   
    //获取运行轨迹，及参数
    var time = [0, random(timeMin, timeMax)]
    var track = this.bezierCreate(sx, sy, x2, y2, x3, y3, ex, ey)
    // log("随机控制点A坐标：" + x2 + "," + y2)
    // log("随机控制点B坐标：" + x3 + "," + y3)
    // log("随机滑动时长：" + time[1])
    //滑动
    gestures(time.concat(track))
}
/**
 * 计算滑动轨迹
 */
快手滑块.bezierCreate=function(x1, y1, x2, y2, x3, y3, x4, y4) {
    //构建参数
    var h = 100;
    var cp = [{ x: x1, y: y1 + h }, { x: x2, y: y2 + h }, { x: x3, y: y3 + h }, { x: x4, y: y4 + h }];
    var numberOfPoints = 100;
    var curve = [];
    var dt = 1.0 / (numberOfPoints - 1);
    //计算轨迹
    for (var i = 0; i < numberOfPoints; i++) {
        var ax, bx, cx;
        var ay, by, cy;
        var tSquared, tCubed;
        var result_x, result_y;

        cx = 3.0 * (cp[1].x - cp[0].x);
        bx = 3.0 * (cp[2].x - cp[1].x) - cx;
        ax = cp[3].x - cp[0].x - cx - bx;
        cy = 3.0 * (cp[1].y - cp[0].y);
        by = 3.0 * (cp[2].y - cp[1].y) - cy;
        ay = cp[3].y - cp[0].y - cy - by;

        var t = dt * i
        tSquared = t * t;
        tCubed = tSquared * t;
        result_x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x;
        result_y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y;
        curve[i] = {
            x: result_x,
            y: result_y
        };
    }
    //轨迹转路数组
    var array = [];
    for (var i = 0; i < curve.length; i++) {
        try {
            var j = (i < 100) ? i : (199 - i);
            xx = parseInt(curve[j].x)
            yy = parseInt(Math.abs(100 - curve[j].y))
        } catch (e) {
            break
        }
        array.push([xx, yy])
    }
    return array
}
//-------------------------拖动滑块-----------------------------//
//-------------------------曲线滑动-----------------------------//
/**
 * 仿真随机带曲线滑动（视频/小说）
 * @param {起点x} qx 
 * @param {起点y} qy 
 * @param {终点x} zx 
 * @param {终点y} zy 
 * @param {过程耗时单位毫秒} time 
 */
快手滑块.RandomSwipe=function (qx, qy, zx, zy, time) {
    var xxy = [time];
    var point = [];
    var dx0 = {
        "x": qx,
        "y": qy
    };
    var dx1 = {
        "x": random(qx - (device.width/4)*0.25, qx + (device.width/4)*0.25),
        "y": random(qy , qy + 50)
    };
    var dx2 = {
        "x": random(zx - (device.width/4)*0.25, zx + (device.width/4)*0.25),
        "y": random(zy , zy + 50)
    };
    var dx3 = {
        "x": zx,
        "y": zy
    };
    for (var i = 0; i < 4; i++) {
        eval("point.push(dx" + i + ")");
    };
    for (let i = 0; i < 1; i += 0.08) {
        xxyy = [parseInt(this.bezier_curves(point, i).x), parseInt(this.bezier_curves(point, i).y)]
        xxy.push(xxyy);
    }
    gesture.apply(null, xxy);
};
快手滑块.bezier_curves=function(cp, t) {
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
//-------------------------曲线滑动-----------------------------//


module.exports=快手滑块;
