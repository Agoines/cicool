/**
 * 返回首页
 */
function backIndex() {
    wx.navigateBack({
        delta: 2,
        success: {}
    })
}

Page({
    onLoad: function (options) {
        let wordType
        switch (options.wordType) {
            case 'learn':
                wordType = '学习'
                break
            case 'review':
                wordType = '复习'
                break
        }

        this.setData({
            wordType: wordType,
            wordNum: options.wordNum
        })
    },

    onUnload() {
        backIndex()
    },
    backIndex() {
        backIndex()
    }
});
