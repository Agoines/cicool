const statisticApi = require("../../utils/statisticApi.js");

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
        learnData: 0
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

            $this.setData({
                learnData: allLearnData.master
            })
            isLoading = false
        }
        app.afterLogin(
            thing
        )
    },

    onChooseAvatar(e) {
        this.setData({
            avatarPic: e.detail.avatarUrl,
        })
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
