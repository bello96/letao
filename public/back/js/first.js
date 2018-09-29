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


    //点击添加按钮显示模态框
    $("#addBtn").click(function(){
        $("#addModal").modal("show");
    })


    //通过表单校验插件,实现表单校验功能
    $("#form").bootstrapValidator({
        //配置表单的对号和差好的图标
        //固定的写法
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',    //校验成功
            invalid: 'glyphicon glyphicon-remove',   //校验失败
            validating: 'glyphicon glyphicon-refresh'  //校验中
        },
        //配置校验字段(这里就自由)
        fields: {
            categoryName: {
                //配置校验规则
                validators: {
                    //非空检验
                    notEmpty: {
                        message:"请输入一级分类名称"
                    }
                }
            }
        }
    })

    //阻止校验成功时的默认提交,需要通过ajax提交
    //这里需要注册表单校验成功事件
    $("#form").on("success.form.bv",function(e){
        //阻止默认事件
        e.preventDefault();

        //通过ajax提交
        $.ajax({
            url:"/category/addTopCategory",
            type:"post",
            dataType:"json",
            data:$("#form").serialize(),
            success:function(info){
                // console.log(info)
                if(info.success){
                    //关闭模态框
                    $("#addModal").modal("hide");    
                    //重新渲染
                    rander();
                    //表单内容和校验的状态都需要重置,resetForm()里面穿true,会将表单的状态和内容都重置
                    $("#form").data("bootstrapValidator").resetForm(true);    
                }
            }
                    
        })
    })

})