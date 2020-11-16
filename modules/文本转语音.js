var 文本转语音={};
 //此代码由飞云脚本圈整理提供（www.feiyunjs.com）
 importPackage(android.speech.tts);
 importClass(java.util.Locale);
 
 auto();
 
 var tts = new TextToSpeech(context, function(status){
     if(status != tts.SUCCESS){
         toast("初始化TTS识别: " + status);
         exit();
     }
     var r = tts.setLanguage(Locale.CHINA);
     if(r < 0){
         toast("不支持该语言: " + r);
         exit();
     }
     toast("TTS初始化成功");
 });
 tts.setOnUtteranceProgressListener(new UtteranceProgressListener({
     onDone: function(id){
         //stopQQVoiceRecord();
         //voiceConverting = false;
     }
 }));
 文本转语音.测试=function(){
     tts.speak("语音模块导入成功", tts.QUEUE_ADD, null);
 }
 文本转语音.说=function(teststr){
    //设定语速 ，默认1.0正常语速
    tts.setSpeechRate(1);
    log(teststr)
    // 设置音调，值越大声音越尖（女生），值越小则变成男声,1.0是常规
    tts.setPitch(1);
    //朗读，注意这里三个参数的added in API level 4   四个参数的added in API level 21
    tts.speak(teststr, tts.QUEUE_ADD, null);
 }

 module.exports=文本转语音;
 