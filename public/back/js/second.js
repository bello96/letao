$(function(){
    //1.一进入页面就发送ajax请求,获取后台数据,通过模板引擎渲染到页面上
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
                // console.log(info);
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

    //2. 点击添加分类按钮,显示模态框
    $("#addBtn").click(function(){
        $("#addModal").modal("show");

        //发送ajax请求,请求所有的一级分类 进行列表渲染
        //利用分页接口 获取全部的一级分类的额数据,传page = 1,pageSize = 100,进行模拟
        $.ajax({
            type:"get",
            url:"/category/queryTopCategoryPaging",
            dataType:"json",
            data:{
                page:1,
                pageSize:100
            },
            success:function(info){
                console.log(info)
                var str = template("tmp2",info);
                $(".dropdown-menu").html(str);
            }
        })
    })

    //3. 给下拉列表中的,每个a添加点击事件,获取a的文本,设置给按钮
    $(".dropdown-menu").on("click","a",function(){
        // console.log(this);  this就是a
        //获取文本
        var txt = $(this).text();
        //设置给按钮
        $("#dropdownTxt").text(txt);
    })

    //4. 文件上传初始化
    $("#fileupload").fileupload({
        dataType:"json",
        done:function (e, data) {
            // console.log(data.result);
            //获取后台返回的图片地址
            var picUrl = data.result.picAddr;
            // console.log(picUrl)
            $("#imgBox img").attr("src",picUrl);
        }
    })
});

