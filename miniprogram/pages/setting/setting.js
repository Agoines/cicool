const app = getApp();
const statisticApi = require("../../utils/statisticApi.js");
const userApi = require("../../utils/userApi.js");
Page({
    data: {
        pronunciations: ['英式', '美式'],
        pronunciation: 0,
        bookId: wx.getStorageSync('bookId'),
        books: [],

        showTopTips: false,
        message: '',
        type: '',

        uri: ['有道词典', 'gstatic'],
    },

    async onLoad() {
        const allWBData = await statisticApi.getAllWBData(
            app.getUserId(),
            app.getToken()
        )
        let $this = this
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('setData', function (data) {
            $this.setData({
                pronunciation: data.data.pronunciation,
                pronounce: data.data.pronounce,
                source: data.data.source
            })
        })
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
                bookName: '词书：' + this.data.booksData[item].name,
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

    async pronounce(event) {
        this.setData({
            pronounce: event.detail.value
        })
        await userApi.changeUserSetting(
            app.getUserId(), app.getToken(), {
                pronunciation: this.data.pronunciation,
                pronounce: this.data.pronounce,
                source: this.data.source
            }
        )
    },

    async bindPronunciationChange(e) {
        this.setData({
            pronunciation: e.detail.value
        })

        await userApi.changeUserSetting(
            app.getUserId(), app.getToken(), {
                pronunciation: this.data.pronunciation,
                pronounce: this.data.pronounce,
                source: this.data.source
            }
        )
    },

    async bindSourceChange(e) {
        this.setData({
            source: e.detail.value
        })
        console.log(this.data.source)

        await userApi.changeUserSetting(
            app.getUserId(), app.getToken(), {
                pronunciation: this.data.pronunciation,
                pronounce: this.data.pronounce,
                source: this.data.source
            }
        )
    },

    onUnload() {
        let pages = getCurrentPages()    //获取加载的页面( 页面栈 )
        let prevPage = pages[pages.length - 2]    //获取上一个页面
        // 设置上一个页面的数据（可以修改，也可以新增）
        prevPage.setData({
            pronunciation: this.data.pronunciation,
            pronounce: this.data.pronounce,
            source: this.data.source
        })
    }
});
