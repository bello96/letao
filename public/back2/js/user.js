$(function(){  
    var currentPage = 1;
    var pageSize = 5;
    var currentId;
    var isDelete;
    rander();
    //1.进入页面需要立即发送请求进行渲染页面
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
   

//2.点击禁用按钮
// 思路:点击禁用按钮,弹出模态框,点击确定按钮后,将原来的禁用按钮更改为启用,状态为禁用,刷新页面
  //因为是动态渲染出来的 所以点击事件注册给父级元素,用事件委托
    $("tbody").on("click",".btn",function(){
        //显示模态框
        $("#userModal").modal("show");
        //获取这id
        currentId = $(this).parent().data("id");
        // console.log(currentId)
        //获取当前点击按钮的状态
        isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
        // console.log(isDelete)

    })
    //点击确定按钮,将禁用状态更改为正常,则反
    $(".submitBtn").click(function(){
        //点击确认按钮需要发送ajax请求,获取当前用户的id
        //如果是1 就需要更爱为启用 否则更改为禁用
        $.ajax({
            url:"/user/updateUser",
            type:"post",
            dataType:"json",
            data:{
                id:currentId,
                isDelete:isDelete
            },
            success:function(info){
                // console.log(info)
                //退出模态
                $("#userModal").modal("hide");
                //重新渲染
                rander();
            }
        })
    })



});

 