const statisticApi = require("../../utils/statisticApi.js");
const userApi = require("../../utils/userApi.js");
const app = getApp();

let isLoading = true
const openPage = async (pageName) => {
    if (!isLoading) {
        await wx.navigateTo({
            url: pageName
        })
    }
}

async function openWord(type) {
    await openPage("../word/word?type=" + type)
}

Page({
    data: {
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
        let thing = async function () {
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
        app.afterLogin(
            thing
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
        await openPage(
            "../data/data"
        )
    },

    async openSetting() {
        await openPage(
            "../setting/setting"
        )
    },
    async openSearch() {
        await openPage(
            "../search/search"
        )
    },

    async openReview() {
        await openWord('review')
    },

    async openLearn() {
        await openWord('learn')
    }

})
