const wordApi = require("../../utils/wordApi");
Page({
    data: {},
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
        console.log(options.wordNum)
        this.setData({
            wordType: wordType,
            wordNum: options.wordNum
        })

    },

    onUnload() {
        let pages = getCurrentPages().length - 1;
        wx.navigateBack({
            delta: pages
        })
    },
    backIndex() {
        wx.navigateBack({
            delta: 2
        })
    }
});
