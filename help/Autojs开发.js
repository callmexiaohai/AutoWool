/**
 * 方便查询
 */

// # 数组


//函数之间调用，字符串转数值处理,特别是函数调用函数传参时

log(parseInt(8+7))


// 调用bmob获取更新文件，如果文件数量>=4，重新写入

var fileArray= bmob.BQL("select * from vesionup where softName='私房钱辅助助手'").results

  log(fileArray.length)

  for (y = 0; y < fileArray.length; y++) {

​    log(fileArray[y].fileTree)

  }

// # 字符

// ## 

var numbers = "0123456789";

var lowerChars = "abcdefghijklmnopqrstuvwxyz";

var upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

var otherChars = "!@#$%-+?";

var var1='012';

var var2='abc';

// ## 字符的长度length

log('字符的长度：'+var1.length)

// ## 字符串的位置indexOf

log('字符在字符串的位置：'+var2.indexOf('a'))

// ## 替换replace

log('字符替换：'+var2.replace('a','d'))

// ## 分割slip

log('分离放入数组中'+var2.split('b')[1])

// ## 取字符串substr

log('定位取字符串'+var2.substr(1,2))

// ## 取随机姓名

```
//取随机姓名
//此代码由飞云脚本圈整理（www.feiyunjs.com）
function getRndName() {
    //以下字库可自行添加
    var familyNames = new Array(
        "赵", "钱", "孙", "李", "周", "吴", "郑", "王", "冯", "陈",
        "褚", "卫", "蒋", "沈", "韩", "杨", "朱", "秦", "尤", "许",
        "何", "吕", "施", "张", "孔", "曹", "严", "华", "金", "魏",
        "陶", "姜", "戚", "谢", "邹", "喻", "柏", "水", "窦", "章",
        "云", "苏", "潘", "葛", "奚", "范", "彭", "郎", "鲁", "韦",
        "昌", "马", "苗", "凤", "花", "方", "俞", "任", "袁", "柳",
        "酆", "鲍", "史", "唐", "费", "廉", "岑", "薛", "雷", "贺",
        "倪", "汤", "滕", "殷", "罗", "毕", "郝", "邬", "安", "常",
        "乐", "于", "时", "傅", "皮", "卞", "齐", "康", "伍", "余",
        "元", "卜", "顾", "孟", "平", "黄", "和", "穆", "萧", "尹",
        "司马","欧阳","上官","夏侯夏侯","诸葛","西门","南宫","东郭",
        "百里","尉迟","端木","皇甫","钟离","宇文","长孙","慕容","司徒","司空","东方","公孙","令狐"
    );
    var givenNames = new Array(
        "子璇", "淼", "国栋", "夫子", "瑞堂", "甜", "敏", "尚", "国贤", "贺祥", "晨涛",
        "昊轩", "易轩", "益辰", "益帆", "益冉", "瑾春", "瑾昆", "春齐", "杨", "文昊",
        "东东", "雄霖", "浩晨", "熙涵", "溶溶", "冰枫", "欣欣", "宜豪", "欣慧", "建政",
        "美欣", "淑慧", "文轩", "文杰", "欣源", "忠林", "榕润", "欣汝", "慧嘉", "新建",
        "建林", "亦菲", "林", "冰洁", "佳欣", "涵涵", "禹辰", "淳美", "泽惠", "伟洋",
        "涵越", "润丽", "翔", "淑华", "晶莹", "凌晶", "苒溪", "雨涵", "嘉怡", "佳毅",
        "子辰", "佳琪", "紫轩", "瑞辰", "昕蕊", "萌", "明远", "欣宜", "泽远", "欣怡",
        "佳怡", "佳惠", "晨茜", "晨璐", "运昊", "汝鑫", "淑君", "晶滢", "润莎", "榕汕",
        "佳钰", "佳玉", "晓庆", "一鸣", "语晨", "添池", "添昊", "雨泽", "雅晗", "雅涵",
        "清妍", "诗悦", "嘉乐", "晨涵", "天赫", "玥傲", "佳昊", "天昊", "萌萌", "若萌",
        "惠宁","雅欣","奕雯","佳琪","永怡","璐瑶","娟秀","天佳","晓华","妍丽","璇菡",
        "嘉禾","忆辰","妍彤","眉萱","秀辰","怡熹","思琦","弦娇","青淑","宣淑","和静",
        "雪涵","美嘉","佳涵","旭和","丽娇","雨晨","文惠","雅馥","雨嘉","亦婷","秀慧",
        "俊颖","亭清","思涵","珂嘉","蒂莲","秀娟","晋仪","玮菁","慧琳","丽帆","思辰",
        "宇纯","美瑞","蕊清","秀敏","家维","宁致","婷方","燕晨","子琳","雪菲","泓锦",
        "佳妮","初晨","芷菡","奕可","莉姿","杏菏","韵彩","姝慧","雪华","珊娜","秀丽",
        "箫辉","盈初","语楚","青秋","梓菁","宝萱"
    );
    var i = parseInt( * Math.random()) * + parseInt( * Math.random());
    var familyName = familyNames[i];
    var j = parseInt( * Math.random()) * + parseInt( * Math.random());
    var givenName = givenNames[i];
    var name = familyName + givenName;
    var x = document.getElementsByName("client_name");
    for (var i = ; i < x.length; i++) {
        var o = x[i];
        o.value = name;
    };
};
```

// ## 取随机手机号

```
// 取随机手机号
//此代码由飞云脚本圈整理（www.feiyunjs.com）
function getRndMoble() {
    var prefixArray = new Array("130", "131", "132", "133", "134", "135", "137", "138",
        "170", "187", "189", "199", "198", "156", "166", "175", "186", "184", "146", "139", "147",
        "150", "151", "152", "157", "158", "159", "178", "182", "183", "187", "188", "133", "153",
        "149", "173", "177", "180", "181", "189");
    var i = parseInt(10 * Math.random());
    var prefix = prefixArray[i];
    for (var j = 0; j < 8; j++) {
        prefix = prefix + Math.floor(Math.random() * 10);
    };
    var x = document.getElementsByName("mobile_tel");
    for (var i = 0; i < x.length; i++) {
        var o = x[i];
        o.value = prefix;
    };
};
```

// ## 取随机身份证号

```
// 取随机身份证号
//此代码由飞云脚本圈整理（www.feiyunjs.com）
function getRndID() {
    var coefficientArray = ["7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2"];// 加权因子
    var lastNumberArray = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];// 校验码
    var address = "420101"; // 住址
    var birthday = "19810101"; // 生日
    var s = Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString();
    var array = (address + birthday + s).split("");
    var total = 0;
    for (i in array) {
        total = total + parseInt(array[i]) * parseInt(coefficientArray[i]);
    };
    var lastNumber = lastNumberArray[parseInt(total % 11)];
    var id_no_String = address + birthday + s + lastNumber;
    var x = document.getElementsByName("id_no");
    for (var i = 0; i < x.length; i++) {
        var o = x[i];
        o.value = id_no_String;
    };
};
```

// ## 取随机字母数字

```
//取随机字母数字
//此代码由飞云脚本圈整理（www.feiyunjs.com）
//https://www.cnblogs.com/sunshq/p/4171490.html
/*
** randomWord 产生任意长度随机字母数字组合
** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
** xuanfeng 2014-08-28
*/
function getRndLetterNumber(randomFlag, min, max){
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
 
    // 随机产生
    if(randomFlag){
        range = Math.round(Math.random() * (max-min)) + min;
    }
    for(var i=0; i<range; i++){
        pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
};

//使用方法
//生成3-32位随机串：
getRndLetterNumber(true, 3, 32)
//生成43位随机串：
getRndLetterNumber(false, 43)
```

// ## 取随机汉字

```
//取随机汉字(简体+生僻字)
//此代码由飞云脚本圈整理（www.feiyunjs.com）
function getRndWord() {
    eval("var word=" + '"\\u' + (Math.round(Math.random() * 20901) + 19968).toString(16) + '"')
    return word;
};
```

// ## 文本分割发送例子

```
//此代码由飞云脚本圈原创（www.feiyunjs.com）
let sendContent = "哈哈[可爱]你好。交个朋友吧！｜你是哪里的？｜看到了回复我".replace(/｜/g,'|')

if (sendContent.match("|")) {
    let strs = new Array();
    strs = sendContent.split("|"); //字符分割 
    for (i = 0; i < strs.length; i++) {
        log(strs[i])
        sleep(random(100, 200));
    };
} else {
    log(sendContent)
};
```

// ## 获取时间戳

```
var timestamp = new Date().getTime()；  //获取时间戳
```

// ## 时间戳转时间

```
//https://www.cnblogs.com/lipcblog/p/6725347.html
//第一种  2010年12月23日 10:53
function getLocalTime(nS) {     
   return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
};    
log(getLocalTime(1293072805));

//第二种    
function getLocalTime(nS) {     
    return new Date(parseInt(nS) * 1000).toLocaleString().substr(0,17)
};    
log(getLocalTime(1293072805));

//第三种  2010-10-20 10:00:00
function getLocalTime(nS) {     
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");      
};     
log(getLocalTime(1177824835));
```