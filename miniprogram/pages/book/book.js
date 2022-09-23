const app = getApp();
const userApi = require("../../utils/userApi");
const statisticApi = require("../../utils/statisticApi");
let page;
Page({
    data: {},
    onLoad: async function () {
        page = this;
        await statisticApi.getAllWBData(
            app.getUserId(),
            app.getToken()
        ).then(
            allWBData => {
                this.setData({
                    booksData: allWBData.books
                })
            }
        )
        const eventChannel = this.getOpenerEventChannel()
        await eventChannel.on('setData', function (data) {
            page.setData({
                bookId: data.data.bookId
            })
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

            this.setData({
                bookId: this.data.booksData[item].bookId
            })

            prevPage.setData({
                bookName: this.data.booksData[item].name,
                bookId: this.data.booksData[item].bookId
            })

        } catch (err) {
            this.setData({
                    message: '修改失败 ' + err,
                    type: 'error',
                    showTopTips: true,
                }
            )
        }
    },

    onUnload() {
        //获取加载的页面( 页面栈 )
        let pages = getCurrentPages()
        //获取上一个页面
        let prevPage = pages[pages.length - 2]

        // 设置上一个页面的数据（可以修改，也可以新增）
        prevPage.setData({
            bookId: this.data.bookId
        })
    }
});
