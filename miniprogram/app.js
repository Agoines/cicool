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
        await wx.login().then(
            async login => {
                //发送请求
                await userApi.login(login.code).then(
                    data => {
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
                    }
                )
            }
        )
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

    async getNickname() {
        if (!isLogin) {
            return '词酷用户';
        } else if (nickname === '') {
            let random = Math.floor(Math.random() * 10000);
            let name = '词酷用户#' + random
            await userApi.changeUserNickname(
                this.getToken(),
                this.getUserId(),
                name
            )
            return name

        } else {
            return nickname
        }
    },

    async getAvatarPic() {
        if (!isLogin) {
            return "https://api.multiavatar.com/cicool.svg"
        } else if (avatarPic === '') {
            let avatarPic = "https://api.multiavatar.com/" + await this.getNickname() + ".svg"
            await userApi.changeUserAvatarPic(
                this.getToken(),
                this.getUserId(),
                avatarPic
            )
            return avatarPic
        } else {
            return avatarPic
        }
    }
})

