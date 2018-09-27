//实现进度条的功能
//使用nprogress插件

//开启进度条 start
//NProgress.start();

//结束进度条
//NProgress.done();

// .ajaxStart()  => 在第一个ajax发送请求时调用
// .ajaxSend()  => 在每个ajax发送请求之前调用
// .ajaxSuccess()  => 在每个ajax请求成功时触发
// .ajaxError()  => 在每个ajax请求失败的时候触发
// .ajaxComplete()  => 在每个ajax完成时触发,不管成功还是失败都会调用
// .ajaxStop()  => 在所有的ajax请求结束时触发

//需求:在发送第一个ajax的时候,开启进度条,当所有的ajax请求回来的时候结束进度条

$(document).ajaxStart(function(){
    //开启进度条
    NProgress.start();
});
$(document).ajaxStop(function(){
    //关闭进度条
    NProgress.done();
})