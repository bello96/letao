$(function(){
    //功能1:进入页面需要获取地址栏传过来的productId,发送ajax请求,获取该商品数据,进行渲染
    var productId = getSearch("productId");

    $.ajax({
        url:"/product/queryProductDetail",
        type:"get",
        dataType:"json",
        data: {
            id:productId
        },
        success:function(info){
            // console.log(info)
            var str = template("productTpl",info);
            $(".mui-scroll").html(str);

            //因为轮播图是动态生成的,所以需要手动初始化轮播图
            //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
            });

            //手动初始化数字框
            mui(".mui-numbox").numbox()
        }
    })

    //功能2: 添加购物车的功能
    //(1) 给购物车按钮添加点击事件
    //(2) 获取尺码和数量,发送加入购物车的请求
        //后台自动检测用户是否登录了
            //a,如果没有登录,直接返回,提示用户未登录,并拦截到登录页面
            //b,如果登录了,进行添加购物车的操作,直接跳转到购物车页面

    $("#addCart").click(function(){

        //获取尺码和数量
        var size = $(".lt_size span.current").text();
        //判断用户是否选这尺码进行非空判断
        if(!size){
            mui.toast("请选择尺码");
            return;
        }
        //数量
        var num = $(".mui-numbox-input").val();
        
        //根据用户选择尺码和数量,发送添加购物车的功能
        $.ajax({
            url:"/cart/addCart",
            type:"post",
            dataType:"json",
            data:{
                productId: productId,
                num: num,
                size: size
            },
            success:function(info){
                console.log(info);
                //如果没登录,返回未登录的错误信息
                //如果登录了,返回加入购物车的结果
                if( info.error === 400 ) {
                    //没有登录,跳转到登录页,将来在登录页登录,登录成功需要跳转回来,需要知道当前页的地址
                    //可以通过地址栏传参,将当前页的地址传给登录页
                    location.href = "login.html?retUrl=" + location.href;
                    return;
                }
                if( info.success ) {
                    //登录过了,加入购物车
                    // console.log("加入购物车成功")
                    //需要弹出一个确认框
                    mui.confirm("添加成功","温馨提示",["去购物车下单","继续浏览"],function(e){
                        //e.index 指点击按钮的索引
                        if( e.index === 0 ){
                            location.href = "cart.html";
                        }
                    })
                }
            }
        })

    })

    //给尺码注册可选的点击功能
    $(".lt_main").on("click",".lt_size span",function(){
        //给当前的尺码加上curent类,并移除其他的类
        $(this).addClass("current").siblings().removeClass("current");
    })

})