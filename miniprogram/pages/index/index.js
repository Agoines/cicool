const statisticApi = require("../../utils/statisticApi.js");
const userApi = require("../../utils/userApi.js");

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

/**
 * 初始化头像以及单词次数
 * @returns {Promise<void>}
 */
async function init() {
    let nickname = await app.getNickname()
    let avatarPic = await app.getAvatarPic()
    // 设置名称和头像
    page.setData({
        nickname: nickname,
        avatarPic: avatarPic
    })
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
                })
            }
        )

    } else {
        page.setData({
            bookName: '还未选择',
        })
    }
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

    let pronunciation, pronounce, source, reviewNum, learnNum;
    if (userData.data.settings === '{}') {
        pronunciation = 0
        pronounce = false
        source = 0
        reviewNum = 10
        learnNum = 10
    } else {
        let settings = JSON.parse(userData.data.settings)
        pronunciation = settings.pronunciation
        pronounce = settings.pronounce
        source = settings.source
        reviewNum = settings.reviewNum
        learnNum = settings.learnNum
    }

    page.setData({
        pronunciation: pronunciation,
        pronounce: pronounce,
        source: source,
        reviewNum: reviewNum,
        learnNum: learnNum
    })
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
    },

    onLoad: async function () {

        await wx.showNavigationBarLoading();
        page = this
        app.afterLogin(async function () {
            // 初始化
            await init()
            // 修改设置
            await setSetting()
            await wx.hideNavigationBarLoading();
            isLoading = false
        })

    },

    openBook() {
        openPage("../book/book", {
            bookId: this.data.bookId
        })
    },

    openData() {
        openPage("../data/data")
    },

    openSetting() {
        openPage("../setting/setting", {
            pronunciation: this.data.pronunciation,
            pronounce: this.data.pronounce,
            source: this.data.source,
            reviewNum: this.data.reviewNum,
            learnNum: this.data.learnNum,
            avatarPic: this.data.avatarPic,
            nickname: this.data.nickname
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
            bookId: this.data.bookId,
            reviewNum: this.data.reviewNum,
            learnNum: this.data.learnNum
        })
    },

    openLearn() {
        openWord('learn', {
            pronunciation: this.data.pronunciation,
            pronounce: this.data.pronounce,
            source: this.data.source,
            bookId: this.data.bookId,
            reviewNum: this.data.reviewNum,
            learnNum: this.data.learnNum
        })
    }

})
