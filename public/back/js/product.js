$(function(){
    //1.已进入页面发送ajax请求,获取后台数据,通过模板引擎渲染到页面上
    var currentPage = 1;
    var pageSize = 2;
    var picArr = [];  //用于维护提交的图片,可以控制图片的数量
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
                // console.log(info);
                var str = template("tmp",info);
                $("tbody").html(str);

                //分页模块
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:info.page,
                    totalPages:Math.ceil( info.total / info.size ),
                    onPageClicked:function(a,b,c,page){
                        // console.log(page)
                        currentPage = page,
                        rander();
                    },
                    //控制分页按钮显示的文本内容
                    //itemTexts 是一个函数,每个按钮在初始化的时候们都会调用该函数
                    //将该函数的返回值作为按钮的文本
                    //type: 按钮的类型,page,first,last,prev,next
                    //page:表示点击按钮跳转的页码,
                    //current:表示当前页
                    itemTexts:function(type,page,current){
                        switch (type){
                            case "page":
                                return page;
                            case "first":
                                return "首页";
                            case "last":
                                return "尾页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                        }
                    },
                    
                    //控制鼠标悬停在页码上显示title
                    //每个按钮在初始化的时候,都会调用该函数,将返回值作为显示的提示文本
                    tooltipTitles:function(type,page,current) {
                        switch (type){
                            case "page":
                                return "前往第" + page + "页";
                            case "first":
                                return "首页";
                            case "last":
                                return "尾页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                        }
                        
                    },
                    //使用bootstrap的提示文本
                    useBootstrapTooltip:true
                });
            }
        });
    }
    
    //点击添加商品,显示模态框
    $("#addBtn").click(function(){
        $("#addModal").modal("show");
        //发送ajax请求获取二级分类 通过模板引擎渲染在页面上
        $.ajax({
            url:"/category/querySecondCategoryPaging",
            type:"get",
            dataType:"json",
            data:{
                page:1,
                pageSize:100
            },
            success:function(info){
                console.log(info)
                var str = template("tmpaa",info);
                $(".dropdown-menu").html(str);

            }
        })
    })

    //给二级分类每个注册点击事件,设置给请选择二级分类
    $(".dropdown-menu").on("click","a",function(){
        var id = $(this).data("id");
        console.log(id)
        var txt = $(this).text();
        // console.log(txt)
        //设置给他爸爸的儿子sapn
        $("#dropdownTxt").text(txt);
        $("[name='brandId']").val(id);  //把id设置给隐藏域的id
        $("#form").data("bootstrapValidator").updateStatus("brandId","VALID");
    });

    //进行多张图片上传初始化
    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.reslt.picAddr可以获取上传后的图片地址
        done:function (e, data) {
            //   console.log(data.result.picAddr);  
            // console.log(data)
            //将图片的地址和名称存储在数组中
            picArr.unshift( data.result ); //往数组的最前面添加图片的额名称和地址
            var picurl = data.result.picAddr;
            // console.log(picurl)
            // console.log(picArr)
            //将得到的图片地址添加到imgbox中,注意是王前面添加
            $("#imgBox").prepend('<img src="'+ picurl +'" width="100" height="100" alt="">');
            //如果数组的图片地址名称,长度大于3,就需要移除最后一个图片的地址和名称,一个是结构中的图片还有就是数组中的之后意向
            if(picArr.length>3){
                //找到dom中的最后一个图片进行移除
                $("#imgBox img:last-of-type").remove();
                //找到数组中的最后一个图片的地址和名称进行移除
                picArr.pop();
            }
            //如果数组的长度等于3,说明文件已经上传了3张,可以提交
            //更新表单校验状态,picStatus为VALID
            if(picArr.length === 3){
                $("#form").data("bootstrapValidator").updateStatus("picStatus","VALID");
            }
        }

    });

    //调用插件的方法,进行表单校验
    $("#form").bootstrapValidator({
        excluded: [],        
        //校验图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',    //校验成功
            invalid: 'glyphicon glyphicon-remove',   //校验失败
            validating: 'glyphicon glyphicon-refresh'  //校验中
        },
        //配置校验字段
        fields:{
            brandId:{
                validators: {
                    notEmpty: {
                        message:"请选择二级分类"
                    }    
                }      
            },
            proName:{
                validators: {
                    notEmpty: {
                        message:"请输入商品名称"
                    }    
                }      
            },
            proDesc:{
                validators: {
                    notEmpty: {
                        message:"请输入商品描述"
                    }    
                }      
            },
            //库存要求必须是非零开头的数字
            num: {
                validators: {
                    notEmpty: {
                        message:"请输入商品库存"
                    },
                    //正则校验
                    regexp:{
                        regexp:/^[1-9]\d*$/,
                        message:"请输入有效的库存"          
                    }     
                }
            },

            //要求尺码必须是xx-xx x为数字
            size:{
                validators: {
                    notEmpty: {
                        message:"请输入商品尺码范围"
                    },
                     //正则校验
                    regexp:{
                        regexp:/^\d{2}-\d{2}$/,
                        message:"请输入正确格式的尺码(例如:37-42)"          
                    }     
                }     
            },
            oldPrice:{
                validators: {
                    notEmpty: {
                        message:"请输入商品原价"
                    }    
                }     
            },
            price:{
                validators: {
                    notEmpty: {
                        message:"请输入商品现价"
                    }    
                }     
            },
            //用户标记  当前图片是否上传满三张
            picStatus:{
                validators: {
                    notEmpty: {
                        message:"请上传3张图片"
                    }    
                }   
            }
        }
    });

    //注册表单校验成功事件,阻止默认的表单提交,通过ajax提交
    
    $("form").on("success.form.bv",function(e){
        e.preventDefault();
        //因为serialize 只能获取表单的值
        var paramsStr = $("#form").serialize();
        // console.log(paramsStr)
        // console.log(picArr)
        paramsStr += "&picName1" + picArr[0].picName + "&picAddr1" + picArr[0].picAddr;
        paramsStr += "&picName2" + picArr[1].picName + "&picAddr2" + picArr[1].picAddr;
        paramsStr += "&picName3" + picArr[2].picName + "&picAddr3" + picArr[2].picAddr;

        // console.log(paramsStr)


        $.ajax({
            url:"/product/addProduct",
            type:"post",
            dataType:"json",
            data:paramsStr,
            success:function(info){
                // console.log(info)
                //关闭模态框
                $("#addModal").modal("hide");
                currentPage = 1;
                //重新渲染
                rander();
                //重置表单
                $("#form").data("bootstrapValidator").resetForm(true);
                //非标单的内容需要手动重置
                $("#dropdownTxt").text("请选择二级分类");
                $("#imgBox img").remove();
                picArr = [];
            }       
        })
    })
});