const app = getApp();
const statisticApi = require("../../utils/statisticApi.js");
const userApi = require("../../utils/userApi.js");
Page({
    data: {
        pronunciations: ['英式', '美式'],
        pronunciationIndex: 0,
        bookId: wx.getStorageSync('bookId'),
        books: [],

        showTopTips: false,
        message: '',
        type: '',
    },

    async onLoad() {
        const allWBData = await statisticApi.getAllWBData(
            app.getUserId(),
            app.getToken()
        )
        this.setData({
            booksData: allWBData.books
        })
    },

    async handleTap(e) {
        try {
            await userApi.changeWordBook(
                app.getUserId(),
                e.currentTarget.dataset.text,
                app.getToken()
            ).then(
                this.setData({
                        message: '修改成功',
                        type: 'success',
                        showTopTips: true
                    }
                ),
            )

            let pages = getCurrentPages();
            let item = e.currentTarget.dataset.text - 1;
            let prevPage = pages[pages.length - 2];
            prevPage.setData({
                bookName: this.data.booksData[item].name,
                bookTextColor: this.data.booksData[item].color,
                bookBackgroundColor: this.data.booksData[item].color + '33'
            })
        } catch (err) {
            this.setData({
                    message: '修改失败 ' + err,
                    type: 'error',
                    showTopTips: true
                }
            )
        }


    },

    async bindPronunciationChange(e) {
        this.setData({
            pronunciationIndex: e.detail.value
        })

        await userApi.changeUserSetting(
            app.getUserId(), app.getToken(), {
                pronunciation: 0
            }
        )
    },
});
