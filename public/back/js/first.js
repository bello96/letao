$(function(){
    var currentPage = 1; //当前页
    var pageSize = 5;  //每页的显示条数
    //动态渲染表格数据
    //一进入页面就刷新发送ajax请求,获取后台数据,通过模板引擎渲染在页面上
    rander();
    function rander(){
        $.ajax({
            url:"/category/queryTopCategoryPaging",
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
                
                //分页初始化
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,  //当前页
                    totalPages: Math.ceil( info.total / info.size ),   //总页数
                    //event: 是插件包装过的对象
                    //originalEvent: 是原始的事件对象
                    //type:指代当前点击页码的类型 有上一页 下一页 首页 尾页 
                    //page:指代当前点击的页码按钮对应的页码值
                    onPageClicked: function( event, originalEvent, type, page){
                        // console.log(page);
                        //更新当前页
                        currentPage = page;
                        //重新渲染页码
                        rander();
                    }
                })
            }
        });
    }  
})