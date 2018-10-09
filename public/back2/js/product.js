$(function(){
    //已进入页面发送ajax请求,获取后台数据,通过模板引擎动态渲染到页面上
   var currentPage = 1;
   var pageSize = 2;
   var picArr = [];  //存放图片的地址和名称
   rander();
   function rander(){
       $.ajax({
           url:"/product/queryProductDetailList",
           type:"get",
           dataType:"json",
           data:{
               page:currentPage,
               pageSize:pageSize
           },
           success:function(info){
            //    console.log(info)
               var str = template("tmp",info);
               $("tbody").html(str);

               //分页初始化
               $("#pagintor").bootstrapPaginator({
                bootstrapMajorVersion:3,
                currentPage:info.page,
                totalPages:Math.ceil( info.total / info.size ),
                onPageClicked:function(a,b,c,page){
                    currentPage = page;
                    rander();
                },
                itemTexts:function(type, page, current){
                    // console.log(type)
                    // return 1
                    switch (type) {
                        case "page":
                            return page;
                        case "first":
                            return "首页";
                        case "last":
                            return "尾页";
                        case "next":
                            return "下一页";
                        case "prev":
                            return "上一页"
                    }
                },
                tooltipTitles:function(type, page, current){
                    switch (type) {
                        case "page":
                            return "前往第"+page+"页";
                        case "first":
                            return "首页";
                        case "last":
                            return "尾页";
                        case "next":
                            return "下一页";
                        case "prev":
                            return "上一页"
                    }
                },
                useBootstrapTooltip: true
               })
           }
       })
   }

   //给添加按钮注册点击事件,显示模态框
   $("#addBtn").click(function(){
       $("#addModal").modal("show");

       //通过ajax想后台发送请求,获取服务器的数据,
       $.ajax({
           url:"/category/querySecondCategoryPaging",
           type:"get",
           dataType:"json",
           data:{
               page:1,
               pageSize:100
           },
           success:function(info){
            //    console.log(info);
                var str = template("addtmp",info);
                $(".dropdown-menu").html(str);
           }
       })
   })

   //给每个二级分类添加点击事件
   $(".dropdown-menu").on("click","a",function(){
       var txt = $(this).text();
    //    console.log(txt)
    $("#dropdownTxt").text(txt);
    //获取id,设置给隐藏域
    var id = $(this).data("id");
    $("[name='brandId']").val(id);
     // 手动将 name="brandId" 的input, 校验状态置成 VALID
     $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID");
   })

   //进行文件上传初始化
   $("#fileupload").fileupload({
       dataType:"json",
       done:function(e,data){
            // console.log(data.result)
            //将图片的地址和名称春芳在数组中
            picArr.unshift(data.result);
            var picurl = data.result.picAddr;
            //将图片的地址赋值给img显示在页面上
           $("#imgBox").prepend('<img id="imgadd" src="'+ picurl +'" width="100" height="100">');

           //如果数组的长度大于3就需要移除最后一张
            if(picArr.length>3){
                $("#imgBox img:last-of-type").remove();
                picArr.pop()
            }
            //如果数组的长度等于3 就可以提交了
            if(picArr.length == 3){
                $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID");
            }
       }
   });
   //表单校验
   $("#form").bootstrapValidator({
       // 对隐藏域也校验
        excluded: [],
        // 指定校验时显示的图标, 固定写法
        feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',      // 校验成功
        invalid: 'glyphicon glyphicon-remove',   // 校验失败
        validating: 'glyphicon glyphicon-refresh'  // 校验中
        },
        //字段校验
        fields:{
            brandId:{
                validators: {
                    notEmpty: {
                      message: "请选择二级分类"
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: "请输入商品名称"
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                      message: "请输入商品描述"
                    }
                }
            },

            num: {
                validators: {
                    notEmpty: {
                      message: "请输入商品库存"
                    },
                    // 正则校验
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '商品库存必须是非零开头的数字'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                      message: "请输入商品尺码"
                    },
                                // 正则校验
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '要求尺码为 xx-xx 的格式, 例如 32-40'
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                      message: "请输入商品原价"
                    }
                }
            },
            price:{
                validators: {
                    notEmpty: {
                        message: "请输入商品先价"
                    }
                }
            },
            picStatus:{
                validators: {
                    notEmpty: {
                        message: "请选择三张图片"
                    }
                }
            }
        }
    
   });

   //注册表单校验成功事件
   $("form").on("success.form.bv", function( e ){
    e.preventDefault();

    var paramsStr = $('#form').serialize();
    paramsStr += "&picName1="+ picArr[0].picName +"&picAddr1=" + picArr[0].picAddr;
    paramsStr += "&picName2="+ picArr[1].picName +"&picAddr2=" + picArr[1].picAddr;
    paramsStr += "&picName3="+ picArr[2].picName +"&picAddr3=" + picArr[2].picAddr;
        $.ajax({
            type: "post",
      url: "/product/addProduct",
      data: paramsStr,
      dataType: "json",
      success:function(info){
        $('#addModal').modal("hide");
        currentPage = 1;
          rander();
          $('#form').data("bootstrapValidator").resetForm(true);
          $('#dropdownTxt').text("请选择二级分类");
          $('#imgBox img').remove();
          picArr = []; // 同步数组
      }
        })
   })




})