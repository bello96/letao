$(function(){
    //一进入页面就发送ajax请求,获取后台数据,通过模板引擎渲染到页面上
    var currentPage = 1;  //当前页
    var pageSize = 5;  //每页显示的条数
    rander();
    function rander(){
        $.ajax({
            type:"get",
            url:"/category/querySecondCategoryPaging",
            dataType:"json",
            data:{
                page: currentPage,
                pageSize: pageSize
            },
            success:function(info){
                console.log(info);
                var str = template("tmp",info);
                $("tbody").html(str);
    
                //分页初始化
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //指定版本
                    currentPage: info.page, //当前页
                    totalPages: Math.ceil( info.total / info.size ),  //总页数
                    onPageClicked: function(a,b,c,page){
                        currentPage = page;
                        rander();
                        console.log(currentPage)
                    }
                });
            }
        });
    }
});

