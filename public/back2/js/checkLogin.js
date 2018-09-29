 // 登录拦截功能
    //如果当前用户没有登录,就拦截到登录页
    //前端是不知道用户是否登录,需要发送请求获取用户登录状态
    $.ajax({
        type:"get",
        dataType:"json",
        url:"/employee/checkRootLogin",
        success:function(info){
            console.log(info);
            if(info.error === 400){
                //用户未登录
                location.href = "login.html";
            }
            if(info.success){
                //用户一登录
                console.log("继续访问吧")
            }
        }
    })