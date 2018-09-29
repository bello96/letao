//用户页面,数据

$(function(){
    var currentPage = 1; //表示当前页
    var pageSize = 5; //表示每页多少条
    var currentId;  //存放点击的该用户的id
    var isDelete;   //存放点击的是禁用按钮还是启用按钮
    rander();
    
    //1.进去页面发送ajax请求,请求用户列表数据,通过模板引擎进行渲染
    
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
                // console.log(info)
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


    //2.点击启用禁用按钮,显示模态框,通过事件委托绑定事件
    $("tbody").on( "click", ".btn", function() {
        //让模态框显示出来
        $("#userModal").modal("show");
        //需要获取当前点击用户的id,对用的id存放在当前点击按钮的父元素td  data-id
        //var id = $(this).parent().attr("data-id");  
        //声明一个全局变量存放用户的id,以方便给后面点击确定使用
        currentId = $(this).parent().data("id");  //这种也可以获取id 是jq封装的方法
        // console.log(id);
        //iSdelete 如果是1,就将该用户的状态更改为 启用状态
        //         如果是0,就将该用户的状态更改为 禁用状态
        //获取当前点击的按钮是禁用还是启用状态,可以通过hasClass来判断按钮的类型
        isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
        // console.log(isDelete)
        
        //点击确定按钮,如果是启用按钮,将其状态更改为正常,如果是禁用按钮,就将其更改为已禁用
        $("#submitBtn").click(function(){
            //发送ajax请求,获取该用户的状态
            //需要获取用户的id,和iSdelete
            //iSdelete 如果是1,就将该用户的状态更改为 启用状态
            //         如果是0,就将该用户的状态更改为 禁用状态
            $.ajax({
                url:"/user/updateUser",
                type:"post",
                dataType:"json",
                data:{
                    id: currentId,
                    isDelete: isDelete
                },
                success:function(info){
                    // console.log(info)
                    if( info.success ){
                        //关闭模态框
                        $("#userModal").modal("hide");
                        //重新渲染页面
                        rander();
                    }            
                }
            })
        })
    })
});