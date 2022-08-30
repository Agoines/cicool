const wordApi = require("../../utils/wordApi.js");

const app = getApp()
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
    search: (value) => {
        return new Promise(async (resolve, reject) => {
            const searchData = await wordApi.getSearchResult(
                app.getUserId(),
                value,
                app.getToken()
            ).catch(any =>
                reject(any)
            )
            console.log(searchData)
            // 获取对应的单词
            let directSearch = searchData.directSearch
            let resolveList = [];
            // 转换为对应数组
            for (let index = 0; index < directSearch.length; index++) {
                let item = {}
                item.text = directSearch[index].word + '\n' + directSearch[index].translation;
                item.word = directSearch[index].word;
                item.translation = directSearch[index].translation;
                resolveList[index] = item
            }
            resolve(resolveList)

        })
    },

    selectResult: async function (event) {
        console.log(event)
        await wx.setClipboardData({
                data: '单词：' + event.detail.item.text + '\n翻译' + event.detail.item.translation
            }
        )

    },
});
