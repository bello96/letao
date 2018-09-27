//这个js功能,用户拦截未登录的用户
//5.登录拦截功能
    //如果当前用户没有登录,需要拦截到登录页,
    //但是前段不知道用户有没有登录,所以需要向后台发送请求获取用户登录状态
    $.ajax({
        type:"get",
        url:"/employee/checkRootLogin",
        dataType:"json",
        data:{

        },
        success:function(info){
            // console.log(info)
            if(info.error === 400){
                //用户未登录,需要拦截到登录页
                location.href = "login.html";
            }
            if(info.success ){
                //已登录,用户继续访问即可
                console.log("当前用户已登录");
            }
        }
    })