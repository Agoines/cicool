const app = getApp();
Page({
    data: {
        nickname: app.getNickname(),
        avatarPic: app.getAvatarPic(),
        dialogShow: false,
        buttons: [{text: '取消'}, {text: '确定'}],
        path: ""
    },

    onLoad: function () {
        wx.showNavigationBarLoading().then(r => console.log(r));
        
        let $this = this
        let thing = function () {
            $this.setData({
                nickname: app.getNickname(),
                avatarPic: app.getAvatarPic(),
            })
            wx.hideNavigationBarLoading().then(r => console.log(r));
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

    openSetting() {
        wx.navigateTo({
            url: "../setting/setting", success: () => {

            }
        })
    },
    openSearch() {
        wx.navigateTo({
            url: "../search/search", success: () => {

            }
        })
    }

})
