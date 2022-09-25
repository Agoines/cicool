const app = getApp();
const userApi = require("../../utils/userApi.js");
let page;

async function updateSetting() {
    await userApi.changeUserSetting(
        app.getUserId(), app.getToken(), {
            pronunciation: page.data.pronunciation,
            pronounce: page.data.pronounce,
            source: page.data.source,
            learnNum: parseInt(page.data.learnNum, 10) + 1,
            reviewNum: parseInt(page.data.reviewNum, 10) + 1
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
        uri: ['有道词典', 'gstatic'],
        nicknameDialog: false,
        nicknameInput: '',
    },

    async onLoad() {
        page = this
        const eventChannel = this.getOpenerEventChannel()
        await eventChannel.on('setData', function (data) {
            page.setData({
                pronunciation: data.data.pronunciation,
                pronounce: data.data.pronounce,
                source: data.data.source,
                learnNum: parseInt(data.data.learnNum, 10) - 1,
                reviewNum: parseInt(data.data.reviewNum, 10) - 1,
                avatarPic: data.data.avatarPic,
                nickname: data.data.nickname,
            })
        })


    },

    onChooseNickname() {
        this.setData({
            nicknameDialog: true
        })
    },

    nickNameDialogCancel() {
        this.setData({
            nicknameDialog: false
        })
    },

    async nickNameDialogOk() {
        this.setData({
            nickname: this.data.nicknameInput,
            nicknameDialog: false
        })

        await userApi.changeUserNickname(
            app.getToken(),
            app.getUserId(),
            this.data.nicknameInput
        )
    },

    async onChooseAvatar(e) {
        this.setData({
            avatarPic: e.detail.avatarUrl,
        })
        await userApi.changeUserAvatarPic(app.getToken(), app.getUserId(), e.detail.avatarUrl)
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
            learnNum: parseInt(this.data.learnNum, 10) + 1,
            reviewNum: parseInt(this.data.reviewNum, 10) + 1,
            avatarPic: this.data.avatarPic,
            nickname: this.data.nickname
        })
    }
});
