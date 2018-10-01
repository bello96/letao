
$(function(){
    var currentPage = 1;
    var pageSize = 5;
    rander();
//进入页面放ajax请求,获取后台数据,通过模板引擎渲染在页面上
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
                console.log(info)
                var str = template("tmp",info);
                $("tbody").html(str);
    
                //分页初始化
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:info.page,
                    totalPages:Math.ceil( info.total / info.size ),
                    onPageClicked:function(a,b,c,page){
                        // console.log(page)
                        currentPage = page;
                        rander();
                    }
                })
            }
        })
    }

    //给添加按钮注册点击事件
    $("#addBtn").click(function(){
        //显示模态框
        $("#addModal").modal("show");
    })

        //通过表单验证,实现表单校验功能
        $("#form").bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },

            fields:{
                categoryName:{
                    validators: {
                        notEmpty:{
                            message:"请输入一级分类名称"
                        }
                    }
                }
            }
        })
   
    //阻止默认提交事件
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            url:"/category/addTopCategory",
            type:"post",
            dataType:"json",
            data:$("#form").serialize(),
            success:function(info){
                //关闭模态框
                $("#addModal").modal("hide");
                //页面重新渲染
                rander();
                //重置表单
                $("#form").data("bootstrapValidator").resetForm(true);
            }
        })
    });
})