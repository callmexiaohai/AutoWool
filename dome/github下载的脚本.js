
// 仓库名字="AutoWool"
// 作者名字="callmexiaohai"
// githubUrl="https://github.com/"+作者名字+"/"+仓库名字+"/archive/main.zip"
//    下载网址
// var url="https://codeload.github.com/snailuncle/AutojsUsesGitHubToUpdateCode/zip/master"
var url="https://codeload.github.com/callmexiaohai/AutoWool/zip/main"
githubUrl=url.replace('codeload.','').replace('zip','archive')+'.zip'
// log(githubUrl)

仓库名字=url.split('/')[4]
作者名字=url.split('/')[3]
// log(仓库名字,作者名字)


files.move("/storage/emulated/0/脚本/zip文件专用/test/AutoWool-main/modules/woolfeels.js","/storage/emulated/0/脚本/辅助小管家/modules/111.js" )
github下载的脚本=获取下载的脚本()
log("github下载的脚本=",github下载的脚本)
log('下载完成')
sleep(2000)
移动()
sleep(2000)
var a=files.cwd()+"/main.js"
engines.execScriptFile(a);


function 获取下载的脚本(){
  try{
    var r=http.get(githubUrl)
    log('code=',r.statusCode)  // code= 200 代表成功
    var zipFile=r.body.bytes()
    if(zipFile){
      var 代码路径=保存zip文件(zipFile)
      return 代码路径
    //   return files.read(代码路径) //文件太大，读取bytes 会报错
    }else{
      console.error('下载github代码失败')
      exit()
    }
  }catch(err){
      log('报错了....')
      console.error(err)
      exit()
        
  }
}

function 保存zip文件(zipFile){
  var path=files.join(files.cwd(),"zip文件专用dome/test.zip")
  files.createWithDirs(path)
  log("path=",path)
  // path= /storage/emulated/0/脚本/zip文件专用/test.zip
  files.writeBytes(path,zipFile)
  var r=解压zip文件(path)
  log(r)
  return r
}


function 解压zip文件(文件路径){
  //同一目录下的同一文件名
  var 文件夹路径=文件路径.replace(".zip", "")+"/"
  log('解压的文件夹路径=',文件夹路径)
  files.createWithDirs(文件夹路径) //如果文件不存在，创建一个文件，如果存在，返回 false
  com.stardust.io.Zip.unzip(new java.io.File(文件路径), new java.io.File(文件夹路径))
  return 文件夹路径+仓库名字+"-master"+"/main.js"
  
}


function 返回路径的父目录(path){
  var r=path.split("/")
  r[r.length-1]=""
  r=r.join('/')
  // 尾部带斜杆
  log("父目录=",r)
}

function 移动(){//遍历文件夹下所有的文件夹和文件
    log('开始移动')
  var dir = engines.myEngine().cwd()+"/zip文件专用dome/test/Autojs-main";
  var arr = files.listDir(dir);
  log(dir+arr.length)
  for(i=0;i<arr.length;i++){
    log("根目录："+i+'--->'+arr[i]);
      var arr1 = files.listDir(dir+"/"+arr[i]);
      if(arr1.length==0){
        var dir1=dir+"/"+arr[i]
        var arro=dir1
        var arrn=dir1.replace('zip文件专用dome/test/Autojs-main/','')      
        log('原文件路径：'+arro)      
        log('需移动文件路径：'+arrn)
        log(files.move(arro,arrn))
      }
      if(arr1.length>0){
        log(dir+"/"+arr[i]+"有："+arr1.length+"文件")
        for(ii=0;ii<arr1.length;ii++){
          log(arr1[i]+"目录："+ii+'--->'+arr1[ii]);
          var dir1=dir+"/"+arr[i]+"/"+arr1[i]
          var arro=dir1
          var arrn=dir1.replace('zip文件专用dome/test/Autojs-main/','')      
          log('原文件路径：'+arro)      
          log('需移动文件路径：'+arrn)
          log(files.move(arro,arrn))
        }
      }
  
  }
  
}
