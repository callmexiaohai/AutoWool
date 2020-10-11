"ui";
版本='v1.0.5'
const APPID = 'aa0da8d846d34075a61da6762c0e04a2';// APPID
const REST_ID = 'de4902c46e3c35f00e9c1679c47a106a'; //REST ID
if(files.isFile('./modules/Time.js')){
    var Time = require('./modules/Time.js');
    log(Time.测试模块是否可用)
}
if(files.isFile('./modules/热更新.js')){
    var 热更新 = require('./modules/热更新.js');
    log(热更新.测试模块是否可用)
}
if(files.isFile('./modules/woolfeels.js')){
    var woolfeels = require('./modules/woolfeels.js');
    log(woolfeels.测试模块是否可用)
}
if(files.isFile('./modules/wools.js')){
    var wools = require('./modules/wools.js');
    log(wools.测试模块是否可用)
}



/*------------bmob数据库的增删改查*------------*/ 
const Bmob = (function () {
    function Bmob(url, appId, restKey) {
        this.baseUrl = url;
        this.appId = appId;
        this.restKey = restKey;
    }
    Bmob.prototype.makeRequest = function (method, url, json, sessionToken, callback) {
        url = this.baseUrl + url;
        var options = {};
        options.contentType = "application/json";
        options.method = method;
        if (json) {
            options.body = JSON.stringify(json);
        }
        sessionToken = sessionToken || "";
        options.headers = {
            "X-Bmob-Application-Id": this.appId,
            "X-Bmob-REST-API-Key": this.restKey,
            "Content-Type": "application/json",
            // 加入X-Bmob-Session-Token
            "X-Bmob-Session-Token": sessionToken
        }
        return http.request(url, options, callback);
    }
    //获取服务器时间
    Bmob.prototype.timestamp = function () {
        return this.makeRequest("GET", "/timestamp", null).body.json();
    }
    /*------------------------用户表------------------------------*/
    //添加用户
    Bmob.prototype.userCreate = function (username,password,email,phone,info) {
        let user = {"username": username,"password": password,
            // "email": email, 
            // "mobilePhoneNumber": phone,
            // "info": info
        }
        return this.makeRequest("POST", "/users/", user).body.json();
    }
    //添加手机用户
    Bmob.prototype.userMobileCreate = function (phoneNum,smsCode) {
        let user = {"mobilePhoneNumber":phoneNum,"smsCode":smsCode}
        return this.makeRequest("POST", "/users/", user).body.json();
    }
    //用户登录
    Bmob.prototype.userLogin = function (username,password) {
        let url = encodeURI(util.format('/login?username=%s&password=%s', username, password));
        return this.makeRequest("GET", url, null).body.json();
    }
    //手机用户登录
    Bmob.prototype.userMobileLogin = function (phoneNum,smsCode) {
        let url = encodeURI(util.format('/login?username=%s&password=%s', phoneNum,smsCode));
        return this.makeRequest("GET", url, null).body.json();
    }
    //用户查询
    Bmob.prototype.userQuery = function (username) {
        let url = encodeURI(util.format('/users?where={"username":"%s"}', username));
        return this.makeRequest("GET", url, null).body.json();
    }
    //当前用户
    Bmob.prototype.userCurrent = function (objectId) {
        return this.makeRequest("GET", "/users/"+objectId, null).body.json();
    }
    //检查session token是否过期 ?在哪些情况下{ msg: 'ok' }现验证为{ msg: 'fail' }
    Bmob.prototype.userSession = function (objectId) {
        return this.makeRequest("GET", "/checkSession/"+objectId, null).body.json();
    }   
    //更新用户
    Bmob.prototype.userUpdate= function (objectId, sessionToken, data) {
        return this.makeRequest("PUT", "/users/"+objectId, data, sessionToken).body.json();
    }
    //删除用户
    Bmob.prototype.userDelete = function (objectId, sessionToken) {
        return this.makeRequest("DELETE", "/users/"+objectId, null, sessionToken).body.json();
    }
    //用户列表
    Bmob.prototype.userList = function () {
        return this.makeRequest("GET", "/users/", null).body.json();
    }
    //密码重置
    Bmob.prototype.userPasswordReset = function (type, data ,data2 ,sessionToken) {
        /*data格式*email {"email":emailAdress} sms {"password": "new password"} oldNew {"oldPassword": "用户的老密码","newPassword": "用户的新密码"} */
        var  url = ""; var data = data || ""; var data2 = data2 || ""; var method = "PUT"; var sessionToken = sessionToken|| "";
        switch (type) {
            case "email":
                method = "POST";
                url = "/requestPasswordReset";  
                break;
            case "sms":               
                url = "/resetPasswordBySmsCode/"+data2; //smsCode
                break;
            case "oldNew":
                url = "/updateUserPassword/"+data2; //objectId
                break;
            default:
                break;
        }
        return this.makeRequest(method, url, data, sessionToken).body.json();
    }
    //Email验证
    Bmob.prototype.userEmailVerify = function (email) {
        let data = {"email":email};
        return this.makeRequest("POST", "/requestEmailVerify/", data, null).body.json();
    }   
    //获取手机验证码
    Bmob.prototype.requestSmsCode = function (phoneNum,template) {
        let data = {"mobilePhoneNumber": phoneNum,"template": templateName||""}
        /*data = {"mobilePhoneNumber": phoneNum,"template": templateName} */

        return this.makeRequest("POST", "/requestSmsCode/", data).body.json();
    }
    /*------------------------第三方帐号用户账户连接----------------*/
    //后续增加

    /*------------------------数据表------------------------------*/
    // 添加数据
    Bmob.prototype.createObject = function (className, data) {
        return this.makeRequest("POST", "/classes/" + className, data).body.json();
    }
    //批量增加数据
    // https://api2.bmob.cn/1/batch/1/classes/TableName
    Bmob.prototype.createObjects = function (className, items) {
        //数据样例 className 为表名 items = [{"category": "类别","word": "value1"},{"category": "类别","word": "value2"}]
        let data = {"requests": []};
        items.forEach(item=> {
            let tmp = {
                "method": "POST",
                "path": "/1/classes/" + className,
                "body": item,
            };
            data.requests.push(tmp);           
        });
        return this.makeRequest("POST", "/batch/", data).body.json();
    }
    // 查询表数据
    Bmob.prototype.getObjects = function (className) {
        return this.makeRequest("GET", "/classes/" + className).body.json();
    }
    // 查询ID数据
    Bmob.prototype.getObject = function (className, id) {
        return this.makeRequest("GET", "/classes/" + className + "/" + id).body.json();
    }
    //条件查询
    Bmob.prototype.queryObject = function (className, data) {
        let url = encodeURI(util.format('/classes/%s/?where=%j', className, data));
        return this.makeRequest("GET", url, null).body.json();
    }
    // 更新数据
    Bmob.prototype.updateObject = function (className, objectId, data) {
        return this.makeRequest("PUT", "/classes/" + className + "/" + objectId, data).body.json();
    }
    // 删除数据
    Bmob.prototype.deleteObject = function (className, data) {
        var id = typeof (data) == "string" ? data : data.objectId;
        return this.makeRequest("DELETE", "/classes/" + className + "/" + id).body.json();
    }
    //BQL查询
    Bmob.prototype.BQL = function (bql) {
        let url = encodeURI(util.format('/cloudQuery?bql=%s', bql));
        return this.makeRequest("GET", url).body.json();
    }

    return Bmob;
})();

if (!APPID || !REST_ID) {
    alert("需要注册Bmob并填入app id和rest id");
    app.openUrl("http://doc.bmob.cn/data/restful/");
    exit();
}

var bmob = new Bmob("https://api2.bmob.cn/1", APPID, REST_ID);

var rootUrl = "http://ys-k.ys168.com/";
var 背景颜色 = "#dddddd"
var 字号 = "13"
var 字体颜色 = "#dd000000"
// 自定义账号密码，测试用
var 账号 = {
    "123": "123"
}
ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar>
                <toolbar bg="#FF5c50e6" id="toolbar" title="我的私房钱v1.0.5" paddingTop="2dp" h="auto" >
                </toolbar>
                <tabs id="tabs" />
            </appbar>
            <viewpager id="viewpager">
                {/* Frame1  ， 通用划屏主界面*/}
                <frame>
                    <scroll>
                        <vertical gravity="center">
                            <checkbox id="kuaishou" text="快手极速版" textSize="16sp" checked="true" />
                            <checkbox id="douyin" text="抖音极速版" textSize="16sp" checked="true" />
                            <checkbox id="shuabao" text="刷宝短视频" textSize="16sp" checked="true" />
                            <checkbox id="huoshan" text="火山极速版" textSize="16sp" checked="true" />
                            <checkbox id="weishi" text="微视" textSize="16sp" />
                            {/* <checkbox id="lizhi" text="栗子视频" textSize="16sp" />
                            <checkbox id="caidan" text="彩蛋视频" textSize="16sp"  />
                            <checkbox id="youyan" text="有颜短视频" textSize="16sp" />
                            <checkbox id="hongbao" text="红包视频" textSize="16sp" /> */}
                            <checkbox id="qimao" text="七猫免费小说" textSize="16sp" />
                            {/* <checkbox id="fanqie" text="番茄免费小说" textSize="16sp" />
                            <checkbox id="taokandian" text="淘看点" textSize="16sp" /> */}
                            <horizontal gravity="right">
                                <button style="Widget.AppCompat.Button.Colored" id="测试" text="测试" padding="12dp" w="auto" />
                                <button style="Widget.AppCompat.Button.Colored" id="通用执行" text="执行" padding="12dp" w="auto" />
                                 <button style="Widget.AppCompat.Button.Colored" id="关闭线程" text="关闭线程" />
                            </horizontal>
                        </vertical>
                    </scroll>
                </frame>
                {/* Frame2 ， 日常任务*/}
                <frame>
                    <scroll>
                        <vertical gravity="center">
                            <checkbox id="kuaishou" text="快手极速版" textSize="16sp" checked="true" />
                            <checkbox id="douyin" text="抖音极速版" textSize="16sp" checked="flase" />
                            <checkbox id="shuabao" text="刷宝短视频" textSize="16sp" checked="flase" />
                            <checkbox id="huoshan" text="火山极速版" textSize="16sp" checked="flase" />
                            <checkbox id="weishi" text="微视" textSize="16sp" />
                            {/* <checkbox id="lizhi" text="栗子视频" textSize="16sp" />
                            <checkbox id="caidan" text="彩蛋视频" textSize="16sp"  />
                            <checkbox id="youyan" text="有颜短视频" textSize="16sp" />
                            <checkbox id="hongbao" text="红包视频" textSize="16sp" /> */}
                            <checkbox id="qimao" text="七猫免费小说" textSize="16sp" />
                            {/* <checkbox id="fanqie" text="番茄免费小说" textSize="16sp" />
                            <checkbox id="taokandian" text="淘看点" textSize="16sp" /> */}
                            <horizontal gravity="right">
                               <button style="Widget.AppCompat.Button.Colored" id="执行日常任务" text="执行" padding="12dp" w="auto" />
                              </horizontal>
                        </vertical>
                    </scroll>
                </frame>
                {/* Frame3 ， 配置参数设置*/}
                <frame>
                    <scroll>
                        <vertical>
                            <vertical>
                                <text text="循环次数（每个APP打开次数）：" textColor="red" padding="8 8 8 8" />
                                <input id="txtForeachTimes" text="1" hint="每个App被打开的次数" inputType="number" padding="8 8 8 8" />
                            </vertical>
                            <vertical>
                                <text text="滑动屏幕次数（每个App被滑动屏幕次数）：" textColor="red" padding="8 8 8 8" />
                                <input id="txtScreenSileTimes" text="2000" hint="每个App被滑动屏幕次数" inputType="number" padding="8 8 8 8" />
                            </vertical>
                            <vertical>
                                <text text="屏幕滑动时间间隔(秒)：" textColor="red" padding="8 8 8 8" />
                                <input id="txtScreenSileTimesInterval" text="12" hint="视频之间的滑动时间间隔" inputType="number" padding="8 8 8 8" />
                            </vertical>
                            <vertical>
                                <Switch id="autoService" text="开启无障碍服务" checked="{{auto.service != null}}" textColor="red" padding="8 8 8 8" textSize="15sp" />
                            </vertical>
                            <vertical>
                                <Switch id="switchEnbleFloating" text="开启悬浮窗" checked="{{auto.service != null}}" padding="8 8 8 8" textSize="15sp" textColor="red" />
                            </vertical>
                            <vertical>
                                <Switch id='switchIsShowConsole' text="是否开启控制台：" padding="8 8 8 8" textColor="black" />
                            </vertical>
                  
                            <horizontal>
                                <button style="Widget.AppCompat.Button.Colored" id="保存配置" text="保存配置" padding="12dp" w="*" />
                            </horizontal>
                        </vertical>
                    </scroll>
                </frame>
                {/* Frame4 ， 邀请码 */}
                <frame>
                    <scroll>
                        <vertical>
                            <vertical>
                                <list id="复制">
                                    <horizontal h="40">
                                        <text id="txtAppName" textSize="16sp" textColor="#000000" text="{{AppName}}" textColor="#228B22" />
                                        <text id="txtAppCode" textSize="16sp" textColor="#000000" text="{{AppCode}}" textColor="#228B22" />
                                        <button text="复制" id="复制邀请码" style="Widget.AppCompat.Button.Borderless" w="52" textColor="#FF7F50" />
                                    </horizontal>
                                </list>
                            </vertical>
                        </vertical>
                    </scroll>
                </frame>
                {/* Frame5 ， 软件注册及登录 */}
                <frame>
                <vertical padding="10 10 10" >
                    <text id="t1" size="{{字号*2}}sp" color="{{字体颜色}}" marginTop="50" paddingLeft="35"/>
                    <input id="ID" w="*"  marginRight="30" marginLeft="30" singleLine="true" hint="账号" textColorHint="{{字体颜色}}"/>
                    <text id="t2" size="{{字号*2}}sp" color="{{字体颜色}}" marginTop="10" paddingLeft="35"/>
                    <input id="Password" w="*"  marginRight="30" marginLeft="30" singleLine="true" hint="密码" textColorHint="{{字体颜色}}" password="true"/>
                    
                    <checkbox id="isRemember" text="记住密码" marginLeft="30"/>
                    <button id="Login" style="Widget.AppCompat.Button.Colored" h="{{字号*11}}px" size="{{字号*2}}sp" marginTop="20" marginRight="30" marginLeft="30">登录</button>
                    
                    <horizontal paddingLeft="40" paddingTop="10">
                        <text id="Forget" size="{{字号*1+4}}sp" color="#00aadd">忘记密码</text>
                        <text id="Register" size="{{字号*1+4}}sp" color="#00aadd" marginLeft="5">注册账号</text>
                        <text id="Exit" size="{{字号*1+4}}sp" color="#00aadd" marginLeft="5">推出软件</text>
                        <text id="注销软件" size="{{字号*1+4}}sp" color="#00aadd" marginLeft="5">注销软件</text>
                    </horizontal>                    
                   
                </vertical>
                </frame>
                
                {/* Frame6 ， 软件激活 */}
                <frame>
                <vertical padding="10 10 10" >
                    <text id="btn获取激活码" size="{{字号*1+4}}sp" color="#00aadd">获取激活码</text>                       
                    <vertical>
                        <text text="软件激活码：" textColor="red" padding="8 8 8 8" />
                        <input id="txt激活码" text="" hint="先登录，获取激活码" inputType="number" padding="8 8 8 8" />
                    </vertical>                
                    
                    <horizontal>
                        <button style="Widget.AppCompat.Button.Colored" id="btn激活" text="激活" padding="12dp" w="*" />
                    </horizontal>
                </vertical>
                </frame>
                {/* Frame7 ， 软件开发日志  */}
                <frame><vertical>
        <appbar>
            <toolbar id="toolbar" title="辅助助手开发日志"/>
            {/* 颜色选取 用（大漠综合工具）*/}
        </appbar>




        <card w="*" h="70" margin="10 5" cardCornerRadius="2dp"
            cardElevation="1dp" gravity="center_vertical">
            <vertical padding="18 8" h="auto">
                <text text="版本=v1.0.4'" textColor="#222222" textSize="16sp"/>
                <text text="2020年10月9日" textColor="#999999" textSize="14sp"/>
                <text text="2020年10月9日,完成热更新。1.parseInt，函数间传值转换数值，添加APP切换之前清空APP。" textColor="#999999" textSize="11sp"  />
                </vertical>
            <View bg="#df0024" h="*" w="10"/>
        </card>
        <card w="*" h="70" margin="10 5" cardCornerRadius="2dp"
            cardElevation="1dp" gravity="center_vertical">
            <vertical padding="18 8" h="auto">
                <text text="版本=v1.0.3'" textColor="#222222" textSize="16sp"/>
                <text text="2020年10月3日" textColor="#999999" textSize="14sp"/>
                <text text="2020年10月3日,完成热更新。1.完成热更新，以模块分离主程序。" textColor="#999999" textSize="11sp"  />
                </vertical>
            <View bg="#df0024" h="*" w="10"/>
        </card>
        <card w="*" h="70" margin="10 5" cardCornerRadius="2dp"
            cardElevation="1dp" gravity="center_vertical">
            <vertical padding="18 8" h="auto">
                <text text="版本=v1.0.2'" textColor="#222222" textSize="16sp"/>
                <text text="2020年09月28日" textColor="#999999" textSize="14sp"/>
                <text text="2020年09月28日,完成热更新，不用再多台设备更新，测试更加方便，真香。" textColor="#999999" textSize="11sp" />
            </vertical>
            <View bg="#df0024" h="*" w="10"/>
        </card>


        <card w="*" h="70" margin="10 5" cardCornerRadius="2dp"
            cardElevation="1dp" gravity="center_vertical">
            <vertical padding="18 8" h="auto">
                <text text="版本=v1.0.1,快手极速版，任务开发" textColor="#222222" textSize="16sp"/>
                <text text="2020年09月27日" textColor="#999999" textSize="14sp"/>
                <text text="2020年09月27日，快手极速版，任务：1.福利2.看直播" textColor="#999999" textSize="11sp"/>
            </vertical>
            <View bg="#528412" h="*" w="10"/>
        </card>


        <card w="*" h="70" margin="10 5" cardCornerRadius="2dp"
            cardElevation="1dp" gravity="center_vertical">
            <vertical padding="18 8" h="auto">
                <text text="版本=v1.0.1 ,2020.01.01开始辅助开发" textColor="#222222" textSize="16sp"/>
                <text text="2020年1月1日" textColor="#999999" textSize="14sp"/>
                <text text="创建模板，main,dome,modules(函数集合)" textColor="#999999" textSize="11sp"/>
            </vertical>
            <View bg="#044476" h="*" w="10"/>
        </card>



    </vertical>
                
                </frame>
                
                
            </viewpager>
        </vertical>
        {/* drawer */}
        <vertical layout_gravity="left" bg="#ffffff" w="280">
            <img w="280" h="200" scaleType="fitXY" src="{{rootUrl}}/615507937/lTtoiMh853T44545OP42/赞赏码.jpg" />
            <scroll>
                <list id="menu">
                    <horizontal bg="?selectableItemBackground" w="*">
                        <img w="50" h="50" padding="16"  src="{{icon}}" />
                        <text textColor="black" textSize="15sp" text="{{title}}" layout_gravity="center" />
                    </horizontal>
                </list>
            </scroll>
        </vertical>
    </drawer>
);


/**
 * 登录区
 */



ui.ID.on("touch", () => {
    ui.t1.setText("账号")
    ui.ID.setHint("")
    if (ui.Password.getText() == "") {
        ui.t2.setText("")
        ui.Password.setHint("密码")
    }
})

ui.Password.on("touch", () => {
    ui.t2.setText("密码")
    ui.Password.setHint("")
    if (ui.ID.getText() == "") {
        ui.t1.setText("")
        ui.ID.setHint("账号")
    }
})

ui.ID.on("touch", () => {
    ui.t1.setText("账号")
    ui.ID.setHint("")
    if (ui.Password.getText() == "") {
        ui.t2.setText("")
        ui.Password.setHint("密码")
    }
})


ui.Login.on("click", () => {
    if (ui.Password.getText() == "") {
        ui.t2.setText("")
        ui.Password.setHint("密码")
    }
    if (ui.ID.getText() == "") {
        ui.t1.setText("")
        ui.ID.setHint("账号")
    }
})
ui.Exit.on("click", () => {
    exit()
})
ui.注销软件.on("click", () => {
    var hsyStorage = storages.create("huangshao_yi@163.com");//创建本地存储
        hsyStorage.put("ID", "");
        hsyStorage.put("Password",  "");
        toast('注销成功！')
})

ui.Login.on("click", () => {
    var isRemember = ui.isRemember.isChecked();
    if (isRemember) {
        log("记住密码");
        var hsyStorage = storages.create("huangshao_yi@163.com");//创建本地存储
        hsyStorage.put("ID", "" + ui.ID.getText() + "");
        hsyStorage.put("Password", "" + ui.Password.getText() + "");
    }

    if (ui.ID.getText() != "") { //如果账号是空的,请输入账号
        if (ui.Password.getText() != "") {//如果密码是空的,请输入密码
            log(ui.Password.getText())
            log(ui.ID.getText())
            log(账号[ui.ID.getText()])
            if (ui.Password.getText() == 账号[ui.ID.getText()]) {
                toast("正在登录")
                threads.start(function(){
                var date = new Date();
                var seperator1 = "_";
                var seperator2 = "_";
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
                    "_" + date.getHours() + seperator2 + date.getMinutes() +
                    seperator2 + date.getSeconds();
                    // log(currentdate)
                var login_info = {
                    ID: ui.ID.getText(),
                    Password: ui.Password.getText(),
                    currentdate: currentdate
                }
                log(login_info)//存放登录数据
                    })
            } else {
                dialogs.alert("输入的账号或密码有误，请重试", "", () => {})
            }
        } else {
            ui.Password.setError("请输入密码")
        }
    } else {
        ui.ID.setError("请输入账号")
    }
})

//***************登录区END************** */


//设置滑动页面的标题
ui.viewpager.setTitles(["主界面","日常任务", "配置", "推荐码", "注册登录", "激活", "日志"]);
//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);
var items = [
    { AppName: "============视频类============", AppCode: "" },
    { AppName: "1、快手极速版", AppCode: "23qpavy" },
    { AppName: "2、抖音极速版", AppCode: "832921214" },
    { AppName: "3、刷宝短视频", AppCode: "A2XP39U" },
    { AppName: "4、火山极速版", AppCode: "209558624" },
    { AppName: "11、七猫免费小说", AppCode: "5L482Q" },
    // { AppName: "5、彩蛋视频", AppCode: "A162141619" },
    // { AppName: "6、刷爆短视频", AppCode: "2021337227" },
    // { AppName: "7、红包视频", AppCode: "vu2226878" },
    // { AppName: "8、快刷视频", AppCode: "21337227" },
    // { AppName: "9、有颜短视频", AppCode: "27201029371" },
    // { AppName: "10、种子视频", AppCode: "30183757" },
    { AppName: "============小说类============", AppCode: "" },
    // 
    { AppName: "12、番茄免费小说", AppCode: "1849623318" },
    // { AppName: "13、今日头条极速版", AppCode: "1849623318" },
    // { AppName: "14、看点快报", AppCode: "SLVJLQC" },
    // { AppName: "15、步多多", AppCode: "6278618227" },
    // { AppName: "16、猫扑运动", AppCode: "375011245" },
    // { AppName: "17、走路赚钱", AppCode: "KCHRMAP2" },
    // { AppName: "18、淘看点", AppCode: "399479" },
    // { AppName: "19、免费淘小说", AppCode: "A74219742" },
    { AppName: "小米应用商店该有的都有", AppCode: "http://app.mi.com" },
];
ui.复制.setDataSource(items);
activity.setSupportActionBar(ui.toolbar);

 
// 用户勾选无障碍服务的选项时，跳转到页面让用户去开启 android.permission.SYSTEM_ALERT_WINDOW
ui.autoService.on("check", function (checked) {
    if (checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if (!checked && auto.service != null) {
        auto.service.disableSelf();
    }
});
// 用户勾选无障碍服务的选项时，跳转到页面让用户去开启 
ui.switchEnbleFloating.on("check", function (checked) {
    if (checked && auto.service == null) {
        app.startActivity({
            action: "android.permission.SYSTEM_ALERT_WINDOW"
        });
    }
    if (!checked && auto.service != null) {
        auto.service.disableSelf();
    }
});
// 当用户回到本界面时，resume事件会被触发
ui.emitter.on("resume", function () {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;
});


main();
/**
 * @param {测试用} msg 
 */
function main(msg){
    threads.start(function () {
        msg='测试用'
        /**测试wools模块 */
        
        // /**测试通用执行 */
        // var appArrayrc = getAppList();
        // for(var i=0;i<appArrayrc.length;i++){
        //     log(appArrayrc[i])          
        // }

        // if(files.isFile('./modules/woolfeels.js')){
        //     log(woolfeels.测试模块是否可用);
        //     var woolStorage = storages.create("huangshao_yi@163.com");//创建本地存储
        //     var foreachTimes = woolStorage.get("foreachTimes");
        //     var screenSileTimes = woolStorage.get("screenSileTimes");
        //     var isShowConsole = woolStorage.get("isShowConsole");
        //     var timesInterval = woolStorage.get("timesInterval");
           
        //     log(appArrayrc, foreachTimes, screenSileTimes, isShowConsole, timesInterval);
        //     woolfeels.woolfeel(appArrayrc, foreachTimes, screenSileTimes, isShowConsole, timesInterval);
    
        // }



        // /**测试更新文件 */
        // 测试更新模块()
        // function 测试更新模块(){
        //     var app返回结果= bmob.BQL("select * from vesionup where softName='私房钱辅助助手'").results
        //     log('文件个数：'+app返回结果.length)
        //     for(var i=0;i<app返回结果.length;i++){
        //         if(files.isFile('./modules/热更新.js')){
        //             热更新.更新(app返回结果[i].jsUrl,app返回结果[i].fileTree,app返回结果[i].jsName)
                    
        //         }
        //     }
        // }


        // /**测试时间模块 */
        // if(files.isFile('./modules/Time.js')){
        //     log(Time.时间)
        //     log(Time.getTime)
        // }


        // /**测试前端app选取模块 */
        // var appArrayrc = getAppList();
        // for(var i=0;i<appArrayrc.length;i++){
        //     log(appArrayrc[i])          
        // }


    });
    
}



// 启用左右菜单栏
加载左上角菜单栏();
加载左右角菜单栏();
加载初始化数据();

/**
 * @param {左上角菜单栏} msg 
 */
function 加载左上角菜单栏(msg) {    
    msg="左上角菜单栏"
    ui.menu.setDataSource([
        { 
            title: "更新日志",
            icon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAC8klEQVRYR82XT2sTQRjGn3cTaG8mG28eqrATEQ8NePIiFRFURCoigohWVOxORNtP0PQTmKKZHEQoRQQtUpQigmjrBxDqRbGzYj140kziLaXpjszalDSm+bOxxDkF8s7z/N5535nZIfR4UI/90RTAFvJpN4Da1zPFW8n5ZhoNAezc5wzIugngdjcAAE4S4UjBZc52Oo0BhPyuONvTpXkwfff9L0ltrY8XeNJtpPcXwMayzyrOZv8FgNGIC7lQ5OxozwBsId8ozo71EGD5teLJ410BxPKf9qLcXwpE+suxkntgpSoYyy2nQLRri8Fq9ENpfF8Qb+flK+WyE10BJIRc1KABQBvRlOJss39sIZcADNYZjCvOsgGAkC8VZ6dCAZjsLKIrAMbqBLIW4flPly22alZbePOKO6dDASSEN6yh5wB881ejKSNi9VWM6SA0JlWaZVoBJIR8UeDsTCiAjSXUBLwrcDb0p6ZeFlrf8VejcVPnViWIC2+uyJ2zoQDsnMyAMBFM1nqMNK1oC9MAYiCaUq4zZsoUtShWa1ApR5c2m1B4zxR3zoUCiN39Gov2V1K+DkwHNkR+EWhkndaWanfDdqWw83JWuex8KIDqJFssT4OsEnxdAmFYcRb0Q7UkWustuyBCmKw2qJ2TT1SaXegKoFmjmTIRIegPM3xCKQJkNwHy3mPlOhd3DKDlLsjLRwWXXQoFkMgtj2jLHECdDb8cnao2YVzImSJnl0MB2EKaI7djANL6aiGdNI0L0z+KJ0dCAXSWd+NoOy8fKpdd6x2A8B4o7twIBWALaS6frTdde8tScxl1AdDolGvHv+4kDL8C7Zi1irG7KUEr8Xb+j+fk+2KaHQrVA+0YNIsxH6SkdR+IDsPCQTXKPtbG7+hnefC+AKDS+zOxe3LIsvwh87s1QF5OQGO07YeJBU0+VXzQGpFfIdBawXXeGqNEXnrrFVy3IliIaGI/0o7XEqAaUM0gTBlqMzU69ZlXNf/vx2mYzDud8xtjzpswrqCXXwAAAABJRU5ErkJggg==" },
        { 
            title: "检查更新",
            icon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADnUlEQVRYR+2WTWgcZRjHf890k6KoTQ8F6xcRRcXWj9DubKmXFLQoRCtCg1KwTYspFrzYmJ3RwzYHs7PRXvSgCW20wQ9owWDAQ6jS3NZMElqKGkKbUhE/etBCDqE2yTwy484yHbLZ2cS2F9/bzPs8//+f//O8z/sKN3nJTebnfwE1O5Ap6DOesl3gceAJgQWFCWBShG9Hs3KylrImFmDm9RDCC0BTFYLTKEOuLYeSCEkkwCxoDiUO+AfwO+AJrFe4K0Y46FryUjURVQVkHD2p8HQIpEKf4dE3aotve3ll8rrJM2gXpT3y+xvXkpalRCwpwCxoD8pbJYApPNrct6W4FKDZoy3i0Vt2RHjdzcrHlXIWFZA+rPfKPDtQPiwlXnItubOandF909FzwIPBP+ENTfH12EH5JY5xjYDNeW0SoVMImu3WcrDS6tpyohYBfklUGI/kzCoMGcr70fKVBfjHS5VPgLujRH7Nx7KyvxbyMDbt6CmB5miuwG8Ke11Lhv81B9ic12ZDOBUJPIrBd6tSDBfflL+WQx7mPJnThvrVNCO0IrwS/veUbeO2jAQCokoNYcf3WRlaCWml3IyjHQrv+fsKI2OWbJPSgMmVkj5yLTlwPchDzExe21XoDb6VLkk7+qXAyygzri1rrid5iG06OgPcDgyK6egU8BDwo2vJxhshIO3opMAjwLSYBb2M0oBSdG3ZeiMEmI76w2yL77rvwCDwInDRteT+WgXs2pW7Y9Utc40DR7rPJs01Hf0ZuA8Y9h3IojjAVUnRNNohPyUFamuzH/UMjgMbVLVroN+pegNuyWujJ/hlrw+aMJPX7SoEQ6GWPoiSBwNFtfPTfic4Ykut2HB6NpgDpqP+uX++lHh6wWDnRKdMVwKKkyucGDiab61CvFXgc6CxFNfjWpINBDz3ga7+c5YrEYBZFT7Do4jHmbF35Ey4FyefT60ZmWrMdlUiF+EeEZ5C2RvYXloLa6mf2C9z5bugqVvX1Rt8Eb37w2BJsSHsjd37bH9kB/N95rbH+HV9ebpWcz/cn/SUlnFbLgSli2elC3pAlNf8xgLqgqCIgFf32ccFdtYo4KrCDyJ85Wbl3ShnxQfJpl6tkxkerpvnStGW88stQcrg0tw05yf6ZG4xi6o+yRZLWk4TVuyRpIWLx8VFoHL4WH93R614y3JgsXIkHURxgSsS4IPt2ZNr0NTfDxw74lzzSk7qxIoFJCX6z3tgpcRh/j9lvlrSBRsylQAAAABJRU5ErkJggg==" },
        { 
            title: "教程",
            icon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAgCAYAAACLmoEDAAAD4ElEQVRYR+1YXWgcVRg9350UpQ91d5NspIhE3UmqghQS3QqKqaDQ6osgYhUK+mBxkpYWoXlRqNSH4oMVutm2YlX6WKWiD33og11FSJEGxAdLMhsLFtLuJp0NrURMM/fIXXZkMk3qTEeDlVy4cO/wfec797vn/swVhErmkDsgFp4RIG8qyS4A+VY1lnVTRaRGoG6qCL7DdYx6u+yrAVTm4IWMdcf8gIZ6NC1WmJ+YTrb8yyOA/4kAfQBOE6gJ2CSkiGltWXUsAErYQaBThJ1sDkLyAJ8DMEWo/Q3ngSO5I+5D0DgB4GEA3wBSJ/S0gqoTvEzhZYille/ntaCzmRRIlwAmMc8CuKh9bJ/daVfCRE1bug5X89fJGsCPKOr4gvLHr+3onYkaLtVff/Tc2jl9V68FeZnkXhFsJ3Ec1O9S1pxsOPf/FAcnsGkvTRSp8Dogb6wR6aq9WTAz+VeRXNn9AsBaz7G3JgGO2ubK7gmQWyHqZ88pPJYS6xSAOc+xX4yS/VUo718ZLJTSBGgvVd+m4n6A73lOzzupsEaqQxTu9Rz73ihZah+bl9JIkoCZkrtbKRzUGntmh+wPk/hGbc1CVxbOeI7dXFNBMTK4gawxjhssGGQQIDrwNFixyGbL7hkBYhEOAJcja5IRZ+AEKg3H3mxsE2U2DvhyU/ePSCqJDFbJJshAIhkYzcbFjuosKoM0WLEX2G1DNi7RsN1yu0EarFiZTRPgf70bmItUkJzg4pJ4gd3sUIhOT3gjT5rZjtJkj1Z6XEH6Z5zCWOJD4e+OyKXuEbeq2dRkV0KzweCisczMmG+xLzIrRlbpAQLtImrIXP5BXtJaNf8Q/lNkg4TcFjIIk6XSuwVy7JYW2ErI4GYxEm1dq2QTZGDZzGbLrqvI4SuDPScT4N1gmi27wwIcAPRbntP7QSqskcltInrEc+xcGEdy5YmjZsvwBnv3RQN0lKt9PtAn9NcD1m+iWKNGTc+3/TC7577ZsH1uxD0mgldJfSCK1f3phTuv/r6wkeBGIe8O/AhVb4Ocnh4sVBdjje+jqOcbjt2/iGy2XN0i4CmIfCb0vyLUUwSebL3OGNspAhMtp3sEKLTaPwKoCPS3GvK0QHaC/BIiLxA8pIgKRbZA8ASIDS2fCQJTpi2CB8HmK4wpZ0GMao2vlcVt5pEDwEueY3++iKzp5MqTrwF8BaB5nBgF9VmqtnOWssZmdnRfCjus+/hizpr/oyj0ixC1CcDjANYZgg2nZ1cIq5+QihDfa82xtjl/bGZ4w7UwVubw+W6lVRFQRShsAptYMC86S830ov/yNDpbCd9Vsv9Wlv8E0mP+P0I4oqkAAAAASUVORK5CYII=" },
        { 
            title: "关于",
            icon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAE3ElEQVRYR61Xa4hUZRh+3jOrK1G7M2fGtIug654xS1IqSIpCKKlMtCL3RyCx5YU940oKJmSQCxoUhOU232Sp+K/UH1mkGRiKGV0oumDFzhnTMipx58xgCO26c574zjmj42Vmzkrn38z3vO/7fO/9E0T8EluOtRuet4DkQoF0EEgBkgzEWRRgkEBePG+nnOWBwbW3/BNFtTQDJbP56RDpJfAUgPZm+PC8JMB7IPuLmfQvjWQaEkjk8huE0gugLVRyBsAXAhwmcYpi/K3/F3oTRTCB4D0QmQtibBVPYX+pJ/1iPRJ1CZjK2QVgkS8o8qlHbi6nhvaja8Zwoxu1bT1pxoaHngS4TIA7wxB95trp+68kd0UCpiocBzg5FFjq2tbWiK6/CJZQhWUCbglJDLp2evylei4jYKr8aUBSfmohNrNkd/x4NcarMglVeETAfcFvOeHanVNq9V1EwFT5w4DcpwGubTVN0NEQM5XDEL/bta2uqux5I2HCrQtuLvNKdufHUQyYbzm3soI59PBzudc6VE8moX69XVD5wdcv3FhNTJ+ALjWKfBlme+SYj88evbYirVruNt8wvT43M219PRKmcpYAeAfAGSFn6xINCChHEejR2e72dD4Y5eYaE+935hgxHLyAp+va6bA5XVmLmSscAPmAALmibdk+AVM5vwOY5AELy7b1YVQC120ZSI2pGKfP40V2uD2d3Y3k48pZYAAfAPjTta2bJJ49PsuQke8AlN1TQxPQ17jOL1VuKmeRAIsJDrh2ek1T8ruOjjUHWzXpNhHvbknmCitJvkHInpLd+XhTBf8DwFTOfgAPgVgtZtbZBsEzAqwr2tbLo9Xf/qZzhxBtjSrgUp1J5bxAYCOI7WIq5wiAe0EscTPWtqgEJuQK1w97XAXBKgFam1VArV4z6zwLge6un2sCOh4pwphfsqfujUIgofKbBaJ7+8wafJdrW7ujyR97VOB9BGBw1AT8IUW2VCqyJtaCQtWgERtz4+DyyX+NhgCJ01cdgnY10BGDcSzonPi2ZFt3RTHul30YAgKHrjoJE+q8G5t2wHpJSELpMlxBsh/gXtdOz496i4QqrBHw1aAFjy6Bq2UoZLfoYQIPP0EwPDJm3A1nlkxyo5Aws/m9EJnnYwUPuz3WJ4lcYQb/jf1RXjWlXFdHTSPyZGRKtRUf1QOFkOUlu/PtSASUcw5AS0BAdoDeOAF3Fu1pexrJJ9XAY4TxPsiv3Ex6djgNC+so3BA1mXQPOEeeqjVEcm0pkw5CUueLbzoeN1pH9PCaVb1s4IHNThtaoMfq9CheiGfzswwRrSgOcICM9ZUyU99t5jlTOZsAPFd70ZqFxOkRQgU51Xwh0aNYY6O2YFPluwHZ7keM7C5m0juC9Kn5ajfh/3MlM5UzG4AeQPpdsdW1raVVs5cvpVnnJAQ3R/VEM7fr84RyDgqgPfa158W6yis6fqtLIBT45sJOj9e9oZa+hqXVhIWZHVgPMV4KLsX+kp1e2ZCAPkzmCq+QfD4Efi/w+oqpc/uaPUzqcTGVsxrAa+H5bncEi7HSGmq4eiez+Sc8kd7QfVr2sqcZK97ZKGHwE67Fmyg0gmohj1SET0fa/f1tVtAFYm5UY1Fw/jCKAqxizGxhkgALabCDREpEkiSvGY2OWqyInPgPdzcwBtuCmgYAAAAASUVORK5CYII=" },
        { 
            title: "退出" ,
            icon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADd0lEQVRYR+2XS4hcRRSGv7o9pnHR4/TtnoVBhJDUBE2UiLrxEaISV+LCx+DaxBiqJxGi4iNrxQhGzKTLCYLiwoWOsxIRA5r4wo34IFEmXRnduFFmqmOycYaZKqmem9jT3u7b3bZkY8GFpuucU9/969SpcwWXeYjLvD59A8TarAR4W168kvGtS/2+yL8B8AlA/j8DKGmjF5RUaW8Xa9MRoKhrR+pqbH+WMqkKFI/NXcuKe1vADqtkqk1Jmz895G15MVWBBPBjrmC3fUz+2g4kNXiszSfA3UDNKrk5zbkLgNPAFuBTq+Q9XQMUtXlGwEvABbfC/ef2yZN9AUyZ63G8FyA8PFtX8lBanDUKjFR/2RaJ5c+BAvhHrRp7qx15lgLBb+R1c1PkCfG880Pbz1U2fN8abw1ArM0rwAFg2io53imBugEI/iVtnvPwInDYKvlkW4Dhw6fjofy6UwixPoqiW+f3bvxmEAAhRlyt/QzklxeXbjh/YKttjntJgWLVKCGoAu9aJR/JOj7dKtAA0OYNYLf3VOoVqVMBYl07BmKPJ7qvrjZ+OEiAkUmzI8pxAs+btiJ3pSugzYlw7kVu6LqFxzfMZgFkFaJm//LRuTEXuTPAV1bJO9ptwe9CMBrlR4bnd41eGCjAodmCK+TOA/NWydE2W2CCQYFlrrL7ZfjdccTaLCZ3QSHrLoiPmGGG+CPUFqvkcDuAINEYEVvsXvlTFkAv8/FqUfoxrbL+fQqSHADGrZLTvSyQZVuq1h7wQsx4OFlX8q5UBUraVDwc7aYIZS3YOl+smkkhmBBwcEHJUJQujSYFZm8U5H5ozDhusxPy614XSrNP9v8zYFtagWstxe8DDw5ShVjXXgbxNDBjlXyoFXINQFGfuVMQhcsDvHjKVjaFu6HvEU/VduLE8UY43Pa62vxFR4AwGToZgdjXOGJtmpFuiS4Wq3AZ1ZU8mOaX3hFpYwRsShx6PhWxNg9DoxcI4x/VLzUJW+libb4Ebk/+n8bxalZilvXZmx1uT7hTVmXnbF1J2Umxjl1xUZsXBDzfFOAjL3hHCL5jidU+bx3X4BqtV3jr8KymEH6y76a0mThJzCeS09HN9s943GtpCdd1DqQZlqfmbvHO3etgp4D1wNWAEILfvG88H+Q8x+cn5LfdUF606fvDpJdF+s6BQS3yP0AnBf4C4vh6MKas2UAAAAAASUVORK5CYII="
        }
    ]);
    ui.menu.on("item_click", item => {
        switch (item.title) {
            case "更新日志":
                // app.openUrl(rootUrl+"/app/WoolUpgradeLog.html");
                break;
            case "检查更新":
                threads.start(function () {
                    // 开发节点
                    var IMEI =device.getIMEI()
                    log('当前设备IMEI:'+IMEI)
                    //BQL查询 按版本号排序，显示页面从第2条记录开始显示1条记录，翻页可以使用
                    // log(bmob.BQL("select * from iPhone  where iPhoneImei='"+IMEI+"'").results[0])
                    // log(result)
                
                    
                    // 判断当前设备是否注册！！
                    var imeinull= bmob.BQL("select * from iPhone  where iPhoneImei='"+IMEI+"'").results.length
                    log("该手机是否注册："+imeinull)
                    if(imeinull=='1'){
                        var app返回结果= bmob.BQL("select * from vesionup where softName='私房钱辅助助手'").results
                        log('文件个数：'+app返回结果.length)
                        for(var i=0;i<app返回结果.length;i++){
                            if(files.isFile('./modules/热更新.js')){
                                热更新.更新(app返回结果[i].jsUrl,app返回结果[i].fileTree,app返回结果[i].jsName)
                                
                            }
                        }
                    }else{
                        log('该手机尚未注册，请注册！')
                    }
                    
                    //更新列表，包含新增js
                    //读取目录，勾选进行新增&更新
                });
                break;
            case "教程":
                    app.openUrl("https://blog.csdn.net/weixin_42900346/article/details/108333136");
                    break;
            case "关于":
                dialogs.build({
                    title: "关于",
                    positive: "确定",
                    items: ["纯属个人爱好，如果涉及到侵权请通知作者，作者会尽快解决相应问题。作者邮箱：huangshao_yi@163"]
                }).on("show", (dialog) => { }).show();
                break;
            case "退出":
                ui.finish();
                break;
        }
    });
    //让工具栏左上角可以打开侧拉菜单
    ui.toolbar.setupWithDrawer(ui.drawer);
}
/**
 * @param {右上角菜单栏} msg 
 */
function 加载左右角菜单栏(msg) {
    msg="右上角菜单栏"
    ui.emitter.on("create_options_menu", menu => {
        menu.add("教程");
        menu.add("关于");
        menu.add("退出");
    });
    ui.emitter.on("options_item_selected", (e, item) => {
        switch (item.getTitle()) {
            case "教程":
                app.openUrl("https://blog.csdn.net/weixin_42900346/article/details/108333136");
                break;
            case "关于":
                dialogs.build({
                    title: "关于",
                    positive: "确定",
                    items: ["纯属个人爱好，如果涉及到侵权请通知作者，作者会尽快解决相应问题。作者邮箱：huangshao_yi@163.com"]
                }).on("show", (dialog) => {dialog='声明内容' }).show();
                break;
            case "退出":
                ui.finish();
                break;
        }
        e.consumed = true;
    });
}
/**
 * @param {初始化UI和数据} msg 
 */
function 加载初始化数据(msg) {
    msg="初始化UI和数据"
    var woolStorage = storages.create("huangshao_yi@163.com");//创建本地存储
    var foreachTimes = woolStorage.get("foreachTimes");
    var screenSileTimes = woolStorage.get("screenSileTimes");
    var isShowConsole = woolStorage.get("isShowConsole");
    var timesInterval = woolStorage.get("timesInterval");
    var appInstallDateTime = woolStorage.get("appInstallDateTime");
    //登录数据
    var ID = woolStorage.get("ID");
    var Password = woolStorage.get("Password");
    
    if (ID != null) {
        ui.ID.setText(ID);
    }
    if (Password != null) {
        ui.Password.setText(Password);
    }

    if (foreachTimes != null) {
        ui.txtForeachTimes.setText(foreachTimes);
    }
    if (screenSileTimes != null) {
        ui.txtScreenSileTimes.setText(screenSileTimes);
    }
    if (isShowConsole != null && isShowConsole == "true") {
        ui.switchIsShowConsole.setChecked(true);
    } else {
        ui.switchIsShowConsole.setChecked(true);
    }
    if (timesInterval != null) {
        ui.txtScreenSileTimesInterval.setText(timesInterval);
    }
    if (appInstallDateTime != null) {
        var curTime = new Date();
        var currentTime = new Date(parseInt(curTime.getFullYear()), parseInt(curTime.getMonth() + 1), parseInt(curTime.getDate()), parseInt(curTime.getHours()), parseInt(curTime.getMinutes()), parseInt(curTime.getSeconds()));
        var appInstallDate = appInstallDateTime.toString().split("-");
        var getDay = appInstallDate[2].split(" ")[0]; //天
        var hourMM = appInstallDate[2].split(" ")[1];//时分秒
        var appInstallTime = new Date(parseInt(appInstallDate[0]), parseInt(appInstallDate[1]), parseInt(getDay), hourMM.split(":")[0], hourMM.split(":")[1], parseInt(0));
        var seconds=currentTime - appInstallTime;
        if (seconds/(1000 * 60 * 60 * 24)>3000000000000) {
            alert("已经过去3天了,烦请打赏一下作者，您的支持是作者最大的动力！");
            woolStorage.put("appInstallDateTime", "" + getTime() + "");
        }
    } else {
        woolStorage.put("appInstallDateTime", "" + getTime() + "");
    }
}


/**
 * @param {通用主窗口执行} msg 
 */
ui.通用执行.click(function () {
    log('通用划屏操作')
    threads.start(function () {
        if(!requestScreenCapture()){
            toast("请求截图失败");
            stop();
        }else{
            log('截图权限投放成功')
        }
    });
    
    threads.start(function () { 
        //在新线程执行的代码
        if(files.isFile('./modules/woolfeels.js')){
            var appArrayrc = getAppList();
            for(var i=0;i<appArrayrc.length;i++){
                log(appArrayrc[i])          
            }
    
            if(files.isFile('./modules/woolfeels.js')){
                var woolStorage = storages.create("huangshao_yi@163.com");//创建本地存储
                var foreachTimes = woolStorage.get("foreachTimes");
                var screenSileTimes = woolStorage.get("screenSileTimes");
                var isShowConsole = woolStorage.get("isShowConsole");
                var timesInterval = woolStorage.get("timesInterval");
               
                log(appArrayrc, foreachTimes, screenSileTimes, isShowConsole, timesInterval);
                woolfeels.woolfeel(appArrayrc, foreachTimes, screenSileTimes, isShowConsole, timesInterval);
        
            }
        }   

    });
});



    // var foreachTimes = ui.txtForeachTimes.getText();
    // var screenSileTimes = ui.txtScreenSileTimes.getText();
    // var isShowConsole = ui.switchIsShowConsole.isChecked();
    // var timesInterval = ui.txtScreenSileTimes
