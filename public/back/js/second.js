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
        //获取a中存储的id
        var id = $(this).data("id");
        // console.log(id)
        //设置给name="categoryId"的input
        $("[name='categoryId']").val(id);

        //选择了一级分类,需要给一级分类校验状态,更新成校验成功的状态
        //参数1:字段名称
        //参数2:校验状态, VALID 成功  ,INVALID 失败
        //参数3:校验规则,配置错误时的提示信息
        $("#form").data("bootstrapValidator").updateStatus("categoryId","VALID");
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

            //将图片的地址设置给name=brandLogo的input  用户提交
            $("[name='brandLogo']").val(picUrl);

            //重置校验状态
            $("#form").data("bootstrapValidator").updateStatus("brandLogo","VALID");
        }
    })

    //5. 进行表单校验功能
    $("#form").bootstrapValidator({

        //指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        //需要对隐藏域进行校验,所以不能排除隐藏域
        excluded: [],
        
        //校验图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',    //校验成功
            invalid: 'glyphicon glyphicon-remove',   //校验失败
            validating: 'glyphicon glyphicon-refresh'  //校验中
        },

        //配置校验字段
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message:"请选择一级分类"
                    }                
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message:"请输入二级分类"
                    }                
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message:"请选择图片"
                    }                
                }
            }
        }
    })

    //注册表单校验成功事件,阻止默认的提交,通过ajax提交
    $("#form").on("success.form.bv",function(e){
        e.preventDefault();

        //通过ajax提交
        $.ajax({
            url:"/category/addSecondCategory",
            type:"post",
            dataType:"json",
            data:$("#form").serialize(),  //通过表单序列化获取所有的表单数据
            success:function(info){
                if(info.success){
                    // console.log(info);
                    //退出模态框
                    $("#addModal").modal("hide");
                    //更新第一页
                    currentPage = 1;
                    //页面刷新
                    rander();
                    //重置表单(这里只能重置表单元素,,按钮和图片需要手动重置)
                    $("#form").data("bootstrapValidator").resetForm(true);
                    $("#dropdownTxt").text("请选择一级分类");
                    $("#imgBox img").attr("src","images/none.png");
                } 
            } 
        })
    })
});

