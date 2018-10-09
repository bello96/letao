
$(function(){
    // 1.进去页面就通过ajax想后台发送请求,获取一级分类数据,通过模板引擎动态渲染在页面上
    $.ajax({
        url:"/category/queryTopCategory",
        type:"get",
        dataType:"json",
        success:function(info){
            // console.log(info);
            var str = template("tmp",info);
            $(".lt_category_left ul").html(str);
            
            //进去页面就需要渲染第一个一级分类和对应的二级分类数
            renderSecondById( info.rows[0].id );
        }
    });

    //2.通过事件委托给一级分类注册点击事件
    $(".lt_category_left").on("click","a",function(){
        //给当前点击的a添加类
        $(this).addClass("current").parent().siblings().find("a").removeClass("current");
        //获取对应点击的a的id
        var id = $(this).data("id");
        // console.log(id)
        renderSecondById(id);
    });

    //通过一级分类的id进行右侧的二级分类的渲染
    function renderSecondById(id){
        $.ajax({
            url:"/category/querySecondCategory",
            type:"get",
            dataType:"json",
            data:{
                id:id
            },
            success:function(info){
                // console.log(info);
                var str = template("tmp2",info);
                $(".lt_category_right ul").html(str);
            }
        })
    }
    
})
