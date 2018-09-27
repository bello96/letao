//用户页面,数据

$(function(){
    var currentPage = 1; //表示当前页
    var pageSize = 5; //表示每页多少条
    rander();
    //进去页面发送ajax请求,请求用户列表数据,通过模板引擎进行渲染
    
   function rander(){
    $.ajax({
        type:"get",
        url:"/user/queryUser",
        data:{
            page: currentPage,  //页码
            pageSize: pageSize  //每页的条数
        },
        dataType:"json",
        success:function(info){
            console.log(info)
            var str = template("tmp",info);
            //根据生成的str模板 进行渲染tbody
            $("tbody").html(str);
        

            //分页功能初始化
            $("#paginator").bootstrapPaginator({
                //指定分页插件的版本
                bootstrapMajorVersion:3,
                //总页数
                totalPages: Math.ceil( info.total / info.size  ),
                //当前页
                currentPage:info.page,
                //给分页按钮添加点击事件
                onPageClicked: function(a,b,c,page){
                    // console.log(page)
                    //跟新当前页
                    currentPage = page;
                    //重新渲染
                    rander();
                }

                

            });
        }


    });

   }
});