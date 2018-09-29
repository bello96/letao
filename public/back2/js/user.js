$(function(){  
    var currentPage = 1;
    var pageSize = 5;
    rander();
    //进入页面需要立即发送请求进行渲染页面
    function rander(){
    $.ajax({
        url:"/user/queryUser",
        data:{
            page:currentPage,
            pageSize:pageSize
        },
        dataType:"json",
        type:"get",
        success:function(info){
            // console.log(info)
            var str = template("tmp",info)
            $("tbody").html(str);

                //分页初始化
            $("#paginator").bootstrapPaginator({
                bootstrapMajorVersion:3,
                totalPages:Math.ceil(info.total / info.size),
                // numberOfPages:5,
                currentPage: info.page,

                onPageClicked:function(a,b,c,page){
                    // console.log(page)
                    currentPage = page;
                    rander();
                }
            });
        }
    })
   }
   

//点击禁用按钮
// 思路:点击禁用按钮,弹出模态框,点击确定按钮后,将原来的禁用按钮更改为启用,状态为禁用,刷新页面
//因为是动态渲染出来的 所以点击事件注册给父级元素,用事件委托




});

 