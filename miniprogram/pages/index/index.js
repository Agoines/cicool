const statisticApi = require("../../utils/statisticApi.js");
const userApi = require("../../utils/userApi.js");

const FundCharts = require('../../utils/FundCharts.min.js');

const app = getApp();

let isLoading = true
const openPage = ($this, pageName, data) => {
    if (!isLoading) {
        wx.navigateTo({
            url: pageName,
            success: function (res) {
                // 通过 eventChannel 向被打开页面传送数据
                res.eventChannel.emit('setData', {data: data})
            }
        })
    } else {
        $this.setData({
            showTopTips: true
        })
    }
}

function openWord($this, type, data) {
    openPage($this, "../word/word?type=" + type, data)
}

Page({
    data: {
        showTopTips: false,
        nickname: app.getNickname(),
        avatarPic: app.getAvatarPic(),
        learnData: 0,
        nicknameDialog: false,
        nicknameInput: '',
        bookName: '还未选择图书',
        bookTextColor: '#263544',
        bookBackgroundColor: '#26354433'
    },

    onLoad: async function () {

        await wx.showNavigationBarLoading();
        let $this = this
        app.afterLogin(async function () {
            $this.setData({
                nickname: app.getNickname(),
                avatarPic: app.getAvatarPic(),
            })

            let allLearnData = await statisticApi.getAllLearnData(
                app.getUserId(),
                app.getToken()
            )

            if (app.getBookId() !== -1) {
                let bookData = await statisticApi.getSingleWBData(
                    app.getToken(),
                    app.getUserId(),
                    app.getBookId()
                )

                $this.setData({
                    bookName: '词书：' + bookData.book.name,
                    bookTextColor: bookData.book.color,
                    bookBackgroundColor: bookData.book.color + '33'
                })
            }
            $this.setData({
                learnData: allLearnData.master
            })

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

            console.log(dailySumByDate)
            let xArr = [];
            let learnSum = [], reviewSum = []
            for (let sum in dailySumByDate.dailySum) {
                xArr.push(new Date(now - (7 - sum) * 24 * 60 * 60 * 1000).toLocaleDateString())
                learnSum.push(dailySumByDate.dailySum[sum].learn)
                reviewSum.push(dailySumByDate.dailySum[sum].review)
            }
            const LineChart = FundCharts.line;
            const line = new LineChart({
                id: 'chart-line',
                width: 375,
                height: 212,
                allGradient: true,    // 设置面积渐变
                curveLine: true,
                xaxis: xArr,
                yaxisfunc: data => data.toFixed(0),
                range: {min: 0, max: Math.max(...learnSum, ...reviewSum) + 2},
                datas: [
                    learnSum,
                    reviewSum
                ]
            });

            line.init();

            const userData = await userApi.getUserInfo(
                app.getUserId(),
                app.getToken()
            )
            console.log(userData.data.settings)

            let settings = JSON.parse(userData.data.settings)

            let pronunciation, pronounce, source;

            if (settings === undefined) {
                pronunciation = 0
                pronounce = false
                source = 0
            } else {
                pronunciation = settings.pronunciation
                pronounce = settings.pronounce
                source = settings.source
            }

            $this.setData({
                pronunciation: pronunciation,
                pronounce: pronounce,
                source: source
            })
            console.log($this.data)


            await wx.hideNavigationBarLoading();
            isLoading = false
        })

    },

    onChooseNickname() {
        this.setData({
            nicknameDialog: true
        })
    },

    async onChooseAvatar(e) {
        this.setData({
            avatarPic: e.detail.avatarUrl,
        })
        await userApi.changeUserAvatarPic(app.getToken(), app.getUserId(), e.detail.avatarUrl)
    },

    nickNameDialogCancel() {
        this.setData({
            nicknameDialog: false
        })
    },

    async nickNameDialogOk() {
        this.setData({
            nickname: this.data.nicknameInput,
            nicknameDialog: false
        })

        await userApi.changeUserNickname(
            app.getToken(),
            app.getUserId(),
            this.data.nicknameInput
        )
    },

    openData() {
        openPage(this, "../data/data")
    },

    openSetting() {
        openPage(this, "../setting/setting", {
            pronunciation: this.data.pronunciation,
            pronounce: this.data.pronounce,
            source: this.data.source
        })
    },

    openSearch() {
        openPage(this, "../search/search")
    },

    openReview() {
        openWord(this, 'review', {
            pronunciation: this.data.pronunciation,
            pronounce: this.data.pronounce,
            source: this.data.source
        })
    },

    openLearn() {
        openWord(this, 'learn', {
            pronunciation: this.data.pronunciation,
            pronounce: this.data.pronounce,
            source: this.data.source
        })
    }

})
