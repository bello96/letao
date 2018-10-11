$(function(){

    //1.用户基本信息渲染
        //进入页面发送ajax请求,获取用户信息
        //后台判断用户登录状态
        //1.如果用户没有登录,会拦截到登录页
        //2.如果用户已经登录,返回用户的登录信息
    
    $.ajax({
        url:"/user/queryUserMessage",
        type:"get",
        dataType:"json",
        success:function(info){
            // console.log(info)
            if(info.error === 400){
                location.href = "login.html";
            } else {
                //得到用户信息,通过模板引擎渲染到页面上
                var str = template("userTpl",info);
                $("#userInfo").html(str);
            }
        }
    })

    //2.退出功能
    $("#logout").click(function(){
        $.ajax({
            url:"/user/logout",
            type:"get",
            dataType:"json",
            success:function(info){
                console.log(info)
                if(info.success) {
                    //退出成功,跳转到登录页
                    location.href = "login.html";
                }
            }
        })
    })

})