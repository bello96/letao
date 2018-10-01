$(function(){
    //已进入页面发送ajax请求,获取后台数据,通过模板引擎渲染到页面上
    var currentPage = 1;
    var pageSize = 2;
    rander();
    function rander(){
        $.ajax({
            url:"/product/queryProductDetailList",
            type:"get",
            dataType:"json",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(info){
                // console.log(info);
                var str = template("tmp",info);
                $("tbody").html(str);

                //分页模块
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:info.page,
                    totalPages:Math.ceil( info.total / info.size ),
                    onPageClicked:function(a,b,c,page){
                        // console.log(page)
                        currentPage = page,
                        rander();
                    }
                })
            }
        })
    }
    
})