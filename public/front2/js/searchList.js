$(function(){

    //功能1:解析地址栏的参数,将参数赋值到搜索框中
    //获取地址栏的搜索的值
    var key = getSearch("key");
    //将值赋值到搜索框中
    $(".search_input").val(key);
    //渲染页面
    render();

    //获取input框中的值,请求数据,进行渲染
    function render(){
        $(".lt_product").html('<div class="loading"></div>');

        //三个必传的参数
        var params = {};
        params.proName = $('.search_input').val();  // 搜索关键字
        params.page = 1;
        params.pageSize = 100;

        //两个可选的参数 price 和 num
        //通过判断有没有高亮的a标签,来决定需不需要传递排序参数
        var $current = $(".lt_sort a.current");
        if($current.length>0) {
            //当前a标签有curent类,需要进行排序
            console.log("需要进行排序");
            //按照什么排序(价格,库存)
            var sortName = $current.data("type");
            //升序还是降序,可以通过判断箭头的方向决定(1是升序,2是降序)
            var sortValue = $current.find("i").hasClass("fa-angle-down") ? 2 : 1;

            //如果需要排序,需要将参数添加到parms中
            params[sortName] = sortValue;
        }

        setTimeout(function(){
            //发送ajax请求
            $.ajax({
                url: "/product/queryProduct",
                type: "get",
                data: params,
                dataType: "json",
                success:function(info){
                    console.log(info)
                    var str = template("tpl",info);
                    $(".lt_product").html(str);
                }
            })
        },1000)
    }

    //功能2 点击搜索按钮,实现搜索功能
    $(".search_btn").click(function(){
        render();
    });

    //功能3:点击价格或者库存,切换current,实现排序
    //1.绑定点击事件,通过a[data-type]绑定
    //2.切换current类
    //  (1)点击a标签没有current类就添加current类,并且移除其他的current类
    //  (2)点击a标签的额current类,切换箭头的方向
    //3.重新渲染页面
   
    $(".lt_sort a[data-type]").click(function(){
        if($(this).hasClass("current")){
            //有current类,切换箭头方向
            $(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
        } else {
            //当前a没有current类,添加类,并移除其他的a标签的类
            $(this).addClass("current").siblings().removeClass("current");
        }
        //重新渲染
        render();
    })
    

})