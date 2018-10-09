$(function(){
    //进行搜索历史记录管理
    //要进行本地存储操作,所以我们需要约定一个键名,专门用于历史记录管理 键名:search_list


    //下面这三行代码用于假数据的初始化
    //var arr = ["耐克","阿迪达斯","特步","鸿星尔克","AJ","花花公子","匹克","贵人鸟"];
    // console.log(arr); 数组
    //var jsonStr = JSON.stringify(arr);
    // console.log(jsonStr) 字符串
    //localStorage.setItem("search_list",jsonStr);

// 功能1 搜索历史记录渲染
    //(1) 从本地存储中读取历史记录, jsonStr
    //(2) 解析jsonStr字符串,转化成数组
    //(3) 结合模板引擎将数据渲染在页面上
    //一进如页面就重新渲染页面
    render();
    

//功能2 清空历史记录
    //(1) 给清空添加点击事件(通过事件委托)
    //(2) 使用removeItem 清空历史记录(本地存储)
    //(3) 页面重新渲染
    $(".lt_history").on("click",".icon_empty",function(){

        // 确认框
        mui.confirm("您确定要清楚历史记录吗?","温馨提示",["取消","确认"],function( e ){
            // console.log(e) 打印出来点击按钮对应的下标
            if(e.index === 1) {
                //确认按钮
                //删除search_list
                localStorage.removeItem("search_list");
                //页面重新渲染
                render();
            }
        })
        
    })


//功能3 删除单条立即记录:删除的是数组中的某一项
    //(1) 给每一项记录添加点击事件(事件委托)
    //(2) 取出数组,从自定义属性中读取下标,通过下标删除数组中的对应项 用splice方法
    $(".lt_history").on("click",".icon_delete",function(){
        //取出数组
        var arr = getHistory();
        // console.log(arr)
        //读取对应点击的下标
        var index = $(this).data("index");
        // console.log(index)
        //通过下标删除数组中的对应项
        arr.splice(index,1);
        //将删除后的数组转化成json字符串存储到本地
        localStorage.setItem( "search_list", JSON.stringify( arr ) );
        //页面重新渲染
        render();
    })





    //将读取历史记录封装成方法,需要用到直接调用即可

    //读取历史记录,并以数组的形式返回
    function getHistory() {
        //没有数据时,读取出来是null,需要做类型处理
        var jsonStr = localStorage.getItem("search_list") || "[]";
        // console.log(jsonStr) 是一个字符串
        var arr = JSON.parse(jsonStr);  //转化成数组
        return arr;
    }

    //读取历史记录,得到数组,并进行页面重新渲染
    function render() {
        var arr = getHistory();
        var htmlStr = template("tmp",{arr:arr});
        $(".lt_history").html(htmlStr);
    }

})