const app = getApp();

let books = [];

Page({
    data: {
        pronunciations: ['英式', '美式'],
        pronunciationIndex: 0,
        bookId: wx.getStorageSync('bookId'),
        books: []
    },

    onLoad: function () {

        wx.request({
            method: "POST",
            url: app.globalData.domain + '/statistic/getAllWBData', data: {
                "userId": wx.getStorageSync('userId')
            },
            header: {
                'content-type': 'application/json',
                'cookie': app.getToken()
            },
            // 调用成功口
            success: (r) => {
                console.log(r.data.books)
                books = r.data.books

                this.setData({
                    booksData: r.data.books
                })
            }
        })
    },

    handleTap(e) {

        wx.request({
            method: "POST",
            url: app.globalData.domain + '/user/changeWordBook', data: {
                "userId": wx.getStorageSync('userId'),
                "bookId": e.currentTarget.dataset.text
            },
            header: {
                'content-type': 'application/json',
                'cookie': app.getToken()
            },
            // 调用成功口
            success: () => {
                wx.showToast({
                    title: "修改成功"
                })
                wx.setStorageSync('bookId', e.currentTarget.dataset.text)
            },
            fail: () => {
                wx.showToast({
                    title: "修改失败"
                })
            },
        })

    },

    bindPronunciationChange(e) {
        this.setData({
            pronunciationIndex: e.detail.value
        })
    },
});
