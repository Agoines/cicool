// app.ts
App({
    // 对应的例名
    globalData: {
        domain: 'https://apitest.nijigen.fun/cicool',
        isLogin: false
    },

    onLaunch() {

    },

    emptyToken() {
        return wx.getStorageSync('token') === ''
    },

    getToken() {
        return 'TOKEN=' + wx.getStorageSync('token')
    }
})

