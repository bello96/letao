$(function(){
    //1.已进入页面通过ajax请求后台,通过模板引擎动态渲染到页面上
    var currentPage = 1;
    var pageSize = 5;
    var txt;
    rander();
    function rander(){
        $.ajax({
            url:"/category/querySecondCategoryPaging",
            type:"get",
            dataType:"json",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(info){
                // console.log(info)
                var str = template("tmp",info);
                $("tbody").html(str);

                //2.分页初始化
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:info.page,
                    totalPages:Math.ceil( info.total / info.size ),
                    onPageClicked:function(a,b,c,page){
                        // console.log(page);
                        currentPage = page;
                        rander();
                    }
                })
            }
        })
    }
   
    //3.点击添加分类,弹出模态框
    $("#addBtn").click(function(){
        $("#addModal").modal("show");

        //点击分类后,发送ajax请求,获取数据进行一级分类
        $.ajax({
            url:"/category/queryTopCategoryPaging",
            type:"get",
            dataType:"json",
            data:{
                page:1,
                pageSize:100
            },
            success:function(info){
                // console.log(info)
                
                var str = template("tmpAdd",info);
                $(".dropdown-menu").html(str);
            }
        })
    })


    //给ul中的每个一级标题添加点击事件,获取文本的值 设置给按钮
    $(".dropdown-menu").on("click","a",function(){
        var id = $(this).data("id");
        // console.log(id)
         txt = $(this).text();
        // console.log(txt)
        $(".dropdown-toggle").text(txt);
        $('[name="categoryId"]').val(id);
        $("#form").data("bootstrapValidator").updateStatus("categoryId","VALID");
        
    })

    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
          var Addurl = data.result.picAddr;
          $("[name='brandLogo']").val(Addurl);
        //   console.log(Addurl)
        $("#imgadd").attr("src",Addurl);
        $("#form").data("bootstrapValidator").updateStatus("brandLogo","VALID");
        }
  });



  //表单校验

  $("#form").bootstrapValidator({
    excluded:[],
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      fields:{
        categoryId:{
            validators:{
                notEmpty:{
                    message: '请选择一级分类' 
                }
            }
        },
        brandName:{
            validators:{
                notEmpty:{
                    message: '请输入二级分类'  
                }
            }
        },
        brandLogo:{
            validators:{
                notEmpty:{
                    message: '请选择图片'  
                }
            }
        }
      }
  })

  //注册表单提交成事件
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
        url:"/category/addSecondCategory",
        type:"post",
        dataType:"json",
        data:$("#form").serialize(),
        success:function(info){
            //关闭模态框
            $("#addModal").modal("hide");
            //渲染页面
            currentPage = 1;
            rander();
            //表单重置
            $("#form").data("bootstrapValidator").resetForm(true);
            $("#dropdownTxt").text("请选择一级分类");
            $("#imgadd").attr("src","images/none.png")
        }
    })
});
})