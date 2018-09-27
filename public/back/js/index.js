//数据可视化图标
$(function(){
    //需要实现柱状图和饼状图

    //1. 左侧的柱状图
    // 1-1 基于准备好的dom，初始化echarts实例
    var echarts_1 = echarts.init(document.querySelector(".echarts_1"));

    // 1-2 指定图表的配置项和数据
    var option1 = {
        //大标题
        title: {
            //标题文本
            text: '2018年注册人数',
            //配置标题样式
            textStyle: {
                color:"#C23531"
            }
        },
        //提示框组件
        tooltip: {},
        //图例
        legend: {
            data:['注册人数','实际人数']
        },
        //表示 x 轴
        xAxis: {
            data: ["1月","2月","3月","4月","5月","6月"]
        },
        //表示 y 轴,y轴 一般是刻度,尽量根据自适应 
        yAxis: {},
        series: [{
            name: '注册人数',
            type: 'bar',
            data: [823, 1870, 436, 1500, 699, 958]
        },
        {
            name: '实际人数',
            //type 表示图标的类型,bar表示柱状图, line表示折线图  ,pie表示饼图
            type: 'bar',
            data: [803, 1570, 936, 1900, 500, 1247]
        }]   
    };

    // 1-3 使用刚指定的配置项和数据显示图表。
    echarts_1.setOption(option1);


    //2. 右侧的饼状图
    //2.1 基于准备好的dom，初始化echarts实例
    var echarts_2 = echarts.init(document.querySelector(".echarts_2"));

    // 2-2 指定图表的配置项和数据
    var option2 = {
        //大标题
        title : {
            text: '热门品牌销售统计表',
            //子标题
            subtext: '2018-9',
            x:'center'
        },
        tooltip : {
            trigger: 'item', //鼠标移动到上面触发
            //自定义提示框内容
            //{a} (系列名称) , {b} (数据项目名称) ,{c} (数值) , {d} (百分比)
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克','阿迪','鸿星尔克','特步','李宁','AJ','花花公子']
        },
        series : [
            {
                name: '品牌销量',
                type: 'pie', //饼状图显示
                radius : '55%', //圆的大小,占据父盒子的大小
                center: ['50%', '60%'], //圆心的位置
                data:[
                    {value:635, name:'耐克'},
                    {value:910, name:'阿迪'},
                    {value:234, name:'鸿星尔克'},
                    {value:255, name:'特步'},
                    {value:1548, name:'李宁'},
                    {value:1348, name:'AJ'},
                    {value:888, name:'花花公子'}
                ],
                //表示额外的阴影
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    // 2-3 使用刚指定的配置项和数据显示图表。
    echarts_2.setOption(option2);
})