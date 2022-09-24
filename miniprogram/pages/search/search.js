const wordApi = require("../../utils/wordApi.js");
const app = getApp()
let page;
Page({
    data: {
        inputShowed: false,
        inputVal: "",
        value: ""
    },
    onLoad() {
        page = this
        this.setData({
            search: this.search.bind(this)
        })
    },
    input: function (e) {
        this.setData({
            value: e.detail.value
        })
        return e.detail.value
    },

    async search() {
        if (page.data.value !== null && page.data.value !== '') {
            await wordApi.getSearchResult(
                app.getUserId(),
                this.data.value,
                app.getToken()
            ).then(
                searchData => {
                    // 获取对应的单词
                    let {directSearch} = searchData
                    page.setData({
                        recycleList: directSearch
                    })

                }
            )
        } else {
            page.setData({
                recycleList: []
            })
        }
    },

    selectResult: async function (event) {
        console.log(event)
        const wordId = event.currentTarget.id;
        wx.navigateTo({
            url: 'wordDetail/wordDetail?wordId=' + wordId,
            success: {}
        })
    },
});
