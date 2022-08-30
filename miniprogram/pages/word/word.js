const wordApi = require("../../utils/wordApi.js");
const app = getApp();

function getData(type) {
    switch (type) {
        case 'learn':
            return wordApi.getLearningData(
                app.getToken(),
                app.getUserId(),
                app.getBookId()
            )
        case 'review':
            return wordApi.getReviewData(
                app.getToken(),
                app.getUserId(),
                app.getBookId()
            )
    }
}

Page({
    onLoad: async function (options) {
        const wordData = await getData(options.type);
        console.log(
            wordData
        )
        // 请求，然后获取正确字符串，
        let height = wx.getSystemInfoSync().windowHeight;
        let width = wx.getSystemInfoSync().windowWidth;
        const imagePath = "https://source.unsplash.com/random/" + width + "x" + height;
        this.setData({
            imageUri: imagePath
        })
    },
});
