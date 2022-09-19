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
        let resolveList = [];
        return new Promise(async (resolve, reject) => {

            if (value !== null && value !== '') {
                await wordApi.getSearchResult(
                    app.getUserId(),
                    value,
                    app.getToken()
                ).then(
                    searchData => {
                        // 获取对应的单词
                        let {directSearch} = searchData
                        // 转换为对应数组
                        for (let index = 0; index < directSearch.length; index++) {
                            let item = {}
                            item.text = directSearch[index].word + '\n' + directSearch[index].translation
                            item.word = directSearch[index].word
                            item.wordId = directSearch[index].wordId
                            item.translation = directSearch[index].translation
                            resolveList[index] = item
                        }
                        resolve(resolveList)
                    }
                ).catch(any =>
                    reject(any)
                )
            } else {
                resolve(resolveList)
            }


        })
    },

    selectResult: async function (event) {
        console.log(event)
        const wordId = event.detail.item.wordId
        wx.navigateTo({
            url: 'wordDetail/wordDetail?wordId=' + wordId,
            success: {}
        })
    },
});
