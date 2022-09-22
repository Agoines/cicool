const app = getApp();
const userApi = require("../../utils/userApi.js");
let page;
Page({
    data: {
        pronunciations: ['英式', '美式'],
        pronunciation: 0,
        books: [],

        showTopTips: false,
        message: '',
        type: '',
        uri: ['有道词典', 'gstatic']
    },

    async onLoad() {
        page = this


        const eventChannel = this.getOpenerEventChannel()
        await eventChannel.on('setData', function (data) {
            page.setData({
                pronunciation: data.data.pronunciation,
                pronounce: data.data.pronounce,
                source: data.data.source
            })
        })


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
        //获取加载的页面( 页面栈 )
        let pages = getCurrentPages()
        //获取上一个页面
        let prevPage = pages[pages.length - 2]

        // 设置上一个页面的数据（可以修改，也可以新增）
        prevPage.setData({
            pronunciation: this.data.pronunciation,
            pronounce: this.data.pronounce,
            source: this.data.source
        })
    }
});
