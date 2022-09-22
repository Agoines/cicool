const statisticApi = require("../../utils/statisticApi.js");
const userApi = require("../../utils/userApi.js");

const FundCharts = require('../../utils/FundCharts.min.js');
const app = getApp()
// 替代下文 page 中 this
let page

let isLoading = true
const openPage = (pageName, data) => {
    if (!isLoading) {
        wx.navigateTo({
            url: pageName,
            success: function (res) {
                // 通过 eventChannel 向被打开页面传送数据
                res.eventChannel.emit('setData', {data: data})
            }
        })
    } else {
        page.setData({
            showTopTips: true,
            topTipText: "别点这么快，数据还没加载好呢",
            topTipType: "error"
        })
    }
}


// 绘制图形所需
let dailySumLine;

/**
 * 初始化头像以及单词次数
 * @returns {Promise<void>}
 */
async function init() {
    // 设置名称和头像
    page.setData({
        nickname: app.getNickname(),
        avatarPic: app.getAvatarPic()
    })

    console.log("初始化中 UserId", app.getUserId(), "初始化中 Token", app.getToken())

    await statisticApi.getAllLearnData(
        app.getUserId(),
        app.getToken()
    ).then(allLearnData => {
            const {master} = allLearnData
            page.setData({
                learnData: master
            })
        }
    )

    // 存储 BookId
    page.setData({
        bookId: app.getBookId()
    })

    if (page.data.bookId !== -1 && page.data.bookId !== undefined) {
        await statisticApi.getSingleWBData(
            app.getToken(),
            app.getUserId(),
            page.data.bookId
        ).then(bookData => {
                const {book} = bookData
                page.setData({
                    bookName: '词书：' + book.name,
                    bookTextColor: book.color,
                    bookBackgroundColor: book.color + '33'
                })
            }
        )

    }


    console.log("初始化方法块结束")
}

/**
 * 存储设置到 data
 * @returns {Promise<void>}
 */
async function setSetting() {
    const userData = await userApi.getUserInfo(
        app.getUserId(),
        app.getToken()
    )

    let pronunciation, pronounce, source;
    if (userData.data.settings === '{}') {
        pronunciation = 0
        pronounce = false
        source = 0
    } else {
        let settings = JSON.parse(userData.data.settings)
        pronunciation = settings.pronunciation
        pronounce = settings.pronounce
        source = settings.source
    }

    page.setData({
        pronunciation: pronunciation,
        pronounce: pronounce,
        source: source
    })
    console.log(page.data.pronunciation)
}

/**
 * 获取数据并绘制线条
 * @returns {Promise<void>}
 */
async function drawLine() {
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
        xArr.push(new Date(now - (7 - sum) * 24 * 60 * 60 * 1000).toLocaleDateString())
        const {learn, review} = dailySum[sum]
        learnSum.push(learn)
        reviewSum.push(review)
    }

    const {line} = FundCharts;
    dailySumLine = new line({
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

    dailySumLine.init();
}


function openWord(type, data) {
    if (page.data.bookId !== -1) {
        openPage("../word/word?type=" + type, data)
    } else {
        page.setData({
            showTopTips: true,
            topTipText: "选择一本词书吧，你还没有选择词书",
            topTipType: "info"
        })
    }

}

Page({
    data: {
        showTopTips: false,
        nickname: app.getNickname(),
        avatarPic: app.getAvatarPic(),
        bookId: 0,
        learnData: 0,

        nicknameDialog: false,
        nicknameInput: '',

        bookName: '还未选择',
        bookTextColor: '#263544',
        bookBackgroundColor: '#26354433'
    },

    onLoad: async function () {

        await wx.showNavigationBarLoading();
        page = this
        app.afterLogin(async function () {
            // 初始化
            await init()
            // 绘制线条
            await drawLine()
            // 修改设置
            await setSetting()
            await wx.hideNavigationBarLoading();
            isLoading = false
        })

    },

    async onShow() {
        if (!isLoading) {
            await drawLine()
        }


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

    openBook() {
        openPage("../book/book")
    },

    openData() {
        openPage("../data/data", {
            bookId: this.data.bookId
        })
    },

    openSetting() {
        openPage("../setting/setting", {
            pronunciation: this.data.pronunciation,
            pronounce: this.data.pronounce,
            source: this.data.source
        })
    },

    openSearch() {
        openPage("../search/search")
    },

    openReview() {
        openWord('review', {
            pronunciation: this.data.pronunciation,
            pronounce: this.data.pronounce,
            source: this.data.source,
            bookId: this.data.bookId
        })
    },

    openLearn() {
        openWord('learn', {
            pronunciation: this.data.pronunciation,
            pronounce: this.data.pronounce,
            source: this.data.source,
            bookId: this.data.bookId
        })
    }

})
