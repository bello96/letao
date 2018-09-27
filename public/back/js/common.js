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


//首页的公共效果
//1.二级菜单切换效果
//2.左侧菜单导航切换
//3.退出功能

$(function(){
    //1.二级菜单切换效果 
    $(".lt_aside .category").click(function(){
        $(".lt_aside .child").stop().slideToggle();
    })

    //2.左侧菜单栏切换
    $(".icon_menu").click(function(){
        //点击的时候让左侧边栏的left为负值到浏览器外,右侧的上面和下面让padding-left值为0就可以了,然后加上动画,就可以实现这个功能
        $(".lt_aside").toggleClass("hidemenu");
        $(".lt_main").toggleClass("hidemenu");
        $(".lt_main .lt_topbar").toggleClass("hidemenu");
    })

    //3.右侧退出功能,显示,模态框
    $(".icon_logout").click(function(){
        //点击的时候弹出模态框
        $("#logoutModal").modal("show");
    })

    //4.弹出模态框,点击退出登录
    $("#logoutBtn").click(function(){
        //退出功能,应该调用后台提供的接口,在服务器端销毁该用户登录的状态
        //location.href = "login.html" 这种是直接跳转 并没有退出
        $.ajax({
            url:"/employee/employeeLogout",
            type:"get",
            dataType:"json",
            success:function(info){
                // console.log(info);
                if(info.success) {
                    //退出成功,跳转到登录页
                    location.href = "login.html"
                }
            }
        })
    })

    
})