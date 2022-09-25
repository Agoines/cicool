/**
 * FundCharts
 * 柱状图BarChart
 */
const app = getApp()
const FundCharts = require('../../utils/FundCharts.min.js');		// 注意拷FundCharts.min.js
const FundChartsToolTips = require('../../utils/FundCharts-tooltips.js');
const statisticApi = require("../../utils/statisticApi");  // 注意拷fundchart-tooltips.js

const {
    ArrowToolTip
} = FundChartsToolTips;

const {bar} = FundCharts;
let bar1 = null;

Page({

    async onReady() {
        await this.drawBar();
    },

    /**
     * 画柱状图
     */ async drawBar() {
        let now = new Date().getTime();
        let date = new Date(now - 7 * 24 * 60 * 60 * 1000).getTime();
        const startDate = Math.floor(date / 1000);
        const endDate = Math.floor(now / 1000);

        const dailySumByDate = await statisticApi.getDailySumByDate(
            app.getUserId(),
            app.getToken(),
            startDate,
            endDate
        )

        let xArr = [];
        let learnSum = [], reviewSum = []
        const {dailySum} = dailySumByDate
        for (let sum in dailySum) {
            const date = new Date(now - (7 - sum) * 24 * 60 * 60 * 1000)
            xArr.push((date.getMonth() + 1) + "-" + date.getDate())
            const {learn, review} = dailySum[sum]
            learnSum.push(learn)
            reviewSum.push(review)
        }
        console.log("学习", learnSum, "复习", reviewSum)
        // chart 1
        bar1 = new bar({
            id: 'chart-bar',
            width: 375,
            height: 212,
            xaxis: xArr,
            range: {min: 0, max: Math.max(...learnSum, ...reviewSum) + 2},
            yaxisfunc: data => data.toFixed(0),
            datas: [learnSum, reviewSum],
            barMargin: 20
        });

        bar1.init();
    },


    bindTouchStart(e) {
        this.chart1Touch(e)
    },

    bindTouchMove(e) {
        this.chart1Touch(e)
    },
    // bar 1 chart demo touch start
    chart1Touch: function (e) {
        if (e) {
            let event = e.touches[0];
            let index = bar1.drawer.drawHover(event.x);

            if (index === false) return false;
            ArrowToolTip.call(bar1, index, [bar1.opts.datas[0][index]], bar1.opts.xaxis[index], event.x, event.y);
        }
    },
});
