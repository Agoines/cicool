const app = getApp();
const userApi = require("../../utils/userApi.js");
let page;

async function updateSetting() {
    await userApi.changeUserSetting(
        app.getUserId(), app.getToken(), {
            pronunciation: page.data.pronunciation,
            pronounce: page.data.pronounce,
            source: page.data.source,
            learnNum: page.data.learnNum,
            reviewNum: page.data.reviewNum
        }
    )
}

Page({
    data: {
        pronunciations: ['英式', '美式'],
        pronunciation: 0,
        books: [],

        nums: Array.from({length: 19}, (item, index) => index + 1),
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
                source: data.data.source,
                learnNum: data.data.learnNum,
                reviewNum: data.data.reviewNum
            })
        })


    },

    async pronounce(event) {
        this.setData({
            pronounce: event.detail.value
        })
        await updateSetting()
    },

    async bindPronunciationChange(e) {
        this.setData({
            pronunciation: e.detail.value
        })

        await updateSetting()
    },

    async bindSourceChange(e) {
        this.setData({
            source: e.detail.value
        })
        await updateSetting()
    },

    async bindReviewChange(event) {
        this.setData({
            reviewNum: event.detail.value
        })
        await updateSetting()
    },
    async bindLearnChange(event) {
        this.setData({
            learnNum: event.detail.value
        })
        await updateSetting()

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
            source: this.data.source,
            learnNum: this.data.learnNum,
            reviewNum: this.data.reviewNum
        })
    }
});
