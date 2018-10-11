// 购物车
$(function(){

    //已进入页面,请求当前登录的用户的所有的购物车信息
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
      })

})