//可以用指令保存项目 auto.js:save Project,也可以在auto.js手动新建项目，运行一下代码保存指定路径
移动文件('辅助小管家','','main.js')
移动文件('辅助小管家','','dome.js')
移动文件('辅助小管家',"modules",'版本.js')
移动文件('辅助小管家',"modules",'快手滑块.js')
移动文件('辅助小管家',"modules",'人工划屏.js')
移动文件('辅助小管家',"modules",'funs.js')
移动文件('辅助小管家',"modules",'Time.js')
移动文件('辅助小管家',"modules",'woolfeels.js')
移动文件('辅助小管家',"modules",'wools.js')
移动文件('辅助小管家',"modules",'Bmobmodules.js')
移动文件('辅助小管家',"modules",'热更新.js')
移动文件('辅助小管家',"modules",'woolStorages.js')
移动文件('辅助小管家',"modules",'文本转语音.js')
移动文件('辅助小管家',"modules",'加载初始化数据.js')
移动文件('辅助小管家',"",'github下载的脚本.js')
移动文件('辅助小管家',"",'转文件到工程.js')
移动文件('辅助小管家',"modules/快手极速版",'快手日常1000金币悬赏.js')
移动文件('辅助小管家',"modules/快手极速版",'快手日常看直播.js')

移动文件('辅助小管家','help','Autojs开发.md')
移动文件('辅助小管家','help','README.txt')


// 移动文件('私房钱','Bmob')
/**
 * 
 * @param {移动文件} msg 
 */
function 移动文件(项目名称,项目目录,fileName){
    fileNameq=fileName.split('.')[0]
    fileNameh=fileName.split('.')[1]
    if(项目目录==""){

        var oldpath=engines.myEngine().cwd()+"/"+fileNameq+'.js'
        var newpath=engines.myEngine().cwd()+"/"+项目名称+"/"+fileNameq+'.js'
        log(oldpath+'复制到:'+newpath)
        files.copy(oldpath, newpath)
        log('复制成功')
    }else{
            var oldpath=engines.myEngine().cwd()+"/"+fileNameq+'.js'
            var newpath1=engines.myEngine().cwd()+"/"+项目名称+"/"+项目目录+"/"+fileNameq+'.js'
            var newpath2=engines.myEngine().cwd()+"/"+项目目录+"/"+fileNameq+'.js'//av直接测试用
            // log(oldpath+'复制到:'+newpath1)
            // log(oldpath+'复制到:'+newpath2)
            files.copy(oldpath, newpath1)
            files.copy(oldpath, newpath2)
            // log('复制成功')
            //转md文档
            if(fileNameh=='md'){
                files.rename(engines.myEngine().cwd()+'/'+项目名称+'/'+项目目录+"/"+fileNameq+'.js', fileNameq+'.md'); 
                files.rename(engines.myEngine().cwd()+'/'+项目目录+"/"+fileNameq+'.js', fileNameq+'.md'); 
                // log("重命名成功："+engines.myEngine().cwd()+'/'+项目名称+'/'+项目目录+"/"+fileNameq+'.js')
            }
        }
            
    
}
