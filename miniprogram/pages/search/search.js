let app = getApp()
Page({
    data: {
        inputShowed: false,
        inputVal: ""
    },
    onLoad() {
        this.setData({
            search: this.search.bind(this)
        })
    },
    search: function (value) {
        return new Promise((resolve, reject) => {
            console.log(value)
            console.log('token' + app.getToken())
            wx.request({
                method: "POST",
                url: app.globalData.domain + '/word/getSearchResult',
                data: {
                    "userId": wx.getStorageSync('userId'),
                    "keyword": value,
                    "skip": 0
                },
                header: {
                    'content-type': 'application/json',
                    'cookie': app.getToken()
                },
                success: (res) => {
                    let directSearch = res.data.directSearch
                    let resolveList = [];
                    for (let index = 0; index < directSearch.length; index++) {
                        let item = {}
                        item.text = directSearch[index].word + '\n' + directSearch[index].translation;
                        item.word = directSearch[index].word;
                        item.translation = directSearch[index].translation;
                        resolveList[index] = item
                    }

                    resolve(resolveList)
                }
            })
        })
    },

    selectResult: function (e) {
        wx.setClipboardData({
                data: '单词：' + e.detail.item.text + '\n翻译' + e.detail.item.translation
            }
        )
    },
});
