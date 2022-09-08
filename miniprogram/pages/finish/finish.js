Page({
    data: {},
    onLoad: function (options) {
        this.setData({
            wordType: options.wordType,
            wordNum: options.wordNum
        })

        this.setData({
            imageUri: imagePath
        })
    },

    onUnload() {
        let pages = getCurrentPages().length - 1;
        wx.navigateBack({
            delta: pages
        })
    },
    backIndex() {
        let pages = getCurrentPages().length - 2;
        wx.navigateBack({
            delta: pages
        })
    }
});
