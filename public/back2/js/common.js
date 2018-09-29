//实现进度条的功能
//开启进度条
$(function(){
    $(document).ajaxStart(function(){
        NProgress.start();
    })
    $(document).ajaxStop(function(){
        NProgress.done();
    })
})


// 公共的效果
//1 二级菜单切换效果,
//2 左侧菜单切换
//3 退出功能



$(function(){
//1 二级菜单切换效果,
    $(".lt_aside .category").click(function(){
        $(".lt_aside .child").stop().slideToggle();
    });

//2 左侧菜单切换
    $(".icon_menu").click(function(){
        $(".lt_aside").toggleClass("hidemenu");
        $(".lt_main").toggleClass("hidemenu");
        $(".lt_topbar").toggleClass("hidemenu");
    })

//3 退出功能,单机显示模态框
    $(".icon_logout").click(function(){
        $("#logoutModal").modal("show");
    });
    //点击确定按钮退出模态框
    $(".logoutBtn").click(function(){
        // location.href = "login.html";
        //退出功能应该调用后台提供的接口,在服务器端销毁该用户的登录信息 
        $.ajax({
            type:"get",
            url:"/employee/employeeLogout",
            dataType:"json",
            success:function(info){
                // console.log(info);
                // 退出成功,跳转到登录页
                location.href = "login.html";
            }
        })
    })

   
});





