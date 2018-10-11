// 购物车
$(function(){

    //1.已进入页面,请求当前登录的用户的所有的购物车信息
    //发送请求
        //1.用户未登录,需要拦截到登录页
        //2.用户登录,进行购物车的渲染
    // render();
    function render(){
        setTimeout(function(){
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

                        //在数据回来之后,重新渲染页面,需要关闭下拉刷新
                        mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh()
                    }
                }
            })
        },500)
    }

    //配置下拉刷新或上啦加载
    mui.init({
        pullRefresh : {
          container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
          down : {
            auto:true, //进去页面刷新一次
            callback :function(){
                //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                render();
            } 
          }
        }
      });

    
    //2.左滑删除功能
      //(1),给删除按钮绑定点击事件,通过事件委托,且需要用tap
      //(2),获取当前购物车的id
      //(3),发送ajax请求进行删除
      //(3),页面重新渲染
    
    $(".lt_main").on("tap",".btn_delete",function(){
        //获取id
        var id = $(this).data("id");

        //发送ajax请求
        $.ajax({
            type:"get",
            url:"/cart/deleteCart",
            dataType:"json",
            data:{id:[id]},
            success:function(info){
                // console.log(info)
                if(info.success){
                    // 页面重新渲染, 触发一次下拉刷新即可
                    mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                }  
            }
        })
    });

    //3.编辑功能
    //点击编辑按钮,显示确认框(通过事件委托)
    $(".lt_main").on("tap",".btn_edit",function(){
        //自定义属性dataset,dom对象的属性
        var obj = this.dataset;
        //从自定义的属性中获取id
        var id = obj.id;
        var htmlStr = template("editTpl",obj);
        htmlStr = htmlStr.replace( /\n/g, "" );

        //显示确认框
        mui.confirm(htmlStr, "编辑商品", ["确认", "取消"],function(e){
            if(e.index === 0) {
                //确认编辑
                //获取尺码和数量,进行提交
                var size = $('.lt_size span.current').text();
                var num = $('.mui-numbox-input').val();

                $.ajax({
                    url:"/cart/updateCart",
                    type:"post",
                    dataType:"json",
                    data:{
                        id:id,
                        size:size,
                        num:num
                    },
                    success:function(info){
                        console.log(info);
                        if(info.success){
                            // 编辑成功, 页面重新, 下拉刷新一次即可
                         mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                        }
                    }
                })
            }
        });
        // 手动初始化数字框
        mui(".mui-numbox").numbox();
    })

    // 给编辑模态框的尺码添加选中功能
  $('body').on("click", ".lt_size span", function() {
    $(this).addClass("current").siblings().removeClass("current");
  });

})