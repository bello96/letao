// 购物车
$(function(){

    //已进入页面,请求当前登录的用户的所有的购物车信息
    //发送请求
        //1.用户未登录,需要拦截到登录页
        //2.用户登录,进行购物车的渲染
    
    $.ajax({
        url:"/cart/queryCart",
        type:"get",
        dataType:"json",
        success:function(info){
            console.log(info);      
            if(info.error === 400){
                //如果未登录,需要拦截到登录页
                location.href = "login.html";
            } else {
                //用户已登录,返回当前购物车的信息,渲染到页面上
                var str = template("cartTpl",{list:info});
                $(".lt_main .mui-scroll").html(str);
            }
        }
    })

})