//登录页
$(function(){
    
    //登录操作
    //1.给登录按钮注册点击事件
    //2.获取用户名和密码
    //3.发送请求进行登录
        //如果登录成功
            //1.如果时从商品详情页拦截过来的,需要跳回去
            //2.如果时用户直接访问登录页,需要跳转到个人中心页
        //如果登录失败
            //提示用户 密码或用户名错误

    $(".lt_main .mui-input-group #loginBtn").click(function(){
        //获取用户名和密码
        var username = $("#username").val();
        var password = $("#password").val();
        
        //非空判断
        if(username.trim() == "") {
            mui.toast("请输入用户名");
            return;
        }
        if(password.trim() == "") {
            mui.toast("请输入密码");
            return;
        }

        //发送请求
        $.ajax({
            url:"/user/login",
            type:"post",
            dataType:"json",
            data:{
                username:username,
                password:password
            },
            success:function(info){
                console.log(info);
                //登录失败
                if(info.error === 403) {
                    //用户名或者密码错误
                    mui.toast("用户名或者密码错误,请重新输入");
                    return;
                }

                //登录成功
                if(info.success) {
                    //如果是用户从商品详情页拦截到此处,则需要跳转回去
                    //有传参,就是retUrl
                    if(location.search.indexOf("retUrl") != -1) {
                        location.href = location.search.replace("?retUrl=","");
                    } else {
                        //如果是用户直接访问则直接跳转到个人中心页
                        location.href = "user.html";
                    }
                }
            }
        })
    })
    
})