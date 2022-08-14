Page({
    data: {},
    onLoad: function () {
        let height = wx.getSystemInfoSync().windowHeight;
        let width = wx.getSystemInfoSync().windowWidth;
        const imagePath = "https://source.unsplash.com/random/" + width + "x" + height;
        this.setData({
            imageUri: imagePath
        })
    }
});
