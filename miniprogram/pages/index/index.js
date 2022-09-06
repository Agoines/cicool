const statisticApi = require("../../utils/statisticApi.js");
const userApi = require("../../utils/userApi.js");
const app = getApp();
let isLoading = true
const openPage = async ($this, pageName) => {
    if (!isLoading) {
        await wx.navigateTo({
            url: pageName
        })
    } else {
        $this.setData({
                showTopTips: true
            }
        )
    }
}

async function openWord($this, type) {
    await openPage($this, "../word/word?type=" + type)
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
        app.afterLogin(
            async function () {
                $this.setData({
                    nickname: app.getNickname(),
                    avatarPic: app.getAvatarPic(),
                })
                await wx.hideNavigationBarLoading();
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
                isLoading = false
            }
        )
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
        await userApi.changeUserAvatarPic(
            app.getToken(),
            app.getUserId(),
            e.detail.avatarUrl
        )
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
            }
        )

        await userApi.changeUserNickname(
            app.getToken(),
            app.getUserId(),
            this.data.nicknameInput
        )
    },

    async openData() {
        await openPage(this,
            "../data/data"
        )
    },

    async openSetting() {
        await openPage(this,
            "../setting/setting"
        )
    },
    async openSearch() {
        await openPage(this,
            "../search/search"
        )
    },

    async openReview() {
        await openWord(this, 'review')
    },

    async openLearn() {
        await openWord(this, 'learn')
    }

})
