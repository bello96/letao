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
                    }
                }
            }
        }
    });
});