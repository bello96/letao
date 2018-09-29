//数据可视化
$(function(){
    // 基于准备好的dom，初始化echarts实例
var myChart1 = echarts.init(document.querySelector(".echarts_1"));

// 指定图表的配置项和数据
var option1 = {
    title: {
        text: '2018年出生人数统计'
    },
    tooltip: {},
    legend: {
        data:['男性',"女性","未知"]
    },
    xAxis: {
        data: ["安徽","湖南","黑龙江","云南","西藏","江西","贵州","北京"]
    },
    yAxis: {},
    series: [{
        name: '男性',
        type: 'bar',
        data: [5895, 2670, 3676, 8550, 1075, 2330,5737,8948]
    },
    {
        name: '女性',
        type: 'bar',
        data: [4895, 5670, 6676, 5550, 3075, 2930,9737,2848]
    },
    {
        name: '未知',
        type: 'bar',
        data: [4885, 5670, 6676, 7550, 3075, 9930,5737,7848]
    }]
};

// 使用刚指定的配置项和数据显示图表。
myChart1.setOption(option1);


 // 基于准备好的dom，初始化echarts实例
 var myChart2 = echarts.init(document.querySelector(".echarts_2"));

 // 指定图表的配置项和数据
 var option2 = {
    title : {
        text: '2018年离婚率统计',
        subtext: '实时统计',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ["安徽","湖南","黑龙江","云南","西藏","江西","贵州","北京"]
    },
    series : [
        {
            name: '离婚人数',
            type: 'pie',
            radius : '60%',
            center: ['50%', '60%'],
            data:[
                {value:435, name:'安徽'},
                {value:310, name:'湖南'},
                {value:234, name:'黑龙江'},
                {value:535, name:'云南'},
                {value:548, name:'西藏'},
                {value:458, name:'江西'},
                {value:358, name:'贵州'},
                {value:748, name:'北京'}
            ],
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
 
 // 使用刚指定的配置项和数据显示图表。
 myChart2.setOption(option2);
})