const app = getApp();
Page({
    data: {
        nickname: app.getNickname(),
        avatarPic: app.getAvatarPic(),
    },

    onLoad: function () {
    }

})
