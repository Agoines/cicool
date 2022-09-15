const userApi = require("utils/userApi.js");

let token = ''
let userId = ''
let bookId = ''

let nickname = ''
let avatarPic = ''

let isLogin = false

function afterLogin() {

}

App({
    // 全局
    globalData: {},

    afterLogin(thing) {
        afterLogin = thing
    },

    async onLaunch() {
        const login = await wx.login()
        //发送请求
        let data = await userApi.login(login.code)
        // 判断是否报错
        const {errcode} = data
        if (errcode === 0) {
            data = data.data
            userId = data.id
            token = data.token
            bookId = data.bookId
            nickname = data.nickName
            avatarPic = data.avatarPic
            isLogin = true
            afterLogin()
        }


    },

    getBookId() {
        return bookId
    },

    getToken() {
        return 'TOKEN=' + token
    },

    getUserId() {
        return userId
    },

    getNickname() {
        if (nickname === '' || !isLogin) {
            return '词酷用户#8848'
        } else {
            return nickname
        }
    },

    getAvatarPic() {
        if (!isLogin) {
            return "https://api.multiavatar.com/cicool.svg"
        } else if (avatarPic === '') {
            return "https://api.multiavatar.com/" + userId + ".svg"
        } else {
            return avatarPic
        }
    }
})

