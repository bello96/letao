$(function(){
    //实现表单验证功能
    // 1.进行表单校验配置
    //     校验要求:
    //         (1)用户名不能为空,长度2-6位
    //         (2)密码不能为空,长度6-12位


    // 实现表单验证功能,进行表单样式初始化
    $("#form").bootstrapValidator({

         //指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',    //校验成功
            invalid: 'glyphicon glyphicon-remove',   //校验失败
            validating: 'glyphicon glyphicon-refresh'  //校验中
        },
        //配置校验字段
        fields: {
            username: {
                //配置校验规则
                validators: {
                    //非空校验
                    notEmpty: {
                        //提示信息
                        message: "当前用户名不能为空!"      
                    },
                    //长度校验
                    stringLength: {
                        min:2,
                        max:6,
                        //提示信息
                        message: "用户名长度必须是2-6位"
                    },
                    callback: {
                        message:"用户名不存在"
                    }
                }
            },

            password: {
                //配置校验规则
                validators: {
                    //非空校验
                    notEmpty: {
                        //提示信息
                        message: "当前密码不能为空!"
                    },
                    //长度校验
                    stringLength: {
                        min:6,
                        max:12,
                        //提示信息
                        message: "密码长度必须是6-12位"
                    },
                    callback: {
                        message: "密码错误"
                    }
                }
            }
        }
    });



    //2.通过submit按钮进行提交表单,可以让表单校验插件进行校验
        // (1)校验通过,默认将表单继续提交,会跳转页面,需要在校验后,阻止默认提交,将来通过ajax登录请求
        // (2)校验失败,表单校验插件,本身就会阻止默认提交
        // 思路:注册表单校验成功事件,阻止默认的表单提交,通过ajax进行提交

    $("#form").on("success.form.bv",function(e){
        //阻止默认的表单提交
        e.preventDefault();
        // console.log("阻止了默认提交")
        //使用ajax提交逻辑*(无需刷新页面即可提交数据)
        $.ajax({
            type:"post",
            url:"/employee/employeeLogin",
            //通过表单序列化快速获取表单值,可以将表单的值序列成一个字符串
            data: $("#form").serialize(),
            dataType:"json",
            success:function(info){
                // console.log(info)
                if(info.success) {
                    //登录成功,跳转到首页
                    location.href = "index.html";
                }
                if(info.error == 1000){
                    // alert("用户名不存在");
                    //将表单用户名校验状态从成功更新到失败的状态,并提示给用户
                    $("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback");
                }
                if(info.error == 1001){
                    // alert("密码错误");
                    //将表单密码校验状态从成功更新到失败的状态,并提示给用户
                    //updateStatus
                    //参数1:字段名称
                    //参数2:校验状态
                    //参数3:校验规则,配置提示信息
                    $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback");
                }
            }
        })
    })



    //3.添加重置功能
    $("[type='reset']").click(function(){
        //调用插件的方法进行重置表单
        //resetForm(boolean)
        //1.true => 表示将内容和表单状态都进行重置
        //2.flase => 表示只重置状态
        $("#form").data("bootstrapValidator").resetForm();
    })
});